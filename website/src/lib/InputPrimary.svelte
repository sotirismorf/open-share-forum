<script>
	export let placeholder;
	export let type;
	export let description;
	export let value;

	const setType = (node) => {
	  node.type = type;
	};

</script>

<div>
	<p class="pl-5 pb-1 text-xs font-bold">{description}</p>
	<input
		class="bg-slate-600 rounded-full py-2 px-4 max-w-xs transition-colors focus:bg-slate-500"
		{placeholder}
		use:setType
		bind:value
	/>
</div>
