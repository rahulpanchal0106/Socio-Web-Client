import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import checkAuth from "../../utils/checkAuth";
import { BiDotsVerticalRounded } from "react-icons/bi";
import getCookie from "../../utils/getCookie";
import getPerson from "../../utils/getPerson";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
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
            <div className="navlinks w-1/2">
                <ul className="flex row w-full justify-evenly items-center">
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
                                    <img src="/d-prof.jpg" alt="profile" width="40" height="40" className="rounded-full" />
                                ) : (
                                    <BiDotsVerticalRounded />
                                )}
                            </button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    <Link to={`/profile/${getCookie('socio-user')}/${uid}`}>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Profile
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            auth ? LogOut() : navigate('/login');
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {auth ? "Logout" : "Login"}
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
