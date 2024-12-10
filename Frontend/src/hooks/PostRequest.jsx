async function PostRequest(uri, data) {
	try {
		const tokenResponse = await fetch("/api/csurf-token");
		if (!tokenResponse.ok) throw new Error("Failed to fetch CSRF token");
		
		const tokenData = await tokenResponse.json()
		const token = tokenData.csrfToken;

		const response = await fetch(`/api/${uri}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-Token": token
			},
			body: JSON.stringify(data),
			credentials: "include",
		})

		if (!response.ok) {
			const errResponse = await response.json
			throw new Error(errResponse.message || "Something Went Wrong")
		}

		return response.json()
	}
	catch (error) {
		throw error;
	}

}

export default PostRequest