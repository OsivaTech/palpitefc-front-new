// src/env.mjs
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    ACCESS_TOKEN: z.string().min(1),
    SESSION_SECRET: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_KEY_CARD_PAGSEGURO: z.string().min(1),
  },

  runtimeEnv: {
    SESSION_SECRET: process.env.SESSION_SECRET,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_KEY_CARD_PAGSEGURO: process.env.NEXT_PUBLIC_KEY_CARD_PAGSEGURO,
  },
})
