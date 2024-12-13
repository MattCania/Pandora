import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import GetData from '../../hooks/GetData'
import SubHeader from "../../components/overviews/subheader";
import Error from "../../components/error/error";
import Wallet from "../../components/wallet/wallet";
import MoreSidebar from '../../partials/more/more'

function Test() {

	const [data, setData] = useState([])

	const fetchPermissions = async () =>{
		try {
			
			const permissions = await GetData('permitted-users/1')
			if (!permissions) return
			console.log(permissions)
			setData(permissions)

		} catch (error) {
			console.error(error)
			return
			
		}
	}

	useEffect(() => {
		fetchPermissions()
	}, [])

	return (
		<h1>Hello</h1>
	)
}

export default Test;
