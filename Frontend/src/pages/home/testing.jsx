
import { useEffect, useState } from "react";
import GetSession from "../../hooks/GetSession";
import PostRequest from '../../hooks/PostRequest'
import GetData from '../../hooks/GetData'

function Test() {
	// const user = GetSession()
	const [users, setUsernames] = useState([])

	useEffect(() => {
		const fetchUsers = async() => {

			try {
				const data = await GetData('records/get-permission/1')
				if (!data) throw new Error("No Usernames found")
				console.log(data)

				setUsernames(data)
			} catch (error) {
				console.error(error)
				return
			}
		}

		fetchUsers()

	}, [])
	
	const style = {
		color: 'black'
	}


	const deleteUser = () => {
		localStorage.setItem('userName', )
		
	}

	console.log('users', users)
	return (
		users && users.length > 0 && 
		<section>

			{users.map((user, index) => (
				<ul key={index} style={style}>
					<li>{user.usernames.userName}</li>
					<li><button>Button</button></li>
				</ul>
			))}

		</section>
	);
}

export default Test;
