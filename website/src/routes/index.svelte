<script>
	import Card from "$lib/Card.svelte";
	import Post from "$lib/Post.svelte";
	
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
	<Card>
		<section class="divide-y divide-slate-600">
			<h1 
				class="text-2xl font-bold pb-2 mb-2"
			>Browse threads here</h1>
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
