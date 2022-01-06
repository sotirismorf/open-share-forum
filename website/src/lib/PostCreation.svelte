<script>
	import Card from "$lib/Card.svelte";
	import ButtonPrimary from "$lib/ButtonPrimary.svelte";
	import ButtonSecondary from "$lib/ButtonSecondary.svelte";

	import { store } from '$lib/utils/auth';

	export let postSubmited;
	export let showPostCreation;

	let title=""
	let body=""
	let error=""

	async function submitPost() {
		if (!title) {
			error="Please enter a post title"
		} else if (!body) {
			error="Cannot submit empty post"
		} else {
			error=""
			
			const res = await fetch(`http://localhost:4000/posts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({title: title, body: body, author: $store.id}) 
			});

			const text = res.json();

			if (res.ok) {
				postSubmited();
				console.log(text)
				return text;
			} else {
				console.log(text)
				throw new Error(text)
			}
		}
	}
</script>

<Card>
	<input
		class="bg-slate-700 rounded-md outline-none p-2"
		placeholder="Title..."
		bind:value={title}
	>
	<textarea
		class="bg-slate-700 rounded-md resize-none outline-none p-2"
		placeholder="Body..."
		bind:value={body}
	/>
	<p>{error}</p>
	<div>
		<ButtonPrimary title="Post" onClick={submitPost}/>
		<ButtonSecondary title="Cancel" onClick={() => {showPostCreation=false}}/>
	</div>
</Card>
