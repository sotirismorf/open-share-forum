<script lang="ts" context="module">
	export async function load({ params }) {
		const username = params.username;

		const res = await fetch(`http://localhost:4000/user?username=${username}`);
		const postsPromise = await fetch(`http://localhost:4000/posts?user.id=1`);

		if (res.ok && postsPromise.ok) {
			const user = await res.json();
			const posts = await postsPromise.json();

			return {
				props: { user, posts }
			};
		}
		return {
			status: res.status,
			error: new Error(`Could not load folder`)
		};
	}
</script>

<script lang="ts">
	import Card from "$lib/Card.svelte";
	import Post from "$lib/Post.svelte";
	import type { User } from "$entities/User"
	import type { Post as PostEntity } from "$entities/Post"

	export let user: User[];
	export let posts: PostEntity[];

	console.log(user)
</script>

<title>THMMY</title>
<section class="mt-5">
	<Card>
		<section class="divide-y divide-slate-600">
			<div class="w-full mb-4 flex justify-between">
				<h1 
					class="text-2xl font-bold inline-block"
				>{user[0].username}'s Posts</h1>
			</div>
				{#each posts as post}
					<Post {post} />
				{/each}
		</section>
	</Card>
</section>
