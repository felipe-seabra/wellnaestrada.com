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

  const email = process.env.ADMIN_EMAIL || env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD || env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error('Error: Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment.')
    process.exit(1)
  }

  console.log(`Processing user: ${email}...`)

  // 1. Configure Supabase Cloud Auth
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: 'admin' }
  })

  if (error) {
    if (error.message.includes('already registered')) {
      console.log('Supabase Auth: User already exists. Updating password...')
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
        console.log('Supabase Auth: User updated successfully!')
      } else {
        console.error('Supabase Auth: User not found despite "already registered" error.')
      }
    } else {
      console.error('Supabase Auth: Error creating user:', error.message)
      process.exit(1)
    }
  } else {
    console.log('Supabase Auth: User created successfully!')
  }

  // 2. Configure Local Fallback Auth (platform_admins)
  console.log('Syncing credentials to local fallback table...')
  const { error: rpcError } = await supabase.rpc('set_admin_credentials', {
    p_email: email,
    p_password: password
  })

  if (rpcError) {
    console.error('Error syncing local fallback credentials:', rpcError.message)
  } else {
    console.log('Local fallback credentials synced successfully!')
  }

  console.log('\n--- Setup Complete ---')
}

setup().catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
