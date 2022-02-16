<script>
	import Card from '$lib/Card.svelte';

	const cycle = {
		title: 'Βασικός κύκλος σπουδών',
		id: 'vasikos',
		repositories: [
			{ title: '1o Εξάμηνο', href: '1'},
			{ title: '2o Εξάμηνο', href: '2'},
			{ title: '3o Εξάμηνο', href: '3'},
			{ title: '4o Εξάμηνο', href: '4'},
			{ title: '5o Εξάμηνο', href: '5'},
			{ title: '6o Εξάμηνο', href: '6'}
		]
	};
</script>

<Card>
	<h1 class="text-xl font-bold mb-2">{cycle.title}</h1>
	{#each cycle.repositories as repo}
		<a class="text-xl overflow-ellipsis overflow-hidden flex" href="/downloads/{cycle.id}/{repo.href}">
			<span class="mr-1">📁</span>
			<p>{repo.title}</p>
		</a>
	{/each}
</Card>
