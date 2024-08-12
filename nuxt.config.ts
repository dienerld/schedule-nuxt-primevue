import path from 'path';

export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    'nuxt-auth-utils',
  ],
  css: [
    'primeicons/primeicons.css',
    '~/assets/css/tailwind.css',
    '~/assets/css/variables.css',
  ],
  runtimeConfig: {
    hash: {
      salt: Number(process.env.HASH_SALT || 8),
    },
    session: {
      maxAge: 60 * 60 * 24 * 7, // 1 week
    },
  },

  // Modules Configs
  primevue: {
    options: {
      unstyled: true,
    },
    importPT: { from: path.resolve(__dirname, './app/assets/presets/aura/') },
  },
  fonts: {
    families: [{ name: 'Inter', weights: ['400', '500', '600', '700'] }],
  },

  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
});
