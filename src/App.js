import React, { useState, createContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
import NotFound from "./Components/NotFound/NotFound.js";
import ProtectedComponent from "./Components/ProtectedRoute/Protect_Component.js";

export const DarkModeContext = createContext();

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login_signup />,
    },
    {
      path: "/main",
      element: (
        <ProtectedComponent>
          <div
            className={`web_bg ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            } w-100 h-100 d-flex`}
          >
            <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
              <LeftContainer />
              <MidContainer />
              <RightContainer />
            </DarkModeContext.Provider>
          </div>
        </ProtectedComponent>
      ),
    },
    {
      path: "/explore",
      element: (
        <ProtectedComponent>
          <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <Explore />
          </DarkModeContext.Provider>
        </ProtectedComponent>
      ),
    },
    {
      path: "/reels",
      element: (
        <ProtectedComponent>
          <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <Reels />
          </DarkModeContext.Provider>
        </ProtectedComponent>
      ),
    },
    {
      path: "/:username",
      element: (
        <ProtectedComponent>
          <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <ProfilePage />
          </DarkModeContext.Provider>
        </ProtectedComponent>
      ),
    },
    {
      path: "/notificationsresized",
      element: (
        <ProtectedComponent>
          <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <NotificationsResized />
          </DarkModeContext.Provider>
        </ProtectedComponent>
      ),
    },
    {
      path: "/messagesresized",
      element: (
        <ProtectedComponent>
          <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <MessagesResized />
          </DarkModeContext.Provider>
        </ProtectedComponent>
      ),
    },
    {
      path: "/profileresized",
      element: (
        <ProtectedComponent>
          <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <ProfileResized />
          </DarkModeContext.Provider>
        </ProtectedComponent>
      ),
    },
    {
      path: "*",
      element: (
        <ProtectedComponent>
          <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <NotFound />
          </DarkModeContext.Provider>
        </ProtectedComponent>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
