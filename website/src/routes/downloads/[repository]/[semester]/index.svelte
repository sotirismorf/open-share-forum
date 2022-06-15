<script context="module">
	export async function load({ params, fetch }) {
		const res = await fetch(
			`http://localhost:4000/courses/semester/${params.semester}`
		);

		if (res.ok) {
			const courses = await res.json();
			return {
				props: {
					courses,
					repository: params.repository,
					semester: params.semester
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
	import Breadcrumb from '$lib/Breadcrumb.svelte';

	//TODO: na apofasisw an thelw na kanw fetch ta items ston server kai na
	//      epistrefw mazi thn istoselida h na ta kanw fetch apo to
	//      client kai na kanw await blocks

	export let courses;
	//export let items;
	//export let breadcrumbItems;
	export let repository;
	export let semester;
</script>

<Card>
	<!-- <Breadcrumb items={breadcrumbItems} /> -->
	<!-- {#if items.length == 0} -->
	<!-- 	<div class="my-24 text-center"> -->
	<!-- 		<h1 class="text-3xl font-bold">This directory is empty... 😅</h1> -->
	<!-- 		<p class="text-3xl mt-5">You can help by uploading a file!</p> -->
	<!-- 	</div> -->
	<!-- {/if} -->
	{#each courses as course}
		<a
			class="text-xl hover:text-gray-300"
			href="/downloads/{repository}/{semester}/{course.id}"
			>📁 {course.name}
		</a>
	{/each}
</Card>
