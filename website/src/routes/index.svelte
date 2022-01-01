<script>
	import Card from "$lib/Card.svelte";
	import Post from "$lib/Post.svelte";

	const post = {
		title:"The first post",
		description:"This is the first post featured in the thmmy website. This is some more text",
		date:"Jan 1st 2022",
		author:"Sotiris Morfakidis",
		username:"sotirismorf",
		comments: [
			{text:"wraio post"},
			{text:"xalia post"},
		],
		commentNum: 2,
	}

</script>

<title>THMMY</title>
<main class="mt-5">
	<Card>
		<section class="divide-y divide-slate-600">
			<h1 
				class="text-2xl font-bold pb-2 mb-2"
			>Browse threads here</h1>
			<Post {post} />
			<Post {post} />
			<Post {post} />
		</section>
	</Card>
</main>
