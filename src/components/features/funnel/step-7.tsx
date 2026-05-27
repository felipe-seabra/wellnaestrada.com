'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, PartyPopper } from 'lucide-react'
import { Button } from '../../ui/button'

export function Step7() {
  return (
    <div className="flex flex-col items-center text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-8"
      >
        <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-zinc-900 dark:text-white mb-4"
      >
        Planejamento enviado com sucesso!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 max-w-md"
      >
        Obrigado por confiar no Well na Estrada. Em breve, nossa equipe entrará em contato pelo seu WhatsApp para dar os próximos passos.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full"
      >
        <Button
          onClick={() => window.location.reload()}
          size="lg"
          className="w-full h-14 rounded-xl text-lg font-bold flex gap-2"
        >
          <PartyPopper className="w-5 h-5" />
          Voltar para o início
        </Button>
      </motion.div>
    </div>
  )
}
