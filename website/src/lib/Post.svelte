<script lang="ts">
	import PostHead from './PostHead.svelte';
	import type { Post } from '$entities/Post'
	export let post: Post;

	const myDate = new Date(post.created);
	let date = myDate.toLocaleString('el');
</script>

<div class="py-2">
	<PostHead user={post.user} />

	<a href="/post/{post.id}" class="hover:text-slate-400">
		<h1 class="text-2xl">{post.title}</h1>
		<p>{post.body}</p>
	</a>
	<section class="flex flex-row justify-between text-slate-400 pr-2">
		<p>{post.numOfComments == 1 ? '1 Comment' : post.numOfComments + ' Comments'}</p>
		<p>{date}</p>
	</section>
</div>
