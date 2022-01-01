<script>
	export let post;
</script>

<div class="py-2">
	<div class="flex flex-row gap-2 items-center ">
		<div class="w-6 h-6 bg-black rounded-full"></div>

		<span class="text-xl hover:text-slate-400">{post.author.name}</span>
		<span class="text-gray-400">@{post.author.username}</span>
	</div>

	<a href="posts" class="hover:text-slate-400">
		<h1 class="text-2xl">{post.title}</h1>
		<p>{post.body}</p>
	</a>
	<section class="flex flex-row justify-between text-slate-400 pr-2">
		<p>{post.commentNum==1 ? "1 Comment" : post.commentNum+" Comments"}</p>
		<p>{post.date}</p>
	</section>
</div>
