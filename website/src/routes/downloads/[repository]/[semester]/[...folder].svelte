<script context="module">
	export async function load({ page, fetch }) {
		const repository = page.params.repository;
		const semester = page.params.semester;
		const folder = page.params.folder;

		let items, file;
		//console.log("Folder:"+folder+"endfolder")

		//const res = await fetch(folder ? `/api/files/${folder}` : `/api/files`);
		const res = await fetch('http://localhost:4000/downloads/page/1');

		//let regex = /\\*\./;
		//const isFile = regex.test(folder)
		//if (isFile){
		//	file = await res.text();
		//} else {
		//	//console.log(res)
		//	items = await res.json();
		//}
		const isFile = false;

		if (res.ok) {
			return {
				props: {
					items: await res.json(),
					repository,
					semester,
					folder,
					file,
					isFile
				}
			};
		}
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

	export let repository;
	export let semester;
	export let folder;
	export let items;
	export let file;
	export let isFile;

	function itemIsFile(fileName) {
		const regex = /\\*\./;
		return regex.test(fileName);
	}

	$: folderArr = folder.split('/');
</script>

<Card>
	<h1 class="text-2xl font-bold mb-2">
		<a class="hover:text-gray-400" href="/downloads/{repository}">{repository}</a> /
		<a class="hover:text-gray-400" href="/downloads/{repository}/{semester}">{semester}</a> /
		<!-- I should fond a better if statement -->
		{#if folderArr[0] != ''}
			{#each folderArr as folderItem}
				&ensp;<a class="hover:text-gray-400" href="/downloads/{repository}/{folderArr[0]}"
					>{folderItem}</a
				>&ensp;/
			{/each}
		{/if}
	</h1>
	{#if isFile}
		<pre class="whitespace-pre-wrap">{file}</pre>
	{:else}
		{#if items.length == 0}
			<div class="my-24 text-center">
				<h1 class="text-3xl font-bold">This directory is empty... 😅</h1>
				<p class="text-3xl mt-5">You can help by uploading a file!</p>
			</div>
		{/if}
		{#each items as item}
			{#if !itemIsFile(item)}
				<a
					class="text-xl hover:text-gray-300"
					target="_blank"
					href="http://localhost:4000/downloads/preview/{item.id}.{item.filetype}"
				>
					📃 {item.id} {item.name}
				</a>
				<a
					class="text-xl hover:text-gray-300"
					target="_blank"
					href="http://localhost:4000/downloads/get/{item.id}.{item.filetype}"
				>
					📃 {item.id} {item.name} (Download)
				</a>
			{:else}
				<a
					class="text-xl hover:text-gray-300"
					href="/downloads/{repository}/{semester}/{folder ? folder + '/' : ''}{item}"
				>
					📁 {item.name}
				</a>
			{/if}
		{/each}
	{/if}
	<FileInput path={folder} />
</Card>
