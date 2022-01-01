export async function get({ params }) {
	const res = await fetch(`http://localhost:4000/post/${params.postid}`);
	const data = await res.json();
	
	return { body: data };
}
