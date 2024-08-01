import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import checkAuth from "../../utils/checkAuth";
import { BiCross, BiDotsVerticalRounded, BiExit, BiHome, BiListOl, BiListUl, BiLogIn, BiPlus } from "react-icons/bi";
import getCookie from "../../utils/getCookie";
import getPerson from "../../utils/getPerson";
import { BreastPumpIcon, Comet01Icon, Comet02Icon, CommentBlock02Icon, Home01Icon, Home02Icon, Home06Icon, LeavingGeoFenceIcon, Login01Icon, Login02Icon, Login03Icon, LoginSquare01Icon, Menu01Icon, Profile02Icon, ProfileIcon, ScrollIcon, UserIcon, UserSettings01Icon, UserSettings02Icon, VideoReplayIcon } from "hugeicons-react";
import { FaBurger, FaPeopleGroup, FaPerson, FaScrollTorah } from "react-icons/fa6";
import { GrAction, GrClose, GrGroup, GrHome, GrLogin, GrMultiple } from "react-icons/gr";
import { FaHome, FaScroll } from "react-icons/fa";
import feather from 'feather-icons';
import "./Nav.css"

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useState(false);
    const [openBurger, setBurger] = useState(false);
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
        <div className="navbar z-30 fixed flex w-screen top-0 justify-between items-center px-10 py-5 drop-shadow-2xl bg-transparent" style={{
            bottom: window.innerWidth < 766 ? "0" : "",
            top: window.innerWidth < 766 ? "auto" : "0"
        }}>
            <div className="logo text-4xl none lg:flex">
                {window.innerWidth < 766 ? "" : "SOCIO"}
            </div>
            <ul className="flex flex-row w-full justify-evenly items-center fixed bg-white bottom-0 left-0 h-full fixed" style={{
                display: window.innerWidth < 766 ? "flex" : "none"
            }}>
                <li id="nav-links" className={getActiveClass("/")}>
                    <Link to="/"><i data-feather="home" ></i></Link>
                    <div className="dot"></div>
                </li>
                <li id="nav-links" className={getActiveClass("/people")}>
                    <Link to="/people"><i data-feather="users" ></i></Link>
                    <div className="dot"></div>
                </li>
                <li id="nav-links" className={getActiveClass("/post")}>
                    <Link to="/post"><i data-feather="plus" ></i></Link>
                    <div className="dot"></div>
                </li>
                <li id="nav-links" className={getActiveClass("/feed")}>
                    <Link to="/feed"><i data-feather="globe" ></i></Link>
                    <div className="dot"></div>
                </li>
                {auth ? (
                    <li id="nav-links" className={getActiveClass(`/profile/${getCookie('socio-user')}/${uid}`)}>
                        <Link to={`/profile/${getCookie('socio-user')}/${uid}`}>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex flex-row w-full justify-between items-center w-full text-left py-2 text-sm text-gray-700"
                            >
                                <UserSettings01Icon color="black" />
                            </button>
                        </Link>
                        <div className="dot"></div>
                    </li>
                ) : (
                    <li id="nav-links" className={getActiveClass("/login")}>
                        <button onClick={() => navigate('/login')} >
                            <i data-feather="log-in" ></i>
                        </button>
                        <div className="dot"></div>
                    </li>
                )}
            </ul>
            <div className="navlinks w-1/2" style={{
                display: window.innerWidth < 766 ? "none" : "flex"
            }}>
                <ul className="flex row w-full justify-evenly items-center" style={{
                    display: window.innerWidth < 766 ? "none" : "flex"
                }}>
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
                    <li>
                        <div className="relactive" ref={dropdownRef}>
                            <button onClick={handleToggle} className="flex items-center">
                                {auth ? (
                                    <div className="flex flex-row w-20 justify-evenly items-center ">
                                        <img src="/d-prof.jpg" alt="profile" width="30" height="30" className="rounded-full" />
                                        {getCookie('socio-user')}
                                    </div>
                                ) : (
                                    <BiDotsVerticalRounded />
                                )}
                            </button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    {auth && (
                                        <li>
                                            <Link to={`/profile/${getCookie('socio-user')}/${uid}`}>
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
                                            auth ? LogOut() : navigate('/login');
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {auth ?
                                            <button
                                                className="flex flex-row w-full justify-between items-center w-full text-left text-red-600"
                                            >
                                                Log Out <BiExit size={17} />
                                            </button>
                                            : "Login"}
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
