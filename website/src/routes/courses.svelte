<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('http://localhost:4000/courses');

		if (res.ok) {
			const data = await res.json();
			return {
				props: {
					items: data
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
	
	export let items
</script>

<Card>
	<h1 class="text-xl">Μαθήματα</h1>
	{#each items as course}
		<p>{course.name}, {course.semester}ο εξάμηνο, {course.study_cycle}ος κύκλος σπουδών</p>
	{/each}
</Card>
