import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import checkAuth from "../../utils/checkAuth";
import { BiCross, BiDotsHorizontal, BiDotsHorizontalRounded, BiDotsVerticalRounded, BiExit, BiHome, BiListOl, BiListUl, BiLogIn, BiLogInCircle, BiMenu, BiPlus } from "react-icons/bi";
import getCookie from "../../utils/getCookie";
import getPerson from "../../utils/getPerson";
import { Menu01Icon, Menu06Icon, MenuCircleIcon, MenuSquareIcon, Moon01Icon, Moon02Icon, MoonAngledRainZapIcon, NextIcon, StartUp02Icon, Sun01Icon, Sun02Icon, UserSettings02Icon } from "hugeicons-react";
import { GrGlobe, GrHome, GrGroup, GrUserSettings, GrUserAdmin } from "react-icons/gr";
import feather from 'feather-icons';
import "./Nav.css";
import { FaHourglassStart } from "react-icons/fa";
import { FaCircleNodes, FaHandDots } from "react-icons/fa6";

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
      const newTheme = !darkMode;
      setDarkMode(newTheme);
      localStorage.setItem('theme',newTheme)
    };

    useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme==='true') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setDarkMode(false)
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
        removeCookie('socio-pf')
        window.location.pathname = "/";
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            const person = await getPerson(getCookie('socio-user'));
            setUID(person.uid);
            setCookie('socio-pf',person.profilePicture)

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
        className={`navbar z-30 fixed flex w-screen items-center top-0 justify-between  items-center px-10 py-5 ${darkMode ? 'lg:bg-gray-800 text-white' : 'lg:bg-white text-black'} transition-colors`}
        style={{
          bottom: window.innerWidth < 766 ? "0" : "",
          top: window.innerWidth < 766 ? "auto" : "0",
        }}
      >
        <Link to="/">
          <div className="logo text-4xl none lg:flex">
            {window.innerWidth < 766 ? "" : "SOCI"}
            {window.innerWidth < 766?"":<img src={darkMode?"/socio(5).svg":"/socio(4).svg"} width={40}/>}
          </div>
        </Link>
        <ul
          className={`flex flex-row w-full justify-evenly items-center fixed bottom-0 left-0 h-10 ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}
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
          {/* <li id="nav-links" className={getActiveClass("/post")}>
            <Link to={auth ? "/post" : "/login"}>
              <BiPlus color={auth ? (darkMode ? "white" : "black") : "gray"} />
            </Link>
            <div className="dot"></div>
          </li> */}
          <li id="nav-links" className={getActiveClass("/feed")}>
            <Link to={auth ? "/feed" : "/login"}>
              <GrGlobe color={auth ? (darkMode ? "white" : "black") : "gray"} />
            </Link>
            <div className="dot"></div>
          </li>
          <button
            onClick={toggleDarkMode}
            className="text-white-900  dark:text-white-500 rounded p-0 flex items-center"
          >
            {darkMode ? (
              <Moon02Icon size={20}/>
            ) : (
              <Sun01Icon size={20}/>
            ) }
          </button>
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
                  <img className="aspect-square rounded-full w-6 h-6 border-3 border-white border-solid mr-2 object-cover" src={getCookie('socio-pf') && getCookie('socio-pf')!="undefined"?`https://lh3.googleusercontent.com/d/${getCookie('socio-pf')}`:"/d-prof.jpg"} alt="Profile" />
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
          className="navlinks w-2/3"
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
              <Link to="/"><GrHome size={20}/></Link>
            </li>
            <li className={getActiveClass("/post")}>
              <Link to={auth?"/post":"/login"}><BiPlus size={30}/></Link>
            </li>
            <li className={getActiveClass("/feed")}>
              <Link to={auth?"/feed":"/login"}><GrGlobe size={20} /></Link>
            </li>
            <li className={getActiveClass("/people")}>
              <Link to={auth?"/people":"/login"}><GrGroup size={20}/></Link>
            </li>
            <button
              onClick={toggleDarkMode}
              className="text-white-900  dark:text-white-500 rounded p-0 flex items-center"
            >
              {darkMode ? (
                <Moon02Icon/>
              ) : (
                <Sun01Icon/>
              ) }
            </button>
            <li>
              <div className="relactive" ref={dropdownRef}>
                <button onClick={handleToggle} className="flex items-center">
                  {auth ? (
                    <div className="flex flex-row w-20 justify-evenly items-center ">
                      <img className="rounded-full w-8 h-8 border-3 aspect-square border-white border-solid mr-2 object-cover" src={getCookie('socio-pf') && getCookie('socio-pf')!="undefined"?`https://lh3.googleusercontent.com/d/${getCookie('socio-pf')}`:"/d-prof.jpg"} alt="Profile" />
                      {getCookie("socio-user")}
                    </div>
                  ) : (
                    <BiDotsVerticalRounded size={30} color={darkMode ? "white" : "black"} />
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
