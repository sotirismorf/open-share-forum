<script>
	import Card from '$lib/Card.svelte';
	import ButtonPrimary from '$lib/ButtonPrimary.svelte';

	import { store } from '$lib/utils/auth';

	let username = '';

	async function onClickLogInButton() {
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
			body: JSON.stringify({ username: username}) // body data type must match "Content-Type" header
		});

		if (response.ok) {
			const data = await response.json();
			$store = {
				username: data.username,
				id: data.id,
				token: data.token
			};
		} else {
			console.log('fail')
		}

	}
</script>

<title>THMMY: Log In</title>
<Card>
	<h1>Login</h1>
	<input class="bg-slate-600" bind:value={username} placeholder="Username" />
	<ButtonPrimary title="Log In" onClick={onClickLogInButton} />
</Card>
