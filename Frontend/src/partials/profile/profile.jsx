import React, { useContext, useState, useEffect } from "react";
import GetSession from "../../hooks/GetSession";
import Loading from "../../partials/loading/loading";
import style from './profile.module.css'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Profile() {
    const navigate = useNavigate()
	const user = GetSession()
	const [isAuth, setAuth] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) return;

		if (user) {
            alert(user.profile.birthday)
			setAuth(true);
		} else {
			setAuth(false);
		}
	}, [user, loading]);
    console.log(user)
    
    if(!user) {
        navigate('/login')
        return (<Loading></Loading>)
    }

    return (
        <section className={style.portion}>
            <div className={style.middle}>
                <div className={style.head}>
                    <p><FontAwesomeIcon icon={faUser} /></p>
                    <div className={style.titleWrapper}>
                        <h1>Welcome, </h1>
                        <h2> {user.user.firstName} {user.user.lastName}</h2>
                        <h3>{user.session.email}</h3>
                    </div>
                </div>
                <Link to="profileEdit"><button className={style.edit}> <FontAwesomeIcon icon={faPen} /> </button></Link>
                <div className={style.upperSection}>
                    <h2>Personal Information</h2>
                    <div className={style.field}>
                        <label>Username:
                        <input type="text" value={user.profile.userName || ""} readOnly /></label>
                        <label>Email:
                        <input type="email" value={user.session.email || ""} readOnly /></label>
                        <label>Suffix:
                        <input type="text" value={user.user.suffix || ""} readOnly /></label>
                        <label>First Name:
                        <input type="text" value={user.user.firstName || ""} readOnly /></label>
                        <label>Last Name:
                        <input type="text" value={user.user.lastName || ""} readOnly /></label>
                        <label>Middle Name:
                        <input type="text" value={user.user.middleName || ""} readOnly /></label>
                        <label>Contact:
                        <input type="text" value={user.profile.contactNumber || ""} readOnly /></label>
                        <label>Birthday:
                        <input type="date" value={user.profile.birthday} readOnly /></label>
                        <label>Gender:
                        <input type="text" value={user.profile.gender || ""} readOnly /></label>
                    </div>
                </div>
                <div className={style.lowerSection}>
                    <h2>Profile Information</h2>
                    <div className={style.field}>
                        <label>Organization:
                        <input type="text" value={user.profile.organization || ""} readOnly /></label>
                        <label>Currency
                        <input type="text" value={user.profile.currency || ""} readOnly /></label>
                        <label>Backup Email
                        <input type="text" value={user.profile.secondaryEmail || ""} readOnly /></label>
                        <label>City
                        <input type="text" value={user.profile.city || ""} readOnly /></label>
                        <label>State
                        <input type="text" value={user.profile.state || ""} readOnly /></label>
                        <label>Country
                        <input type="text" value={user.profile.country || ""} readOnly /></label>
                    </div>  
                </div>
            </div>
        </section>
    );
}

export default Profile;