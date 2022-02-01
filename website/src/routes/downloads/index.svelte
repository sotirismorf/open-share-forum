<script>
	import Card from '$lib/Card.svelte';
	import { intros } from 'svelte/internal';

	const repositories = [
		{ title: 'Βασικός Κύκλος', href: 'vasikos', folder: true },
		{ title: 'Τομέας Ηλεκτρικής Ενέργειας', href: 'energeias', folder: true },
		{ title: 'Τομέας Ηλεκτρονικής και Η/Υ', href: 'hlektronikhs', folder: true },
		{ title: 'Τομέας Τηλεπικοινωνιών', href: 'thlep', folder: false }
	];
</script>

<Card>
	<h1 class="text-3xl font-bold mb-2">Downloads</h1>
	{#each repositories as repo}
		<a class="text-xl overflow-ellipsis overflow-hidden flex" href="downloads/{repo.href}">
			<span class="mr-1">🔥</span>
			<p>{repo.title}</p>
		</a>
	{/each}
</Card>
