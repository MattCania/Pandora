import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './records.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import GetData from "../../hooks/GetData";
import PostRequest from "../../hooks/PostRequest";
import GetSession from "../../hooks/GetSession";
import ConfirmEdited from "../../components/prompts/confirmEdited";
import { SessionContext } from "../../pages/home/home";

function EditRecords() {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const user = GetSession();
  const { recordId } = useParams();
  const [userPermissions, setUserPermissions] = useState({});
  const [usernames, setUsernames] = useState([]);
  const [usersToAdd, setToAdd] = useState([]);
  const [usersToRemove, setToRemove] = useState([]);
  const [errors, setErrors] = useState({});
  const [isAuth, setAuth] = useState(false);
  const [showEdited, setShowEdited] = useState(false);
  const [permittedUsers, setPermittedUsers] = useState({});

  // Always initialize hooks first, no conditional rendering for hooks
  const [formValues, setFormValues] = useState({
    recordType: "",
    recordName: "",
  });

  

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [user]);
  const fetchPermissions = async () => {
    try {
      const permissions = await GetData(`permitted-users/${recordId}`);
      if (!permissions) return;
	  console.log('Permissions', permissions)
      // Exclude the current user from the list of permitted users
      setPermittedUsers(permissions.filter((username) => username !== user?.profile?.userName));

      const updatedPermissions = permissions.reduce((acc, user) => {
        acc[user.userName] = user.access;
        return acc;
      }, {});

      setUserPermissions(updatedPermissions);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPermissions();
  }, [recordId]);

  // Fetch the record details
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await GetData(`records/open/${recordId}`);
        if (!data) throw new Error("Fetching Error");
        setFormValues(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecord();
  }, [recordId]);

  // Fetch usernames for adding users
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const usernames = await GetData("get-profiles");
        setUsernames(usernames || []);
      } catch (err) {
        console.error("Fetching Usernames", err);
      }
    };
    fetchUsernames();
  }, []);

  const handlePermissionChange = (username, newPermission) => {
    setUserPermissions((prev) => ({
      ...prev,
      [username]: newPermission,
    }));
  };

  const handleAddUser = (event) => {
    const selectedUser = event.target.value;
	console.log(selectedUser)

    if (
      selectedUser &&
      !userPermissions[selectedUser] &&
      !usersToAdd.includes(selectedUser) &&
      !permittedUsers.includes(selectedUser)
    ) {
      setToAdd((prevToAdd) => [...prevToAdd, selectedUser]);
      setUserPermissions((prev) => ({
        ...prev,
        [selectedUser]: 4, // Default permission level
      }));
    }
  };

  const handleRemoveUser = (removedUser) => {
	if (permittedUsers.includes(removedUser)) {
	  setToRemove((prevValues) => {
		const updatedValues = [...prevValues, removedUser];
		console.log(updatedValues); // Log the new state here
		return updatedValues;
	  });
	}
  
	console.log(removedUser);
  
	setUserPermissions((prevPermissions) => {
	  const updatedPermissions = { ...prevPermissions };
	  delete updatedPermissions[removedUser];
	  return updatedPermissions;
	});
  };

  useEffect(() => {
    console.log("Updated usersToAdd:", usersToAdd);
  }, [usersToAdd]);

  useEffect(() => {
    console.log("Updated usersToRemove:", usersToRemove);
  }, [usersToRemove]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formValues.recordType) {
      newErrors.recordType = "Please select a record type.";
    }
    if (!formValues.recordName.trim()) {
      newErrors.recordName = "Record name cannot be empty.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const formData = {
      ...formValues,
      ...(usersToAdd.length > 0 && { usersToAdd }),
      ...(usersToRemove.length > 0 && { usersToRemove }),
    };


	console.log('FormData', formData)
    try {
      const response = await PostRequest(`update-record/${recordId}`, formData);
      if (!response) throw new Error("Updating Data Error");
      setShowEdited(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!user) return null;
  console.log(userPermissions)

  return (
    <section className={styles.blur}>
      <section className={styles.createSection}>
        <div className={styles.buttonDiv}>
          <button type="button" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className={styles.container}>
          <form className={styles.createForm} onSubmit={handleSubmit}>
            <h1>Update Record #{recordId}</h1>
            <div className={styles.recordType}>
              <select
                name="recordType"
                id="recordType"
                value={formValues.recordType}
                onChange={handleInputChange}
                className={errors.recordType ? styles.inputError : ""}
              >
                <option value="" disabled>
                  {errors.recordType || "Record Type"}
                </option>
                <option value="Expenses">Expenses</option>
                <option value="Purchases">Purchases</option>
              </select>
            </div>
            <input
              type="text"
              name="recordName"
              id="recordName"
              value={formValues.recordName}
              onChange={handleInputChange}
              placeholder={errors.recordName || "Record Name"}
              className={errors.recordName ? styles.inputError : ""}
            />

            <select name="usernames" defaultValue="" id="usernames" onChange={handleAddUser}>
              <option value="">Add User</option>
              {usernames?.map((option, index) =>
                user.session.username !== option.userName &&
                !userPermissions[option.userName] &&
                !permittedUsers.includes(option.userName) ? (
                  <option key={index} value={option.userName}>
                    {option.userName}
                  </option>
                ) : null
              )}
            </select>

            <input type="submit" value="Update Record" />
          </form>

          <section className={styles.userSection}>
            <h1>Permitted Users</h1>
            {Object.entries(userPermissions).map(([username, permission], index) => (
              <div key={index} className={styles.permissionTable}>
                <div>{username}</div>
                <div className={styles.permissionTab}>
                  <select
                    name="permission"
                    id="permission"
                    value={permission}
                    onChange={(e) => handlePermissionChange(username, e.target.value)}
                  >
                    <option value={1}>Admin</option>
                    <option value={3}>Editor</option>
                    <option value={4}>Viewer</option>
                  </select>
                  <button onClick={() => {console.log(username, permission); handleRemoveUser(username)}}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
        {showEdited && (
          <ConfirmEdited
            subText="The record has been successfully edited!"
            close={() => {
              setShowEdited(false);
              navigate('/home/records');
            }}
          />
        )}
      </section>
    </section>
  );
}

export default EditRecords;
