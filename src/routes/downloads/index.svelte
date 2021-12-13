<script>
	const repositories = [
		{ title: 'Βασικός Κύκλος', href: 'vasikos', folder: true },
		{ title: 'Τομέας Ηλεκτρικής Ενέργειας', href: 'energeias', folder: true },
		{ title: 'Τομέας Ηλεκτρονικής και Η/Υ', href: 'hlektronikhs', folder: true },
		{ title: 'Τομέας Τηλεπικοινωνιών', href: 'thlep', folder: false }
	]
</script>

<div class="mt-5">
	<main class="flex flex-col sm:rounded-lg p-4 mx-auto sm:max-w-lg bg-gray-800">
		<h1 class="text-3xl font-bold mb-2">Downloads</h1>
		{#each repositories as repo} 
			<a
				class="text-xl"
				href="downloads/{repo.href}">🔥 {repo.title}</a>
		{/each}
	</main>
</div>

