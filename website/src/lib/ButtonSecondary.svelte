<script>
	export let onClick;
</script>

<button
	on:click|preventDefault={onClick}
	class="font-bold rounded-full px-3 py-1 w-min h-min whitespace-nowrap
		bg-slate-700 sm:hover:bg-slate-600 active:bg-slate-600 
		outline-none"
>
	<slot />
</button>
