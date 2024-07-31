import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
require("dotenv").config();

import LeftContainer from "./Components/LeftContainer/LeftContainer";
import MidContainer from "./Components/MidContainer/MidContainer";
import RightContainer from "./Components/RightContainer/RightContainer";
import Login_signup from "./Components/Login_Signup/Login_signup";
import Explore from "./Components/Explore/Explore";
import Reels from "./Components/Reels/Reels";
import ProfilePage from "./Components/Profile/ProfilePage";
import NotificationsResized from "./Components/Resized Components/NotificationsResized";
import MessagesResized from "./Components/Resized Components/MessagesResized";
import ProfileResized from "./Components/Resized Components/ProfileResized";

export const AuthenticateContext = createContext();
export const DarkModeContext = createContext();

const App = () => {
  const [authenticate, setAuthenticate] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthenticate(false);
    }

    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${process.env.BACKEND_LINK}/verify-token`,
      RequestOptions
    );

    const data = await response.json();
    console.log(data);

    if(data.valid){
      setAuthenticate(true);
    }
    else{
      setAuthenticate(false);
    }
  };
  
  useEffect(() => {
    handleToken();
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: authenticate ? (
        <Navigate to="/main" />
      ) : (
        <AuthenticateContext.Provider value={{ setAuthenticate }}>
          <Login_signup />
        </AuthenticateContext.Provider>
      ),
    },
    {
      path: "/main",
      element: authenticate ? (
        <div
          className={`web_bg ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } w-100 h-100 d-flex`}
        >
          <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <AuthenticateContext.Provider value={{ setAuthenticate }}>
              <LeftContainer />
            </AuthenticateContext.Provider>

            <MidContainer />

            <RightContainer />
          </DarkModeContext.Provider>
        </div>
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "/explore",

      element: (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          <Explore />
        </DarkModeContext.Provider>
      ),
    },
    {
      path: "/reels",
      element: (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          <Reels />
        </DarkModeContext.Provider>
      ),
    },
    {
      path: "/profilepage",
      element: (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          <ProfilePage />
        </DarkModeContext.Provider>
      ),
    },
    {
      path: "/notificationsresized",
      element: (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          <NotificationsResized />,
        </DarkModeContext.Provider>
      ),
    },
    {
      path: "/messagesresized",
      element: (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          <MessagesResized />,
        </DarkModeContext.Provider>
      ),
    },
    {
      path: "/profileresized",
      element: (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          <ProfileResized />,
        </DarkModeContext.Provider>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
