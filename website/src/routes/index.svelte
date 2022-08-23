<script lang="ts" context="module">
	export async function load({ params, fetch }) {
		const postsPromise = await fetch(`http://localhost:4000/posts`);

		if (postsPromise.ok) {
			return {
				props: {
					posts: await postsPromise.json()
				}
			};
		}
		return {
			status: postsPromise.status,
			error: new Error(`Could not load folder`)
		};
	}
</script>

<script lang="ts">
	import Card from '$lib/Card.svelte';
	import Post from '$lib/Post.svelte';
	import PostCreation from '$lib/forms/PostCreation.svelte';
	import ButtonPrimary from '$lib/ButtonPrimary.svelte';
	import type { Post as PostEntity } from '$entities/Post';

	export let posts: PostEntity[];

	let showPostCreation = false;

	function toggleShowPostCreation() {
		showPostCreation = !showPostCreation;
	}

	function postSubmited() {
		showPostCreation = false;
	}
</script>

<title>THMMY</title>
<main class="mt-5">
	{#if showPostCreation}
		<PostCreation {postSubmited} bind:showPostCreation />
	{/if}
	<Card>
		<section class="divide-y divide-slate-600">
			<div class="w-full mb-4 flex justify-between">
				<h1 class="text-2xl font-bold inline-block">Browse threads here</h1>
				<ButtonPrimary onClick={toggleShowPostCreation}>New Post</ButtonPrimary>
			</div>
			{#each posts as post}
				<Post {post} />
			{/each}
		</section>
	</Card>
</main>
