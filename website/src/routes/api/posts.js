export async function get() {
	const res = await fetch('http://localhost:4000/posts');
  const data = await res.json();

		return {body: data};
}
