<script>
	import Card from "$lib/Card.svelte";
	import InputSettings from "$lib/input/InputSettings.svelte";
	import ButtonPrimary from "$lib/ButtonPrimary.svelte";
</script>

<Card>
	<h1 class="text-xl border-solid border-b border-slate-600 pb-2 mb-2">Public Profile</h1>
	<InputSettings description="Name"/>
	<InputSettings description="URL"/>
	<ButtonPrimary>Update Profile</ButtonPrimary>
</Card>
