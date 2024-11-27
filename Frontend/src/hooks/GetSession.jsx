import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetSession = () => {
	const [userData, setUser] = useState(null);
  
	useEffect(() => {
	  const fetchUserInfo = async () => {
		try {
		  const response = await fetch("/api/user-info", {
			method: "GET",
			credentials: "include", // If you need to send cookies with the request
		  });
  
		  if (!response.ok) throw new Error("Session Undefined or Empty");
		 
		  const data = await response.json();
		  setUser(data); // Update user data
  
		} catch (error) {
		  console.error("Error fetching user info:", error);
		  setUser(null); // Set user data to null if there’s an error
		}
	  };
  
	  fetchUserInfo(); // Fetch user info on mount
	}, []); // Empty dependency array means this effect runs only once
  
	return userData; // Return the fetched user data or null
  };

export default GetSession;
