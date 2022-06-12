<script lang="ts">
	//This component is based on https://svelte.dev/repl/b17c13d4f1bb40799ccf09e0841ddd90
	import InputPrimary from './InputPrimary.svelte';
	import ButtonNoDefault from './buttons/ButtonNoDefault.svelte';
	import ButtonPrimary from './ButtonPrimary.svelte';
	import ButtonSecondary from './ButtonSecondary.svelte';

	import { store } from './utils/auth';
	import { course } from './utils/auth';

	if ($store)
		console.log({
			author: $store.id,
			course: 3
		});

	let fileinput,
		image,
		showPopup = false;

	let fileDescription = '',
		fileBaseName = '',
		fileExtension = '',
		fileDetail = '',
		fileYear = 0,
		fileIsExam = false;

	const metadata = {
		filename: 'lfskdjf.pdf',
		course: $course,
		user: 1,
		semester: 2,
		exams: true,
		exam_year: 2022,
		exam_period: 2,
		has_solutions: false
	};
	//const metadata = {
	//	filename: null,
	//	course: 2,
	//	user: 1,
	//	semester: null,
	//	exams: null,
	//	exam_year: null,
	//	exam_period: null,
	//	has_solutions: null
	//};

	let selectText = 'Φεβρουαρίου';

	let errorPostCreation = '';
	//let avatar

	const onFileSelected = (e) => {
		image = e.target.files[0];
		let fileArray = image.name.split('.');

		fileBaseName = fileArray[0];
		fileExtension = fileArray[1];

		//let reader = new FileReader();
		//reader.readAsDataURL(image);
	};

	function onClickNewUpload() {
		// ALLAKSE AUTO
		//if ($store) showPopup = true;
		if (true) showPopup = true;
		else errorPostCreation = 'You have to be signed in to upload a file';
	}

	function onClickUpload() {
		if (!image) {
			console.log('You have not seleted an image');
		} else if (!fileBaseName || !fileExtension) {
			console.log('Invalid File name');
		} else {
			if (fileIsExam) {
				if (selectText == 'Φεβρουαρίου') metadata.exam_semester = 1;
				else if (selectText == 'Ιουνίου') metadata.exam_semester = 2;
				else if (selectText == 'Σεπτεμβρίου') metadata.exam_semester= 3;
			}
			upload();
		}
	}

	function upload() {
		const formData = new FormData();

		formData.append('file', image);
		formData.append('document', JSON.stringify([metadata]));

		//formData.append('thing', 'string');
		//for (var [key, value] of formData.entries()) {
		//	console.log(key, value);
		//}

		const response = fetch('http://localhost:4000/file', {
			method: 'POST',
			body: formData
		})
			.then((response) => response.json())
			.then((result) => {
				showPopup = false;
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
</script>

<ButtonPrimary onClick={onClickNewUpload}>Upload a File</ButtonPrimary>
<p class="text-red-500">{errorPostCreation}</p>
{#if showPopup}
	<div class="absolute left-0 top-0 w-full h-full bg-black/30">
		<div class="center bg-slate-800 px-4 py-4 rounded-lg">
			<h1>{JSON.stringify(metadata)}</h1>
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
						📃 {fileBaseName}.{fileExtension}
					</div>
				{/if}

				<div>
					<input
						class="appearance-none outline-none h-4 w-4 border border-none rounded-full bg-white checked:bg-green-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
						type="checkbox"
						value="isExamCheckbox"
						bind:checked={metadata.exams}
					/>

					<label for="isExamCheckbox">Αυτό το αρχείο είναι θέμα εξετάσεων</label>
				</div>
				<InputPrimary placeholder="Name" description="Όνομα Αρχείου" bind:value={metadata.filename} />
				{#if fileIsExam}
					<div>
						<select
							class="appearance-none outline-none bg-slate-600 placeholder-slate-400 rounded-full py-2 px-4 max-w-sm w-max transition-colors focus:bg-slate-500"
							bind:value={selectText}
						>
							<option>Φεβρουαρίου</option>
							<option>Ιουνίου</option>
							<option>Σεπτεμβρίου</option>
						</select>
					</div>
					<InputPrimary
						placeholder="π.χ. omadaA, atreas, lyseis"
						description="Λεπτομέρεια "
						bind:value={fileDetail}
					/>
				{/if}
				<InputPrimary
					placeholder="π.χ. Σημειώσεις Εφαρμοσμένα 19-20"
					description="Περιγραφη αρχείου (προαιρετικό)"
					bind:value={fileDescription}
				/>
				<InputPrimary
					placeholder="π.χ. 2021"
					type="number"
					description="Χρονιά"
					bind:value={metadata.exam_year}
				/>
				<div>
					<ButtonNoDefault onClick={onClickUpload}>Enter</ButtonNoDefault>
					<ButtonSecondary
						onClick={() => {
							showPopup = false;
						}}>Cancel</ButtonSecondary
					>
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
