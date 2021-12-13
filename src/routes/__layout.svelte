<script>
	import '../app.css'
	import '../tailwind.css'
	import Nav from './Nav.svelte'
</script>

<Nav />

<slot></slot>

<style>
	@tailwind base;
	@tailwind components;

	html {
		height: 100%;
	}

</style>
