<script>
	//This component is based on https://svelte.dev/repl/b17c13d4f1bb40799ccf09e0841ddd90
	import InputPrimary from './InputPrimary.svelte';
	import ButtonNoDefault from './buttons/ButtonNoDefault.svelte';
	import ButtonPrimary from './ButtonPrimary.svelte';
	import ButtonSecondary from './ButtonSecondary.svelte';

	import { store } from './utils/auth'
	console.log($store);

	export let path;
	let fileinput, image, showPopup = false;
	let fileName, isExam = false;
	let errorPostCreation = ""
	//let avatar

	const onFileSelected = (e) => {
		image = e.target.files[0];
		fileName = image.name;
		//let reader = new FileReader();
		//reader.readAsDataURL(image);

		//reader.onload = e => {
		//	avatar = e.target.result
		//};
	};

	function onClickNewUpload() {
		if ($store) showPopup = true;
		else errorPostCreation = "You have to be signed in to upload a file"
	}

	function upload() {
		//const formData = new FormData();
		//formData.append('dataFile', image);
		//formData.append('path', path + '/');
		const upload = fetch('http://localhost:4000/downloads', {
			method: 'POST',
			headers: {
				'ContentType': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({
				author: 1,
				filename: "new_file",
				filetype: "pdf",
				description: "testing the new api",
				detail: "new_file",
				course: 3,
				year: 2021,
				isExam: false,
				examSemester: 1,
				hasSolutions: 1,
			})
		})
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
</script>

<ButtonPrimary
	onClick={onClickNewUpload}>Upload a File</ButtonPrimary
>
<p class="text-red-500">{errorPostCreation}</p>
{#if showPopup}
	<div class="center bg-slate-800 px-4 py-4 rounded-lg">
		<form class="flex flex-col gap-2">
			<ButtonNoDefault
				onClick={() => {
					fileinput.click();
				}}>Select a File From your Computer</ButtonNoDefault
			>
			{#if image}
				<p class="ml-3 inline-block p-2">File Selected</p>
				<div
					class="border-gray-400 border-dashed border-2 p-3 my-3 rounded-lg block overflow-ellipsis overflow-hidden whitespace-nowrap"
				>
					📃 {fileName}
				</div>
			{/if}

			<div>
				<input
					class="appearance-none outline-none h-4 w-4 border border-none rounded-full bg-white checked:bg-green-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
					type="checkbox"
					value="isExam"
					bind:checked={isExam}
				/>

				<label for="isExam">Αυτό το αρχείο είναι θέμα εξετάσεων</label>
			</div>
			<InputPrimary placeholder="Name" description="Όνομα Αρχείου" bind:value={fileName} />
			{#if isExam}
				<InputPrimary placeholder="π.χ. omadaA, atreas, lyseis" description="Λεπτομέρεια " />
			{/if}
			<InputPrimary placeholder="π.χ. Σημειώσεις Εφαρμοσμένα 19-20" description="Περιγραφη αρχείου (προαιρετικό)" />
			<InputPrimary placeholder="Year" type="number" description="Χρονιά"/>
			<div>
				<ButtonNoDefault onClick={upload}>Enter</ButtonNoDefault>
				<ButtonSecondary onClick={() => {showPopup = false;}}>Cancel</ButtonSecondary>
			</div>

			<input
				style="display:none"
				type="file"
				accept=".pdf, .txt, .jpg, .jpeg, .png"
				on:change={(e) => onFileSelected(e)}
				bind:this={fileinput}
			/>
		</form>
	</div>
{/if}

<style>
	.center {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
