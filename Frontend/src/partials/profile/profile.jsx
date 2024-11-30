import React, { useContext, useState, useEffect } from "react";
import GetSession from "../../hooks/GetSession";
import Loading from "../../partials/loading/loading";
import style from './profile.module.css'
import { SessionContext } from "../../pages/home/home";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Header from "../header/Header";
import Logo from '/src/assets/MainLogo.svg'

function Profile() {
    const navigate = useNavigate()
	const user = GetSession()
	const [isAuth, setAuth] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) return;

		if (user) {
			setAuth(true);
		} else {
			setAuth(false);
		}
	}, [user, loading]);
    
    if(!user) {
        navigate('/login')
        return (<Loading></Loading>)
    }

    return (
        <section className={style.portion}>
            <header className={style.header}>
                <a href="/home"><img src={Logo}/></a>
            </header>
            <div className={style.middle}>
                <div className={style.head}>
                    {/* <img src={user.profile.image || '/default-profile.png'} alt="Profile" /> */}
                    <h1><FontAwesomeIcon icon={faUser}/></h1>
                    <h1>Welcome, {user.user.firstName}!</h1>
                    <div className={style.field}>
                    </div>
                </div>
                <div className={style.upperSection}>
                    <h2>Personal Information</h2>
                    <div className={style.field}>
                        <label>Username:</label>
                        <input type="text" value={user.profile.userName} readOnly />
                        <label>Email:</label>
                        <input type="text" value={user.session.email} readOnly />
                        <label>Contact:</label>
                        <input type="text" value={user.profile.contact} readOnly />
                        <label>Organization:</label>
                        <input type="text" value={user.profile.organization} readOnly />
                        <label>Department:</label>
                        <input type="text" value={user.profile.department} readOnly />
                        <label>Birthday:</label>
                        <input type="text" value={user.profile.birthday} readOnly />
                        <label>Gender:</label>
                        <input type="text" value={user.profile.gender} readOnly />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;