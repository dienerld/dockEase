import { defineNuxtModule } from 'nuxt/kit';
import { addCustomTab, startSubprocess } from '@nuxt/devtools-kit';

export default defineNuxtModule({
  meta: {
    name: 'drizzle-studio',
  },
  setup(_options, nuxt) {
    if (!nuxt.options.dev) return;

    // startSubprocess(
    //   {
    //     command: 'yarn',
    //     args: ['drizzle-kit', 'studio'],
    //     verbose: true,
    //   },
    //   {
    //     id: 'nuxt-drizzle-kit--studio',
    //     name: 'Drizzle Studio',
    //   },
    // );

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
