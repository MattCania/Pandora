import React, { useState, useEffect } from "react";
import GetSession from "../../hooks/GetSession";
import Loading from "../../partials/loading/loading";
import style from './profileEdit.module.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PutRequest from "../../hooks/PutRequest";
import PostRequest from "../../hooks/PostRequest";

function ProfileEdit() {
    const navigate = useNavigate();
    const user = GetSession();
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState("");

    useEffect(() => {
        if (user) {
            setFormValues({
                userName: user.profile.userName || "",
                email: user.session.email || "",
                suffix: user.user.suffix || "",
                firstName: user.user.firstName || "",
                lastName: user.user.lastName || "",
                middleName: user.user.middleName || "",
                contactNumber: user.profile.contactNumber || "",
                birthday: user.profile.birthday || null,
                gender: user.profile.gender || "",
                currency: user.profile.currency || "",
                organization: user.profile.organization || "",
                secondaryEmail: user.profile.secondaryEmail || "",
                city: user.profile.city || "",
                state: user.profile.state || "",
                country: user.profile.country || "",
            });
            setLoading(false);
        }
    }, [user]);

    const handleInputChange = (e) => {
        setErrors("");
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const validate = () => {
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        // const formattedBirthday = `${new Date(formValues.birthday).toISOString().slice(0, 10)}T00:00:00`
        const [year, month, day] = formValues.birthday.split("-");
        let formattedBirthday
        if (formValues.birthday) formattedBirthday = `${year}-${month}-${day}`;
        else formattedBirthday = null

        const formData = {
            ...formValues,
            birthday: formattedBirthday
        }

        try {
            const response = await PostRequest("update-profile", formData);

            if (response) {
                navigate("../profile");
            } else {
                throw new Error("Error Updating Profile");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrors("Failed to update profile. Please try again.");
        }
    };

    if (!user) {
        navigate("/login");
        return <Loading />;
    }

    return (
        <section className={style.portion}>
            <div className={style.middle}>
                <div className={style.head}>
                    <p><FontAwesomeIcon icon={faUser} /></p>
                    <div className={style.titleWrapper}>
                        <h1>Welcome,</h1>
                        <h2>{user.user.firstName} {user.user.lastName}</h2>
                        <h3>{user.session.email}</h3>
                    </div>
                </div>
                <Link to="../profile">
                    <button className={style.edit}>
                        <FontAwesomeIcon icon={faX} />
                    </button>
                </Link>
                <form onSubmit={handleSubmit}>
                    <button type="submit" className={style.submit}>Save Changes</button>
                    <div className={style.upperSection}>
                        <h2>Personal Information</h2>
                        <div className={style.field}>
                            <label>Username:
                                <input type="text" name="userName" value={formValues.userName || ""} onChange={handleInputChange} />
                            </label>
                            <label>Email:
                                <input type="email" name="email" value={formValues.email || ""} onChange={handleInputChange} />
                            </label>
                            <label>Suffix:
                                <input type="text" name="suffix" value={formValues.suffix || ""} onChange={handleInputChange} />
                            </label>
                            <label>First Name:
                                <input type="text" name="firstName" value={formValues.firstName || ""} onChange={handleInputChange} />
                            </label>
                            <label>Last Name:
                                <input type="text" name="lastName" value={formValues.lastName || ""} onChange={handleInputChange} />
                            </label>
                            <label>Middle Name:
                                <input type="text" name="middleName" value={formValues.middleName || ""} onChange={handleInputChange} />
                            </label>
                            <label>Contact:
                                <input type="text" name="contactNumber" value={formValues.contactNumber || ""} onChange={handleInputChange} />
                            </label>
                            <label>Birthday:
                                <input type="date" name="birthday" value={formValues.birthday || '0000-00-00'} onChange={handleInputChange} />
                            </label>
                            <label>Gender:
                                <input type="text" name="gender" value={formValues.gender || ""} onChange={handleInputChange} />
                            </label>
                        </div>
                    </div>
                    <div className={style.lowerSection}>
                        <h2>Profile Information</h2>
                        <div className={style.field}>
                            <label>Organization:
                                <input type="text" name="organization" value={formValues.organization || ""} onChange={handleInputChange} />
                            </label>
                            <label>Currency:
                                <input type="text" name="currency" value={formValues.currency || ""} onChange={handleInputChange} />
                            </label>
                            <label>Backup Email:
                                <input type="email" name="secondaryEmail" value={formValues.secondaryEmail || ""} onChange={handleInputChange} />
                            </label>
                            <label>City:
                                <input type="text" name="city" value={formValues.city || ""} onChange={handleInputChange} />
                            </label>
                            <label>State:
                                <input type="text" name="state" value={formValues.state || ""} onChange={handleInputChange} />
                            </label>
                            <label>Country:
                                <input type="text" name="country" value={formValues.country || ""} onChange={handleInputChange} />
                            </label>
                        </div>
                    </div>
                    {errors && <p className={style.error}>{errors}</p>}
                </form>
            </div>
        </section>
    );
}

export default ProfileEdit;
