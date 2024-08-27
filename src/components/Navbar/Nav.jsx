import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import checkAuth from "../../utils/checkAuth";
import { BiCross, BiDotsVerticalRounded, BiExit, BiHome, BiListOl, BiListUl, BiLogIn, BiLogInCircle, BiPlus } from "react-icons/bi";
import getCookie from "../../utils/getCookie";
import getPerson from "../../utils/getPerson";
import { UserSettings02Icon } from "hugeicons-react";
import { GrGlobe, GrHome, GrGroup, GrUserSettings, GrUserAdmin } from "react-icons/gr";
import feather from 'feather-icons';
import "./Nav.css";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['sociotoken']);
    const [uid, setUID] = useState('');

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const LogOut = () => {
        removeCookie('sociotoken');
        window.location.pathname = "/";
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            const person = await getPerson(getCookie('socio-user'));
            setUID(person.uid);

            if (await checkAuth()) {
                setAuth(true);
            } else {
                setAuth(false);
            }
        };

        checkAuthentication();
    }, []);

    useEffect(() => {
        feather.replace();
    }, []);

    const getActiveClass = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
      <div
        className={`navbar z-30 fixed flex w-screen top-0 justify-between items-center px-10 py-5 drop-shadow-2xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} transition-colors`}
        style={{
          bottom: window.innerWidth < 766 ? "0" : "",
          top: window.innerWidth < 766 ? "auto" : "0",
        }}
      >
        <div className="logo text-4xl none lg:flex">
          {window.innerWidth < 766 ? "" : "SOCIO"}
        </div>
        <ul
          className={`flex flex-row w-full justify-evenly items-center fixed bottom-0 left-0 h-full ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}
          style={{
            display: window.innerWidth < 766 ? "flex" : "none",
          }}
        >
          <li id="nav-links" className={getActiveClass("/")}>
            <Link to="/">
              <GrHome color={darkMode ? "white" : "black"} />
            </Link>
            <div className="dot"></div>
          </li>
          <li id="nav-links" className={getActiveClass("/people")}>
            <Link to={auth ? "/people" : "/login"}>
              <GrGroup color={auth ? (darkMode ? "white" : "black") : "gray"} />
            </Link>
            <div className="dot"></div>
          </li>
          <li id="nav-links" className={getActiveClass("/post")}>
            <Link to={auth ? "/post" : "/login"}>
              <BiPlus color={auth ? (darkMode ? "white" : "black") : "gray"} />
            </Link>
            <div className="dot"></div>
          </li>
          <li id="nav-links" className={getActiveClass("/feed")}>
            <Link to={auth ? "/feed" : "/login"}>
              <GrGlobe color={auth ? (darkMode ? "white" : "black") : "gray"} />
            </Link>
            <div className="dot"></div>
          </li>
          {auth ? (
            <li
              id="nav-links"
              className={getActiveClass(`/profile/${getCookie("socio-user")}/${uid}`)}
            >
              <Link to={`/profile/${getCookie("socio-user")}/${uid}`}>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex flex-row w-full justify-between items-center w-full text-left py-2 text-sm hover:bg-gray-100"
                >
                  <GrUserSettings color={auth ? (darkMode ? "white" : "black") : "gray"} />
                </button>
              </Link>
              <div className="dot"></div>
            </li>
          ) : (
            <li id="nav-links" className={getActiveClass("/login")}>
              <button onClick={() => navigate("/login")}>
                <GrUserAdmin color={darkMode ? "white" : "black"} />
              </button>
              <div className="dot"></div>
            </li>
          )}
        </ul>
        <div
          className="navlinks w-1/2"
          style={{
            display: window.innerWidth < 766 ? "none" : "flex",
          }}
        >
          <ul
            className="flex row w-full justify-evenly items-center"
            style={{
              display: window.innerWidth < 766 ? "none" : "flex",
            }}
          >
            <li className={getActiveClass("/")}>
              <Link to="/">Home</Link>
            </li>
            <li className={getActiveClass("/post")}>
              <Link to="/post">Post</Link>
            </li>
            <li className={getActiveClass("/feed")}>
              <Link to="/feed">Feed</Link>
            </li>
            <li className={getActiveClass("/people")}>
              <Link to="/people">People</Link>
            </li>
            <button
              onClick={toggleDarkMode}
              className="text-white-900 dark:text-white-500 rounded p-0 flex items-center"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) 
}
            </button>
            <li>
              <div className="relactive" ref={dropdownRef}>
                <button onClick={handleToggle} className="flex items-center">
                  {auth ? (
                    <div className="flex flex-row w-20 justify-evenly items-center ">
                      <img
                        src="/d-prof.jpg"
                        alt="profile"
                        width="30"
                        height="30"
                        className="rounded-full"
                      />
                      {getCookie("socio-user")}
                    </div>
                  ) : (
                    <BiDotsVerticalRounded color={darkMode ? "white" : "black"} />
                  )}
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {auth && (
                      <li>
                        <Link to={`/profile/${getCookie("socio-user")}/${uid}`}>
                          <button
                            onClick={() => setIsOpen(false)}
                            className="flex flex-row w-full justify-between items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Profile <UserSettings02Icon size={17} />
                          </button>
                        </Link>
                      </li>
                    )}
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        auth ? LogOut() : navigate("/login");
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {auth ? (
                        <button className="flex flex-row w-full justify-between items-center w-full text-left text-red-600">
                          Log Out <BiExit size={17} />
                        </button>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default Nav;
