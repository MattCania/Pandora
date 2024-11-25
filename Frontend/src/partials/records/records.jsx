import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetData from '../../hooks/GetData'

function Records() {
	const navigate = useNavigate()
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchRecords = async () => {
			try {

				const user = await GetData("user-info");
				if (!user) throw new Error("Fetching Error")
				const userId = user.userId
				const records = await GetData(`records/${userId}`)
				setData(records || [])
			}
			catch (err) {
				console.error(err)
			}
		}
		fetchRecords();
	}, [])

	const handleLogout = async () => {
		try {
			const response = await fetch("/api/logout", {
				method: "GET",
				credentials: "include",
			});

			if (!response.ok) throw new Error("Logout Failed")
			console.log("Logged out successfully");
			navigate("/login");

		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Record Type</th>
						<th>Record Name</th>
						<th>Access Type</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{item.transactionId.recordName}</td>
							<td>{item.transactionId.recordType}</td>
							<td>{item.userAccess.accessType}</td>
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={handleLogout}>Logout</button>
		</>
	)

}

export default Records