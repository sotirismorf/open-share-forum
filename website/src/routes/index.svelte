<script>
	import { query, subscribe } from 'svelte-apollo';
	import { gql } from '@apollo/client/core'
	import Card from "$lib/Card.svelte";
	import Post from "$lib/Post.svelte";

	const posts = query(gql`
query Query {
  posts {
    title
    body
    date
    id
    author {
      name
      username
    }
	commentNum
  }
}
	`);

	const post = {
		title:"The first post",
		title:"This is the first post featured in the thmmy website. This is some more text",
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
			{#if $posts.loading}
				<li>Loading...</li>
			{:else if $posts.error}
				<li>ERROR: {$posts.error.message}</li>
			{:else if $posts.data}
				{#each $posts.data.posts as post}
					<Post {post} />
				{/each}
			{:else}
				<li>No books found</li>
			{/if}
		</section>
	</Card>

</main>
