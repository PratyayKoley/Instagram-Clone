import React, { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
export const UserInfoContext = createContext();

const Protect_Component = ({children}) => {    
  const [authenticate, setAuthenticate] = useState(null);
  const [userName, setUserName] = useState("");

  const handleToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthenticate(false);
    }

    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_LINK}/verify-token`,
      RequestOptions
    );

    const data = await response.json();
    console.log(data);

    if (data.valid) {
      setUserName(data.username);
      setAuthenticate(true);
    } else {
      setAuthenticate(false);
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  if (authenticate === false) {
    return <Navigate to = "/" />
  }

  return(
    <UserInfoContext.Provider value={{userName}}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default Protect_Component;
