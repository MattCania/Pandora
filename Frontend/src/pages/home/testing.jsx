import { useState } from "react";
import GetSession from "../../hooks/GetSession";
import PostRequest from '../../hooks/PostRequest'

function Test() {
	const user = GetSession()
	const [file, setFile] = useState(null)

	const handleInputChange = (e) => {
		const { files } = e.target;
		setFile(files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) {
			alert("Please select a file to upload");
			return;
		  }
		const formData = new FormData();
		formData.append('image', file);

		try {

			const tokenResponse = await fetch("/api/csurf-token");
			if (!tokenResponse.ok) throw new Error("Failed to fetch CSRF token");

			const tokenData = await tokenResponse.json()
			const token = tokenData.csrfToken;

			const response = await fetch('/api/upload', {
				method: 'POST',
				headers: {
					"X-CSRF-Token": token
				},
				body: formData,
				credentials: "include",
			})
			if (!response) throw new Error("Error Creation");
			alert("Success");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="image">Image</label>
			<input
				type="file"
				name="image"
				id="image"
				onChange={handleInputChange}
			/>
			<input type="submit" />
		</form>
	);
}

export default Test;
