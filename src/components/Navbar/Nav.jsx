import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import checkAuth from "../../utils/checkAuth";

const Nav = () => {
    const [auth, setAuth] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['sociotoken']);

    const LogOut = () => {
        removeCookie('sociotoken'); // Remove the cookie upon logout
        window.location.pathname = "/"; // Redirect to the homepage after logout
    };

    useEffect(() => {
        // Check authentication status on component mount
        if (checkAuth()) {
            setAuth(true); // User is authenticated
        } else {
            setAuth(false); // User is not authenticated
        }
    }, []);

    return (
        <div className="navbar flex row width-full justify-between items-center px-10 py-5 drop-shadow-2xl bg-yellow-50">
            <div className="logo text-4xl">
                SOCIO
            </div>
            <div className="navlinks w-1/2">
                <ul className="flex row w-full justify-evenly items-center">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {/* <li>
                        <Link to="/chat">Chat</Link>
                    </li> */}
                    <li>
                        <Link to="/feed">Feed</Link>
                    </li>
                    <li>
                        <Link to="/people">People</Link>
                    </li>
                    <li>
                        {auth ? (
                            <button className="border border-solid border-red-500 text-red-500 rounded-lg px-4 py-2 hover:bg-red-600 transition-all transition-300 hover:text-white" onClick={LogOut}>Log Out</button>
                        ) : (
                            <Link className="border border-solid border-green-500 text-green-500 rounded-lg px-4 py-2 hover:bg-green-600 transition-all transition-300 hover:text-white" to="/login">Login</Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Nav;
