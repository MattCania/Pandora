import React, { useContext, useState, useEffect } from "react";
import GetSession from "../../hooks/GetSession";
import Loading from "../../partials/loading/loading";
import style from './profileEdit.module.css'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


function ProfileEdit() {
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
            <div className={style.middle}>
                <div className={style.head}>
                    {/* <img src={user.profile.image || '/default-profile.png'} alt="Profile" /> */}
                    <p><FontAwesomeIcon icon={faUser} /></p>
                    <div className={style.titleWrapper}>
                        <h1>Welcome, </h1>
                        <h2> {user.user.firstName} {user.user.lastName}</h2>
                        <h3>Username: {user.profile.userName} || Email: {user.session.email}</h3>
                    </div>
                </div>
                <Link to="../profile"><button className={style.edit}> <FontAwesomeIcon icon={faPen} /> </button></Link>
                <div className={style.upperSection}>
                    <h2>Personal Information</h2>
                    <div className={style.field}>
                        <label>Username:
                        <input type="text" value={user.profile.userName}  /></label>
                        <label>Email:
                        <input type="text" value={user.session.email}  /></label>
                        <label>Suffix:
                        <input type="text" value={user.user.suffix}  /></label>
                        <label>First Name:
                        <input type="text" value={user.user.firstName}  /></label>
                        <label>Last Name:
                        <input type="text" value={user.user.lastName}  /></label>
                        <label>Middle Name:
                        <input type="text" value={user.user.middleName}  /></label>
                        <label>Contact:
                        <input type="text" value={user.profile.contactNumber}  /></label>
                        <label>Birthday:
                        <input type="text" value={user.profile.birthday}  /></label>
                        <label>Gender:
                        <input type="text" value={user.profile.gender}  /></label>
                    </div>
                </div>
                <div className={style.lowerSection}>
                    <h2>Profile Information</h2>
                    <div className={style.field}>
                        <label>Job Title
                        <input type="text" value={user.profile.jobTitle}  /></label>
                        <label>Organization:
                        <input type="text" value={user.profile.organization}  /></label>
                        <label>Department:
                        <input type="text" value={user.profile.department}  /></label>
                        <label>Backup Email
                        <input type="text" value={user.profile.department}  /></label>
                        <label>Street
                        <input type="text" value={user.profile.street}  /></label>
                        <label>City
                        <input type="text" value={user.profile.city}  /></label>
                        <label>State
                        <input type="text" value={user.profile.state}  /></label>
                        <label>Postal
                        <input type="text" value={user.profile.postal}  /></label>
                        <label>Country
                        <input type="text" value={user.profile.country}  /></label>
                    </div>  
                </div>
            </div>
        </section>
    );
}

export default ProfileEdit;