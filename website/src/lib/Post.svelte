<script>
	import PostHead from "./PostHead.svelte";
	export let post;

	const myDate = new Date(post.date)
	let date = myDate.toLocaleString('el');
	console.log(date)

</script>

<div class="py-2">
	<PostHead user={post.author} />

	<a href="post/{post.id}" class="hover:text-slate-400">
		<h1 class="text-2xl">{post.title}</h1>
		<p>{post.body}</p>
	</a>
	<section class="flex flex-row justify-between text-slate-400 pr-2">
		<p>{post.commentNum==1 ? "1 Comment" : post.commentNum+" Comments"}</p>
		<p>{date}</p>
	</section>
</div>
