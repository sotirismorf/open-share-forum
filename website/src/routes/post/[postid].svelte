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
	import Post from "$lib/Post.svelte";
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

	let promise = getPost();

		//{#each post.comments as comment}
		//	<section>
		//		<PostHead user={comment.author} />
		//		<p class="text-xl">{comment.body}</p>
		//	</section>
		//{/each}

</script>

{#await promise}
	<title>THMMY</title>
{:then post}
	<title>{post.title}</title>
{:catch error}
	<title>Failed to load post</title>
{/await}

<title>THMMY</title>
<Card>
	<section class="divide-y divide-slate-600">
	{#await promise}
		<p>...waiting</p>
	{:then post}
		<div>
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
	</section>
</Card>
