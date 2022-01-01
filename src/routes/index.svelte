<script>
	import Card from "$lib/Card.svelte";
	import Post from "$lib/Post.svelte";

	const post = {
		title:"The first post",
		description:"This is the first post featured in the thmmy website",
		date:"1-1-2022",
		author:"Sotiris Morfakidis",
		username:"sotirismorf",
	}

</script>

<title>THMMY</title>
<main class="mt-5">
	<Card>
		<h1 class="text-2xl font-bold">Browse threads here</h1>

		<Post {post} />

	</Card>
</main>
