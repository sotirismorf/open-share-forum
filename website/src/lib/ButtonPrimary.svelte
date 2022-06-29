<script lang="ts">
	export let onClick: any;
	export let disabled: boolean = false;
</script>

<button
	on:click={onClick}
	disabled={disabled}
	class="font-bold rounded-full px-3 py-1 w-min h-min whitespace-nowrap
		bg-green-700 sm:hover:bg-green-600 active:bg-green-600 
		outline-none"
>
	<slot />
</button>
