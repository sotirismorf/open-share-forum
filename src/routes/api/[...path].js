export async function get({ params }) {
	const headers = {
      "Accept": "application/json",
    }
	const res = await fetch(`http://localhost:3001/download/${params.path}` , { headers });
	const data = await res.text();
	
	return { body: data };
}
