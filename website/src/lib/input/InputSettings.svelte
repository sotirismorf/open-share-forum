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
	<p class="pl-2 pb-1 text-sm font-bold">{description}</p>
	<input
		class="bg-slate-600 placeholder-slate-400 rounded-full py-2 px-4 max-w-sm transition-colors focus:bg-slate-500"
		use:setType
		bind:value
		{placeholder}
	/>
</div>
