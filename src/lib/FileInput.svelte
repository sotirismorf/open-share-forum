<script>
	//This component is based on https://svelte.dev/repl/b17c13d4f1bb40799ccf09e0841ddd90

	export let path;
	let fileinput, image;
	//let avatar

	const onFileSelected = (e) => {
		image = e.target.files[0];
		//let reader = new FileReader();
		//reader.readAsDataURL(image);

		//reader.onload = e => {
		//	avatar = e.target.result
		//};
	}

	function upload() {
		console.log(path)
		const formData = new FormData();
		formData.append('dataFile', image);
		formData.append('path', path+'/');
		//console.log(image)
		const upload = fetch('http://localhost:3001/upload', {
			method: 'POST',
			body: formData
		}).then((response) => response.json()).then((result) => {
			console.log('Success:', result);
		}).catch((error) => {
				console.error('Error:', error);
		});
	}
</script>

<form>
	<div
		class="inline-block mt-5 chan bg-gray-200 text-gray-800 p-2 rounded-md font-bold hover:bg-gray-400 cursor-pointer active:bg-gray-300 duration-100"
		on:click={() => {fileinput.click();}}
	>Upload a File</div>
	{#if image}
		<p class="ml-3 inline-block p-2">File Selected</p>
		<div
		   class="border-gray-400 border-dashed border-2 p-3 my-3 rounded-lg block overflow-ellipsis overflow-hidden whitespace-nowrap"
		>📃 {image.name}</div>
		<button on:click={upload} class="bg-green-600 py-2 px-4 rounded-md hover:bg-green-700 text-gray-800 font-bold">Enter</button>
	{/if}
	
<input style="display:none" type="file" accept=".pdf, .txt, .jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
</form>
	


