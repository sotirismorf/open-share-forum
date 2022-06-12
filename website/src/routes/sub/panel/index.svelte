<script context="module">
	export async function load({ page, fetch }) {
		const res = await fetch(`http://localhost:4000/courses`);
		//const res = await fetch(`http://localhost:4000/repositories`);

		if (res.ok) {
			const courses = await res.json();
			console.log(courses);
			return {
				props: {
					courses,
					repository: page.params.repository,
					semester: page.params.semester
				}
			};
		} else
			return {
				status: res.status,
				error: new Error(`Could not load folder`)
			};
	}
</script>

<script lang="ts">
	import ButtonPrimary from '$lib/ButtonPrimary.svelte';
	import Card from '$lib/Card.svelte';
	import InputPrimary from '$lib/InputPrimary.svelte';

	const course = {
		name: '',
		codename: '',
		semester: null,
		repository: null
	};
		// Example POST method implementation:
	async function postData(url = '', data = {}) {
	  // Default options are marked with *
	  const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
		  'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	  });
	  return response.json(); // parses JSON response into native JavaScript objects
	}

	function onSubmit() {
		postData('http://localhost:4000/courses', course).then((data) => {
			console.log(data); // JSON data parsed by `data.json()` call
		});
	}

	const form = [
		{
			name: 'name',
			type: 'text',
			placeholder: 'Λογισμός Ι',
			description: 'Μάθημα',
			value: course.name
		},
		{
			name: 'codename',
			type: 'text',
			placeholder: 'logismos1',
			description: 'Κωδικός Μαθήματος',
			value: ''
		},
		{
			name: 'semester',
			description: 'Εξάμηνο',
			type: 'number',
			placeholder: '2',
			value: ''
		},
		{
			name: 'repository',
			type: 'number',
			placeholder: '3',
			description: 'Κύκλος Σπουδών',
			value: ''
		}
	];

	function handleSubmit(e) {
		console.log(e);
		//isSuccessVisible = true;
		//setTimeout(function(){
		//isSuccessVisible = false;
		//}, 4000);
	}
</script>

<Card>
	<form on:submit|preventDefault={handleSubmit}>
		{#each form as item}
			<InputPrimary {...item} bind:value={course[item.name]} />
		{/each}
		<ButtonPrimary onClick={onSubmit}>Hello</ButtonPrimary>
	</form>
	{JSON.stringify(course)}
</Card>
