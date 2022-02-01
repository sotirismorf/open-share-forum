<script context="module">
	export async function load({ page, fetch }) {
		const res = await fetch('http://localhost:4000/courses');

		if (res.ok) {
			return {
				props: {
					items: await res.json(),
					repository: page.params.repository,
					semester: page.params.semester
				}
			};
		} else
			return {
				status: res.status,
				error: new Error(`Could not load folder`)
			};
	}
</script>

<script>
	import Card from '$lib/Card.svelte';
	import FileInput from '$lib/FileInput.svelte';

	//TODO: na apofasisw an thelw na kanw fetch ta items ston server kai na
	//      epistrefw mazi thn istoselida h na ta kanw fetch apo to
	//      client kai na kanw await blocks

	export let items;
	export let repository;
	export let semester;
</script>

<Card>
	{#if items.length == 0}
		<div class="my-24 text-center">
			<h1 class="text-3xl font-bold">This directory is empty... 😅</h1>
			<p class="text-3xl mt-5">You can help by uploading a file!</p>
		</div>
	{/if}
	{#each items as item}
		<a 
			class="text-xl hover:text-gray-300" 
			href="/downloads/{repository}/{semester}/{item.name}"
		>
			📁 {item.name}
		</a>
	{/each}
</Card>
