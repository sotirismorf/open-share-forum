<script lang="ts" context="module">
	export async function load({ params, fetch }) {
		const repository = params.repository;
		const semester = params.semester;
		const folder = params.folder;

		const metadataPromise = await fetch(`http://localhost:4000/file?course.id=${folder}`);
		const coursePromise = await fetch(`http://localhost:4000/courses/${folder}`);

		if (metadataPromise.ok && coursePromise.ok) {
			return {
				props: {
					items: await metadataPromise.json(),
					currentCourse: await coursePromise.json(),
					folder,
					semester
				}
			};
		}
		return {
			status: metadataPromise.status,
			error: new Error(`Could not load folder`)
		};
	}
</script>

<script lang="ts">
	import Card from '$lib/Card.svelte';
	import FileUpload from '../../../../lib/forms/FileUpload.svelte';
	import LinkPrimary from '$lib/LinkPrimary.svelte';
	import Breadcrumb from '$lib/Breadcrumb.svelte';

	import { course } from '../../../../lib/utils/auth';
	//import type { Course } from '../../../../../../server2/src/entities/Course'
	import type { Course } from '$entities/Course';

	export let items: any;
	export let folder: string;
	export let currentCourse: Course[];
	export let semester: number;

	$course = folder;

	const breadcrumb = [
		{
			title: 'Βασικός κύκλος σπουδών',
			codename: 'vasikos',
			href: 'vasikos'
		},
		{
			title: `${semester}ο εξάμηνο`,
			codename: semester,
			href: `vasikos/${semester}`
		},
		{
			title: currentCourse[0].name,
			codename: currentCourse[0].codename,
			href: `vasikos/${semester}/${currentCourse[0].id}`
		}
	];
</script>

<FileUpload />
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
				href="http://localhost:4000/downloads/preview/{item.id}.{item.extension}"
			>
				📃 {item.filebasename}
				<span class="italic text-green-400">.{item.extension}</span>
			</a>
			<LinkPrimary href="http://localhost:4000/download?id={item.id}">Download</LinkPrimary>
		</div>
	{/each}
</Card>
