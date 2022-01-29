<script>
	//export let title;
	export let href;
</script>

<a
	href={href}
	class="font-bold rounded-full px-3 py-1 w-min h-min whitespace-nowrap
		bg-green-700 sm:hover:bg-green-600 active:bg-green-600 
		outline-none"
>
	<slot></slot>
</a>
