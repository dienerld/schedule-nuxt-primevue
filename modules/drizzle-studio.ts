import { defineNuxtModule } from 'nuxt/kit';
import { addCustomTab, startSubprocess } from '@nuxt/devtools-kit';
export default defineNuxtModule({
  meta: { name: 'drizzle-studio' },
  hooks: {
    ready() {
      console.log('ℹ drizzle-studio ready');
    },
  },
  setup(_options, nuxt) {
    if (!nuxt.options.dev) {
      return;
    }
    startSubprocess(
      {
        command: 'pnpm',
        args: ['drizzle-kit', 'studio'],
      },
      {
        id: 'nuxt-drizzle-kit--studio',
        name: 'Drizzle Studio',
      },
    );
    addCustomTab({
      name: 'drizzle-studio',
      title: 'Drizzle Studio',
      icon: 'simple-icons:drizzle',
      view: {
        type: 'iframe',
        src: 'https://local.drizzle.studio',
      },
    });
  },
});
