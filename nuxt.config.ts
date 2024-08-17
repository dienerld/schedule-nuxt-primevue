import path from 'path';
import localePrimVue from './locale/primevue.json';
import type { PrimeVueLocaleOptions } from 'primevue/config';

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Agendamento',
      htmlAttrs: { lang: 'pt-br' },
      meta: [
        { name: 'description', content: 'Agendamento' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },
  routeRules: {
    '/': { static: true },
  },
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    'nuxt-auth-utils',
    '@nuxtjs/robots',
    '@nuxt/image',
    'nuxt-svgo',
    '@vueuse/nuxt',
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
    turso: {
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    },
  },

  // Modules Configs
  primevue: {
    options: {
      unstyled: true,
      locale: {
        ...(localePrimVue as PrimeVueLocaleOptions),
      },
    },
    importPT: { from: path.resolve(__dirname, './app/assets/presets/aura/') },
  },
  fonts: {
    families: [{ name: 'Inter', weights: ['400', '500', '600', '700'] }],
  },
  svgo: {
    autoImportPath: '~/assets/svg/',
    componentPrefix: 'i',
  },

  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
});
