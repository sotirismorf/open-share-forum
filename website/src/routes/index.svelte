<script>
	import Card from "$lib/Card.svelte";
	import Post from "$lib/Post.svelte";
	import PostCreation from "$lib/PostCreation.svelte";
	import ButtonPrimary from "$lib/ButtonPrimary.svelte";

	let showPostCreation = false;

	function toggleShowPostCreation() {
		showPostCreation = !showPostCreation;
	}
	
	async function getPosts() {
		const res = await fetch(`api/posts`);
		const text = res.json();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text)
		}
	}

	let promise = getPosts();
</script>

<title>THMMY</title>
<main class="mt-5">
	{#if showPostCreation}
		<PostCreation />
	{/if}
	<Card>
		<section class="divide-y divide-slate-600">
			<div class="w-full mb-4 flex justify-between">
				<h1 
					class="text-2xl font-bold inline-block"
				>Browse threads here</h1>
				<ButtonPrimary title="New Post" onClick={toggleShowPostCreation}/>
			</div>

			{#await promise}
				<p>...waiting</p>
			{:then posts}
				{#each posts as post}
					<Post {post} />
				{/each}
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await}
		</section>
	</Card>

</main>
