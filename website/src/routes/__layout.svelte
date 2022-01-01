<script>
  	//import { ApolloClient, InMemoryCache } from "@apollo/client/core";
  	//import { setClient } from "svelte-apollo";

	import Nav from './Nav.svelte'
	import '../app.css'
	import '../tailwind.css'

 
  	// 1. Create an Apollo client and pass it to all child components
  	//    (uses svelte's built-in context)
  	//const client = new ApolloClient({
	//	uri: 'http://localhost:4000',
	//	cache: new InMemoryCache()
  	//});
  	//setClient(client);
</script>

<Nav />

<slot></slot>

<style>
	@tailwind base;
	@tailwind components;

	html {
		height: 100%;
	}

</style>
