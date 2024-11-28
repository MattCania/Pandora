import { useContext } from "react";
import { SessionContext } from "../../pages/home/home";
import Loading from "../../partials/loading/loading";
import style from './profile.module.css'

function Profile() {
    const user = useContext(SessionContext);

    if(!user) {
        return (<Loading></Loading>)
    }

    return (
        <div className = {style.profile}>
            <img></img>
            <h1>Welcome, {user.user.firstname}!</h1>
            <p><strong>Username:</strong> {user.profile.userName}</p>
            <p><strong>Email:</strong> {user.session.email}</p>
            <p><strong>Contact:</strong> {user.profile.contact}</p>
            <p><strong>Organization:</strong> {user.profile.organization}</p>
            <p><strong>Department:</strong> {user.profile.department}</p>
            <p><strong>Birthday:</strong> {user.profile.birthday}</p>
            <p><strong>Gender:</strong> {user.profile.gender}</p>
        </div>
    );
}

export default Profile;