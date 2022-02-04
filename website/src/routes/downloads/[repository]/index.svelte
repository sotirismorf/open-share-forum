<script>
	import Card from '$lib/Card.svelte';

	const cycle = {
		title: 'Βασικός κύκλος σπουδών',
		id: 'vasikos',
		repositories: [
			{ title: '1o Εξάμηνο', href: '1', folder: true },
			{ title: '2o Εξάμηνο', href: '2', folder: true },
			{ title: '3o Εξάμηνο', href: '3', folder: true },
			{ title: '4o Εξάμηνο', href: '4', folder: false },
			{ title: '5o Εξάμηνο', href: '5', folder: false },
			{ title: '6o Εξάμηνο', href: '6', folder: false }
		]
	};
</script>

<Card>
	<h1 class="text-xl font-bold mb-2">Downloads / <span>{cycle.title}</span></h1>
	{#each cycle.repositories as repo}
		<a class="text-xl overflow-ellipsis overflow-hidden flex" href="/downloads/{cycle.id}/{repo.href}">
			<span class="mr-1">📁</span>
			<p>{repo.title}</p>
		</a>
	{/each}
</Card>
