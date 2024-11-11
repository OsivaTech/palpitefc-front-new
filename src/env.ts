// src/env.mjs
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SESSION_SECRET: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_KEY_CARD_PAGSEGURO: z.string().min(1),
  },

  runtimeEnv: {
    SESSION_SECRET: process.env.SESSION_SECRET,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_KEY_CARD_PAGSEGURO: process.env.NEXT_PUBLIC_KEY_CARD_PAGSEGURO,
  },
})
