<script context="module">
	export async function load({ page, fetch }) {
		const repository = page.params.repository;
		const semester = page.params.semester;
		const folder = page.params.folder;

		let file;

		const res = await fetch(`http://localhost:4000/file?course.id=${folder}`);

		const isFile = false;

		if (res.ok) {
			return {
				props: {
					items: await res.json(),
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
	import LinkPrimary from '$lib/LinkPrimary.svelte';
	import Breadcrumb from '$lib/Breadcrumb.svelte';
	import { course } from '../../../../lib/utils/auth'

	//TODO: na apofasisw an thelw na kanw fetch ta items ston server kai na
	//      epistrefw mazi thn istoselida h na ta kanw fetch apo to
	//      client kai na kanw await blocks

	export let items;
	export let folder

	$course = folder

	const breadcrumb = [
		{
			title: 'Βασικός κύκλος σπουδών',
			codename: 'vasikos',
			href: 'vasikos'
		},
		{
			title: '3ο εξάμηνο',
			codename: '3',
			href: 'vasikos/3'
		},
		{
			title: 'Εφαρμοσμένα Μαθηματικά',
			codename: 'efarmosmena',
			href: 'vasikos/3/efarmosmena'
		}
	];
</script>

<Card>
	<Breadcrumb items={breadcrumb} />
	{#if items.length == 0}
		<div class="my-24 text-center">
			<h1 class="text-3xl font-bold">This directory is empty... 😅</h1>
			<p class="text-3xl mt-5">You can help by uploading a file!</p>
		</div>
	{/if}
	{#each items as item}
		<div class="flex justify-between">
			<a
				class="text-xl hover:text-gray-300"
				target="_blank"
				href="http://localhost:4000/downloads/preview/{item.id}.{item.filetype}"
			>
				📃 {item.filename}<span class="italic text-green-400">.{item.filetype}</span>
			</a>
			<LinkPrimary href="http://localhost:4000/downloads/get/{item.id}">Download</LinkPrimary>
		</div>
	{/each}
	<FileInput />
</Card>
