//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		//adapter: adapter(),
		adapter: adapter({ out: 'build' }),

		// hydrate the <div id="svelte"> element in src/app.html
		//target: '#svelte'
    alias: {
      $entities: '../server2/src/entities'
    },
	},
  preprocess: sveltePreprocess(),
};

export default config;
