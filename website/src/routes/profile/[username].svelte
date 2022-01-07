<script context="module">
	export async function load({ page }) {
		const username = page.params.username;

		const res = await fetch(`http://localhost:4000/users/get/`+username);

		if (res.ok) {
			const user = await res.json();

			return {
				props: {username, user}
			};
		}
	}
</script>

<script>
	import Card from "$lib/Card.svelte";
	import Post from "$lib/Post.svelte";

	export let username;
	export let user;
	console.log(user)
	
	async function getPosts() {
		const res = await fetch(`http://localhost:4000/users/${user.id}/posts`);
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
<section class="mt-5">
	<Card>
		<section class="divide-y divide-slate-600">
			<div class="w-full mb-4 flex justify-between">
				<h1 
					class="text-2xl font-bold inline-block"
				>{username}'s Posts</h1>
			</div>

			{#await promise}
				<p class="h-80">...waiting</p>
			{:then posts}
				{#each posts as post}
					<Post {post} />
				{/each}
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await}
		</section>
	</Card>
</section>
