<script>
	import Card from '$lib/Card.svelte';

	const cycle = {
		title: 'Βασικός κύκλος σπουδών',
		id: 'vasikos',
		repositories: [
			{ title: '1o Εξάμηνο', href: 'sem1', folder: true },
			{ title: '2o Εξάμηνο', href: 'sem2', folder: true },
			{ title: '3o Εξάμηνο', href: 'sem3', folder: true },
			{ title: '4o Εξάμηνο', href: 'sem4', folder: false },
			{ title: '5o Εξάμηνο', href: 'sem5', folder: false },
			{ title: '6o Εξάμηνο', href: 'sem6', folder: false }
		]
	};
</script>

<Card>
	<h1 class="text-2xl font-bold mb-2">Downloads / <span>{cycle.title}</span></h1>
	{#each cycle.repositories as repo}
		<a class="text-xl overflow-ellipsis overflow-hidden flex" href="/downloads/{cycle.id}/{repo.href}">
			<span class="mr-1">📁</span>
			<p>{repo.title}</p>
		</a>
	{/each}
</Card>
