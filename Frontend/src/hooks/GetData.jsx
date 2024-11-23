
async function GetData(source) {
	try {
		const response = await fetch(`/api/${source}`);

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}
		const data = await response.json();

		console.log("Fetched Data:", data);
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null
	}

}

export default GetData
