<script>
	import { goto } from '$app/navigation';
	import Card from '$lib/Card.svelte';
	import ButtonPrimary from '$lib/ButtonPrimary.svelte';
	import InputPrimary from '$lib/InputPrimary.svelte';

	import { store } from '$lib/utils/auth';

	let username = '';
	let password = '';
	let error = '';

	async function onClickLogInButton() {
		console.log(password);
		const response = await fetch('http://localhost:4000/auth/signin', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			//mode: 'cors', // no-cors, *cors, same-origin
			//cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			//credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			//redirect: 'follow', // manual, *follow, error
			//referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify({
				username: username,
				password: password
			}) // body data type must match "Content-Type" header
		});

		if (response.ok) {
			const data = await response.json();
			$store = {
				username: data.username,
				id: data.id,
				token: data.token
			};
			goto('/');
		} else {
			const data = await response.json();
			console.log(data.message);
			error = data.message;
		}
	}
</script>

<title>THMMY: Sign In</title>
<Card>
	<h1 class="text-3xl font-bold text-center pb-7">Συνδέσου στο ΤΗΜΜΥ</h1>
	<form class="flex flex-col items-center gap-3" on:submit|preventDefault={onClickLogInButton}>
		<InputPrimary bind:value={username} description="Username" placeholder="Username" type="text" />
		<InputPrimary
			bind:value={password}
			description="Password"
			placeholder="Password"
			type="password"
		/>
		<ButtonPrimary title="Sign In" type="submit" />
	</form>
	<p>{error}</p>
</Card>
