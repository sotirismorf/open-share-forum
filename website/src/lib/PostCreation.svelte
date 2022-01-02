<script>
	import Card from "$lib/Card.svelte";

	let title=""
	let body=""
	let error=""

	async function submitPost() {
		if (!title) {
			error="Please enter a post title"
		} else if (!body) {
			error="Cannot submit empty post"
		} else {
			error=""
			
			const res = await fetch(`http://localhost:4000/posts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({title: title, body: body, author: 3}) 
			});

			const text = res.json();

			if (res.ok) {
				console.log(text)
				return text;
			} else {
				console.log(text)
				throw new Error(text)
			}
		}
	}
</script>

<Card>
	<input
		class="bg-slate-700 rounded-md outline-none p-2"
		placeholder="Title..."
		bind:value={title}
	>
	<textarea
		class="bg-slate-700 rounded-md resize-none outline-none p-2"
		placeholder="Body..."
		bind:value={body}
	/>
	<p>{error}</p>
	<button
		class="bg-green-700 rounded-full w-32 py-1"
		on:click={submitPost}
	>Submit post</button>
</Card>
