<script context="module">
	export async function load({ page, fetch }) {
		const repository = page.params.repository;
		const folder = page.params.folder;

		let items, file;

		const res = await fetch(`/api/${folder}`);

		let regex = /\\*\./;
		const isFile = regex.test(folder)
		if (isFile){
			file = await res.text();
		} else {
			items = await res.json();
		}


		//convert folder to array
		//const pathArray = folder.split('/');
		
		if (res.ok) {
			return { props: { items, repository, folder, file, isFile } };
		}
		return {
			status: res.status,
			error: new Error(`Could not load ${folder}`)
		};
	}
</script>

<script>
	import Card from "$lib/Card.svelte";
	import FileInput from "$lib/FileInput.svelte";

	//TODO: na apofasisw an thelw na kanw fetch ta items ston server kai na
	//      epistrefw mazi thn istoselida h na ta kanw fetch apo to
	//      client kai na kanw await blocks

	export let repository;
	export let folder;
	export let items;
	export let file;
	export let isFile;

	function itemIsFile(fileName) {
		const regex = /\\*\./;
		return regex.test(fileName)
	}

	$: folderArr = folder.split('/');
</script>

<Card>
	<h1 class="text-2xl font-bold mb-2">
		<a class="hover:text-gray-400" href="/downloads/{repository}">{repository}</a> /
		<!-- I should fond a better if statement -->
		{#if folderArr[0] != ""}
			{#each folderArr as folderItem}
				&ensp;<a class="hover:text-gray-400" href="/downloads/{repository}/{folderArr[0]}">{folderItem}</a>&ensp;/
			{/each}
		{/if}
	</h1>
	{#if isFile}
	<pre class="whitespace-pre-wrap">{file}</pre>
	{:else}
		{#each items as item}
			{#if itemIsFile(item)}
				<a
					class="text-xl hover:text-gray-300"
					target="_blank" 
					href="http://localhost:3001/{folder}/{item}" 
				 >
					📃 {item}
				</a>
			{:else}
				<a
					class="text-xl hover:text-gray-300"
					href="/downloads/{repository}/{folder ? folder+"/" : ""}{item}">
					📁 {item}
				</a>
			{/if}
		{/each}
	{/if}
	<FileInput />
</Card>
