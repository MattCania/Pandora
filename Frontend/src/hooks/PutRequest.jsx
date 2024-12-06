async function PutRequest(uri, data) {
	try {
		const tokenResponse = await fetch("/api/cusrf-token");
		if (!tokenResponse.ok) throw new Error("Failed to fetch CSRF token");
		
		const tokenData = await tokenResponse.json()
		const token = tokenData.csrfToken;

		const response = await fetch(`/api/${uri}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-Token": token
			},
			body: JSON.stringify(data),
			credentials: "include",
		})
		return response.json()
	}
	catch (err) {
		console.error("Error", err.message);
		return { error: err.message }
	}

}

export default PutRequest