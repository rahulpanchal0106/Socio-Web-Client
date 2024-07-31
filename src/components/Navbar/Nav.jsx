import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import checkAuth from "../../utils/checkAuth";
import { BiCross, BiDotsVerticalRounded, BiExit } from "react-icons/bi";
import getCookie from "../../utils/getCookie";
import getPerson from "../../utils/getPerson";
import { Menu01Icon, Profile02Icon, ProfileIcon, UserIcon, UserSettings01Icon, UserSettings02Icon } from "hugeicons-react";
import { FaBurger, FaPerson } from "react-icons/fa6";
import { GrClose, GrMultiple } from "react-icons/gr";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
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

    return (
        <div className="navbar z-30 absolute flex w-screen top-0 justify-between items-center px-10 py-5 drop-shadow-2xl bg-transparent">
            <div className="logo text-4xl">
                SOCIO
            </div>
            <button onClick={()=>setBurger(!openBurger)} className="transition transition-all duration-300 rounded-lg py-1 px-3 hover:bg-red-500 flex justify-center items-center" style={{
                display:window.innerWidth<766?"flex":"none"
            }}>
                <Menu01Icon/>
            </button>
            <ul className="flex flex-col w-full justify-evenly items-center fixed bg-white top-0 left-0 h-screen fixed" style={{
                    display:!openBurger?"none":"flex"
                }}>
                    <button onClick={()=>setBurger(!openBurger)} className="absolute top-10 right-10 transition transition-all duration-300 rounded-lg py-1 px-3 hover:bg-red-500 flex justify-center items-center" style={{
                        display:window.innerWidth<766?"flex":"none"
                    }}>
                        <GrClose/>
                    </button>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/post">Post</Link>
                    </li>
                    <li>
                        <Link to="/feed">Feed</Link>
                    </li>
                    <li>
                        <Link to="/people">People</Link>
                    </li>
                    {
                        auth&&(
                        <li>
                            <Link to={`/profile/${getCookie('socio-user')}/${uid}`}>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className=" flex flex-row w-full justify-between items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Profile <UserSettings02Icon size={17} />
                                </button>
                            </Link>
                        </li>
                        )
                    }
                    <li>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                auth ? LogOut() : navigate('/login');
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            {auth ? 
                                <button
                                className=" flex flex-row w-full justify-between items-center w-full text-left text-red-600"
                            >
                                Log Out <BiExit size={17}  />
                            </button>
                            : "Login"}
                        </button>
                    </li>
                    <li>
                        <div className="relative" ref={dropdownRef}>
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
                                    
                                   
                                </div>
                            )}
                        </div>
                    </li>
            </ul>
            <div className="navlinks w-1/2" style={{
                display:window.innerWidth<766?"none":"flex"
            }}>

                <ul className="flex row w-full justify-evenly items-center" style={{
                    display:window.innerWidth<766?"none":"flex"
                }}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/post">Post</Link>
                    </li>
                    <li>
                        <Link to="/feed">Feed</Link>
                    </li>
                    <li>
                        <Link to="/people">People</Link>
                    </li>
                    <li>
                        <div className="relative" ref={dropdownRef}>
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
                                    {
                                        auth&&(
                                        <li>
                                            <Link to={`/profile/${getCookie('socio-user')}/${uid}`}>
                                                <button
                                                    onClick={() => setIsOpen(false)}
                                                    className=" flex flex-row w-full justify-between items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Profile <UserSettings02Icon size={17} />
                                                </button>
                                            </Link>
                                        </li>
                                        )
                                    }
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            auth ? LogOut() : navigate('/login');
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {auth ? 
                                            <button
                                            className=" flex flex-row w-full justify-between items-center w-full text-left text-red-600"
                                        >
                                            Log Out <BiExit size={17}  />
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
