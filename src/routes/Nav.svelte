<script>
	const navigation = [
			{ name: 'Home', href: '/', current: false, prefix: '🏠'},
		{ name: 'Downloads', href: '/downloads', current: false, prefix: '🌐' },
		{ name: 'About', href: '/about', current: false, prefix: 'ℹ️' },
	]
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="bg-gray-800 select-none">
	<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
		<div class="relative flex items-center justify-between h-16">
			<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex-shrink-0 flex items-center">
					<a
						href="/"
						class="text-white font-extrabold text-2xl"
					>NEWTHMMY</a>
				</div>
				<div class="hidden sm:block sm:ml-6">
					<div class="flex space-x-4">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						{#each navigation as item}
							<a
								href={item.href}
								class="{item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white" } px-3 py-2 rounded-md text-sm font-medium"
							>
								{item.name}
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>

<div class="w-full absolute bottom-0 sm:hidden bg-gray-800 h-16 inline-flex justify-center p-2 gap-2">
	{#each navigation as item}
		<a
			href={item.href}
				class="text-center bg-gray-700 flex-1 pt-3 rounded-md font-bold text-l select-none active:bg-gray-500"
		>
			{item.name}
		</a>
	{/each}
</div>
