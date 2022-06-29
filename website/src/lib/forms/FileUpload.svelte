<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';

	import ButtonPrimary from '$lib/ButtonPrimary.svelte';
	import Card from '$lib/Card.svelte';

	import { course } from '../utils/auth';

	interface fileList {
		accepted: File;
		rejected: any;
	}

	let files: fileList = {
		accepted: null,
		rejected: []
	};

	const metadata = {
		filename: 'lfskdjf.pdf',
		type: null,
		course: $course,
		user: 1,
		semester: 2,
		exams: true,
		exam_year: 2022,
		exam_period: 2,
		has_solutions: false
	};

	function formatBytes(bytes, decimals = 2) {
		if (bytes === 0) return '0 Bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;
		console.log(e.detail.acceptedFiles);
		//files.accepted = [...files.accepted, ...acceptedFiles];
		files.accepted = acceptedFiles[0];
		files.rejected = [...files.rejected, ...fileRejections];
		console.log(files.rejected);
	}

	function handleUpload() {
		const formData = new FormData();
		console.log(files.accepted);

		formData.append('file', files.accepted);

		metadata.filename = files.accepted.name;
		metadata.type = files.accepted.type;
		formData.append('document', JSON.stringify([metadata]));

		fetch('http://localhost:4000/file', {
			method: 'POST',
			body: formData
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

<Card>
	<Dropzone
		maxSize="100000"
		multiple="false"
		disableDefaultStyles="false"
		containerClasses="bg-gray-800"
		on:drop={handleFilesSelect}
	>
		<div
			class="p-16 m-auto rounded-md mb-2
				border-gray-400 border-dashed border-2"
		>
			<p class="text-center">
				Κάνε <b>drag and drop</b> τo αρχείο σου,<br />
				ή <b>πάτησε εδώ</b> για να τo επιλέξεις
			</p>
		</div>
	</Dropzone>
	<ol class="mb-2">
		{#if files.accepted}
			📃 {files.accepted.name}<span class="italic text-green-400 pl-2"
				>{formatBytes(files.accepted.size)}</span
			>
		{/if}
		{#each files.rejected as item}
			<li class="text-red-500">
				📃 {item.file.name}<span class="italic text-green-400 pl-2"
					>{formatBytes(item.file.size)}</span
				>
			</li>
			<p>{item.errors[0].code} {item.errors[0].message}</p>
		{/each}
	</ol>
	<form>
		<ButtonPrimary
			disabled={files.accepted == null}
			onClick={handleUpload}
		>Upload</ButtonPrimary>
	</form>
</Card>
