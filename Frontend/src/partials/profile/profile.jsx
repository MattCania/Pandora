import Raect, { useContext, useState, useEffect } from "react";

import GetSession from "../../hooks/GetSession";
import Loading from "../../partials/loading/loading";
import style from './profile.module.css'
import { SessionContext } from "../../pages/home/home";
import { useNavigate } from "react-router-dom";

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
            <Header />
            <div className={style.left}></div>
            <div className={style.middle}>
                <div className={style.head}>
                    <img src={user.profile.image || '/default-profile.png'} alt="Profile" />
                    <h1>Welcome, {user.user.firstName}!</h1>
                    <div className={style.field}>
                        <label>Username:</label>
                        <input type="text" value={user.profile.userName} readOnly />
                    </div>
                </div>
                <div className={style.upperSection}>
                    <h2>Personal Information</h2>
                    <div className={style.field}>
                        <label>Email:</label>
                        <input type="text" value={user.session.email} readOnly />
                    </div>
                    <div className={style.field}>
                        <label>Contact:</label>
                        <input type="text" value={user.profile.contact} readOnly />
                    </div>
                    <div className={style.field}>
                        <label>Organization:</label>
                        <input type="text" value={user.profile.organization} readOnly />
                    </div>
                    <div className={style.field}>
                        <label>Department:</label>
                        <input type="text" value={user.profile.department} readOnly />
                    </div>
                    <div className={style.field}>
                        <label>Birthday:</label>
                        <input type="text" value={user.profile.birthday} readOnly />
                    </div>
                    <div className={style.field}>
                        <label>Gender:</label>
                        <input type="text" value={user.profile.gender} readOnly />
                    </div>
                </div>
            </div>
            <div className={style.right}></div>
        </section>
    );
}

export default Profile;
