/* eslint-disable */
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

async function setup() {
  console.log('--- Supabase Admin Setup ---')

  // Load environment variables manually
  const envPath = path.resolve(process.cwd(), '.env.local')
  let env = {}
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8')
    content.split('\n').forEach((line) => {
      const [key, value] = line.split('=')
      if (key && value) env[key.trim()] = value.trim()
    })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL')
    console.log('Please ensure they are defined in .env.local or your environment.')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const email = 'feliperoce@gmail.com'
  const password = 'S996652976@'

  console.log(`Creating user: ${email}...`)

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: 'admin' }
  })

  if (error) {
    if (error.message.includes('already registered')) {
      console.log('User already exists. Updating password and confirming email...')
      
      // Find user by email
      const { data: users, error: listError } = await supabase.auth.admin.listUsers()
      if (listError) throw listError
      
      const user = users.users.find(u => u.email === email)
      if (user) {
        const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
          password,
          email_confirm: true,
          user_metadata: { role: 'admin' }
        })
        if (updateError) throw updateError
        console.log('User updated successfully!')
      } else {
        console.error('User not found despite "already registered" error.')
      }
    } else {
      console.error('Error creating user:', error.message)
      process.exit(1)
    }
  } else {
    console.log('User created successfully!')
  }

  console.log('\n--- Setup Complete ---')
}

setup().catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
