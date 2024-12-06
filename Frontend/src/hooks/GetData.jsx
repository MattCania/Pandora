async function GetData(uri) {
	try {
		const response = await fetch(`/api/${uri}`);

		if (!response.ok) throw new Error("Failed to fetch data");
		
		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null
	}
}

export default GetData
