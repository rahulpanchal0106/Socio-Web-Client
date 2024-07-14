import { Link, Outlet } from "react-router-dom";

const Nav=()=>{
    return(
        <div className="navbar flex row width-full justify-between items-center px-10 py-5">
            <div className="logo text-4xl">
                SOCIO
            </div>
            <div className="navlinks w-1/2">
                <ul className="flex row w-full justify-evenly  ">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/chat">Chat</Link>
                    </li>
                    <li>
                        <Link to="/feed">Feed</Link>
                    </li>
                    <li>
                        <Link to="/people">People</Link>
                    </li>
                    <li>
                        <Link to="/logout">LogOut</Link>
                    </li>
                </ul>
            </div>
            
        </div>

    )
}

export default Nav;