import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetData from '../../hooks/GetData'
import style from './profile.module.css'

function Profile() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the user's profile data on component mount
        const fetchUserData = async () => {
            const data = await GetData("profile"); // Assuming /api/profile is the endpoint
            if (data) {
                setUserData(data);
            } else {
                setError("Failed to load user data");
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (!userData) {
        // Redirect to login if no user data is available
        navigate('/login');
        return null;
    }

    return (
        <div className = {style.profile}>
            <h1>Welcome, {userData.firstname}!</h1>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Contact:</strong> {userData.contact}</p>
            <p><strong>Organization:</strong> {userData.organization}</p>
            <p><strong>Department:</strong> {userData.department}</p>
            <p><strong>Birthday:</strong> {userData.birthday}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
        </div>
    );
}