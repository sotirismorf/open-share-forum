<script>
	import { fade } from 'svelte/transition';
	import { clickOutside } from '$lib/utils/clickOutside';
	import { logout } from '$lib/utils/auth';

	let showMenu = false;

	function toggleProfileMenu() {
		showMenu = !showMenu;
		console.log(showMenu);
	}

	function handleClickOutside() {
		if (showMenu) showMenu = false;
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
			/>
		</button>
	</div>
	{#if showMenu}
		<div
			class="bg-slate-800 origin-top-right absolute right-0 top-14 mt-2 w-48 rounded-lg shadow-lg py-2 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
			transition:fade={{ duration: 200 }}
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="user-menu-button"
			tabindex="-1"
		>
			{#each menuItems as item}
				<a
					href={item.href}
					class="hover:bg-slate-700 block px-4 py-2 text-sm"
					role="menuitem"
					tabindex="-1"
				>
					{item.name}
				</a>
			{/each}
			<button
				class="hover:bg-slate-700 w-full text-left block px-4 py-2 text-sm"
				on:click={logout}
				role="menuitem"
				tabindex="-1"
			>
				Sign out
			</button>
		</div>
	{/if}
</div>
