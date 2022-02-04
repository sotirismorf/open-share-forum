<script>
	export let items;
</script>

<h1 class="text-xl font-bold">
	<a href="/downloads"> Downloads </a>
	{#each items as item}
		<span>/</span>
		<a class="hover:text-gray-400" href="/downloads/{item.href}">
			{item.title}
		</a>
	{/each}
</h1>
