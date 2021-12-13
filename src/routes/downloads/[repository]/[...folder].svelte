<script context="module">
	export async function load({ page, fetch }) {
		const repository = page.params.repository;
		const folder = page.params.folder;

		const res = await fetch(`/api/${folder}`);

		const items = await res.json();

		//convert folder to array
		//const pathArray = folder.split('/');
		
		if (res.ok) {
			return { props: { items, repository, folder } };
		}
		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	export let repository;
	export let folder;
	$: folderArr = folder.split('/');
	console.log("this is: " + folderArr)
	export let items;
</script>

<div class="mt-5">
	<main class="flex flex-col sm:rounded-lg p-4 mx-auto sm:max-w-lg bg-gray-800">
		<h1 class="text-3xl font-bold mb-2">
			<a class="hover:text-gray-400" href="/downloads/{repository}">{repository}</a> /
		<!-- I should fond a better if statement -->
		{#if folderArr[0] != ""}
			{#each folderArr as folderItem}
				&ensp;<a class="hover:text-gray-400" href="/downloads/{repository}/{folderArr[0]}">{folderItem}</a>&ensp;/
			{/each}
		{/if}
		</h1>
		{#each items as item} 
			<a
				class="text-xl hover:text-gray-300"
				href="/downloads/{repository}/{folder ? folder+"/" : ""}{item}">📁 {item}</a>
		{/each}
	</main>
</div>
