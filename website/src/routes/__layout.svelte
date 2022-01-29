<script>
	import Nav from '$lib/Nav.svelte';
	import '../app.css';
	import '../tailwind.css';
</script>

<Nav />

<slot />

<style>
	@tailwind base;
	@tailwind components;

	html {
		height: 100%;
	}
</style>
