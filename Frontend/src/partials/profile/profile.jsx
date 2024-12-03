import React, { useContext, useState, useEffect } from "react";
import GetSession from "../../hooks/GetSession";
import Loading from "../../partials/loading/loading";
import style from './profile.module.css'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
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
                    <p><FontAwesomeIcon icon={faUser} /></p>
                    <div className={style.titleWrapper}>
                        <h1>Welcome,</h1>
                        <h2> {user.user.firstName} {user.user.lastName}</h2>
                        <h3>Username: {user.profile.userName} || Email: {user.session.email}</h3>
                    </div>
                </div>
                <div className={style.upperSection}>
                    <h2>Personal Information</h2>
                    <div className={style.field}>
                        <label>Username:
                        <input type="text" value={user.profile.userName} readOnly /></label>
                        <label>Email:
                        <input type="text" value={user.session.email} readOnly /></label>
                        <label>Suffix:
                        <input type="text" value={user.user.suffix} readOnly /></label>
                        <label>First Name:
                        <input type="text" value={user.user.firstName} readOnly /></label>
                        <label>Last Name:
                        <input type="text" value={user.user.lastName} readOnly /></label>
                        <label>Middle Name:
                        <input type="text" value={user.user.middleName} readOnly /></label>
                        <label>Contact:
                        <input type="text" value={user.profile.contactNumber} readOnly /></label>
                        <label>Birthday:
                        <input type="text" value={user.profile.birthday} readOnly /></label>
                        <label>Gender:
                        <input type="text" value={user.profile.gender} readOnly /></label>
                    </div>
                </div>
                <div className={style.lowerSection}>
                    <h2>Profile Information</h2>
                    <div className={style.field}>
                        <label>Job Title
                        <input type="text" value={user.profile.jobTitle} readOnly /></label>
                        <label>Organization:
                        <input type="text" value={user.profile.organization} readOnly /></label>
                        <label>Department:
                        <input type="text" value={user.profile.department} readOnly /></label>
                        <label>Backup Email
                        <input type="text" value={user.profile.department} readOnly /></label>
                        <label>Street
                        <input type="text" value={user.profile.street} readOnly /></label>
                        <label>City
                        <input type="text" value={user.profile.city} readOnly /></label>
                        <label>State
                        <input type="text" value={user.profile.state} readOnly /></label>
                        <label>Postal
                        <input type="text" value={user.profile.postal} readOnly /></label>
                        <label>Country
                        <input type="text" value={user.profile.country} readOnly /></label>
                    </div>  
                </div>
            </div>
        </section>
    );
}

export default Profile;