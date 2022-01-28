<script context="module">
	export async function load({ page }) {
		const postid = page.params.postid;
		
		return {
			props: {postid}
		};
	}
</script>

<script>
	import Card from "$lib/Card.svelte";
	import PostHead from "$lib/PostHead.svelte";

	export let postid;

	async function getPost() {
		//const res = await fetch(`/api/post/${postid}`);
		const res = await fetch(`http://localhost:4000/posts/${postid}`);
		const text = res.json();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text)
		}
	}

	async function getComments() {
		//const res = await fetch(`/api/post/${postid}`);
		const res = await fetch(`http://localhost:4000/posts/${postid}/comments`);
		const text = res.json();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text)
		}
	}

	let commentNum = 1;
	let promise = getPost()
	let commentPromise = getComments();
</script>

{#await promise}
	<title>THMMY</title>
{:then post}
	<title>{post.title}</title>
{:catch error}
	<title>Failed to load post</title>
{/await}

<svelte:head>
	<title>THMMY</title>
</svelte:head>

<Card>
	<section class="divide-y divide-slate-600">
	{#await promise}
		<p>...waiting</p>
	{:then post}
		<div class="pb-2">
			<PostHead user={post.author} />
			<h1 class="text-2xl">{post.title}</h1>
			<p>{post.body}</p>
			<section class="flex flex-row justify-between text-slate-400 pr-2">
				<p>{post.commentNum==1 ? "1 Comment" : post.commentNum+" Comments"}</p>
				<p>{post.date}</p>
			</section>
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}

	<h2 class="text-2xl py-2">Comments</h2>
	{#await commentPromise}
		<p>Loading comments...</p>
	{:then comments}
		{#each comments as comment}
			<section class="pt-2">
				<PostHead user={comment.author} />
				<p class="text-xl">{comment.body}</p>
			</section>
		{/each}
	{:catch error}
		<p>{error.message}</p>
	{/await}
	</section>
</Card>
