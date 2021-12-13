export async function get({ params }) {
	const headers = {
      "Content-type": "application/json",
      "Accept": "application/json",
    }
	const res = await fetch(`http://localhost:3001/` , { headers });
	const data = await res.text();
	
	return { body: data };
}
