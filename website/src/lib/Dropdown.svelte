<script>
	import { fade } from 'svelte/transition';
	import { clickOutside } from '$lib/utils/clickOutside'

	let showMenu = false;

	function toggleProfileMenu() {
			showMenu = !showMenu
			console.log(showMenu)
	}

	function handleClickOutside() {
			if (showMenu) showMenu=false
		}

	export let menuItems;
</script>

<div use:clickOutside on:click_outside={handleClickOutside} class="ml-3 relative">
	<div>
		<button
			on:click={toggleProfileMenu}
			type="button"
			class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
			id="user-menu-button"
			aria-expanded="false"
			aria-haspopup="true"
		>
			<span class="sr-only">Open user menu</span>
			<img
				class="h-8 w-8 rounded-full"
				src="https://avatars.githubusercontent.com/u/82419995?s=400&u=2b351c7ed956e79ade0108660a0f449e8f761f18&v=4"
				alt=""
			>
		</button>
	</div>
	{#if showMenu}
	<div
		transition:fade="{{ duration: 200 }}"
		class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="user-menu-button"
		tabindex="-1"
	>
		{#each menuItems as item}
			<a 
				href={item.href} 
				class="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700" 
				role="menuitem" 
				tabindex="-1" 
				id="user-menu-item-0"
			>
				{item.name}
			</a>
		{/each}
	</div>
	{/if}
</div>
