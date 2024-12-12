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

	return (
		<Wallet/>
	)
}

export default Test;
