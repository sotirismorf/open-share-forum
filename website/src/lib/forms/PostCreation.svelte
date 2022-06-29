<script lang="ts">
	import Card from '$lib/Card.svelte';
	import ButtonPrimary from '$lib/ButtonPrimary.svelte';
	import ButtonSecondary from '$lib/ButtonSecondary.svelte';

	import { store } from '$lib/utils/auth';

	export let postSubmited;
	export let showPostCreation;

	const post = {
		title: null,
		body: null,
		author: 1,
	}

	let error = '';

	async function submitPost() {
		if (!post.title) {
			error = 'Please enter a post title';
		} else if (!post.body) {
			error = 'Cannot submit empty post';
		} else {
			error = '';

			const res = await fetch(`http://localhost:4000/posts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				//body: JSON.stringify({ title: title, body: body, author: $store.id })
				body: JSON.stringify(post)
			});

			const text = res.json();

			if (res.ok) {
				postSubmited();
				console.log(text);
				return text;
			} else {
				console.log(text);
				throw new Error();
			}
		}
	}
</script>

<Card>
	<input
		class="bg-slate-700 rounded-md outline-none p-2"
		placeholder="Title..."
		bind:value={post.title}
	/>
	<textarea
		class="bg-slate-700 rounded-md resize-none outline-none p-2"
		placeholder="Body..."
		bind:value={post.body}
	/>
	<p>{error}</p>
	<div>
		<ButtonPrimary onClick={submitPost}>Post</ButtonPrimary>
		<ButtonSecondary
			onClick={() => {
				showPostCreation = false;
			}}>Cancel</ButtonSecondary
		>
	</div>
</Card>
