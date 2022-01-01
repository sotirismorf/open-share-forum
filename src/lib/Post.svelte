<script>
	export let post;
</script>

<div class="flex flex-row gap-2 items-center">
	<div class="w-6 h-6 bg-black rounded-full"></div>

	<span class="text-xl">{post.author}</span>
	<span class="text-gray-400">@{post.username}</span>
</div>

<h1 class="text-2xl">{post.title}</h1>
<p>{post.description}</p>
