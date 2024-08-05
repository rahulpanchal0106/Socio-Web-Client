import { useEffect, useRef, useState } from "react";
import { useIsVisible } from "../../utils/IsVisible";
import './home.css'
import Nav from "../Navbar/Nav";
// import { GiNextButton, GiOpeningShell } from "react-icons/gi";
// import { FcDown, FcOpenedFolder, FcRight } from "react-icons/fc";
// import { GoTab } from "react-icons/go";
// import { RiArrowRightFill, RiGhost2Line } from "react-icons/ri";
// import { BiDownArrow, BiRightArrow, BiRightIndent, BiRightTopArrowCircle } from "react-icons/bi";
// import { PiArrowElbowDownRightDuotone } from "react-icons/pi";
import { FaRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { GrDown } from "react-icons/gr";
import Feed from "../Feed/Feed";
import checkAuth from "../../utils/checkAuth";
import Login from "../Auth/Login";


const Home=()=>{
    const [auth,setAuth]=useState(false);
    const ref1 = useRef();
    const isVisible1 = useIsVisible(ref1);

    const ref2 = useRef();
    const isVisible2 = useIsVisible(ref2);

    const ref3 = useRef();
    const isVisible3 = useIsVisible(ref3);
    
    useEffect(()=>{
        if(checkAuth()==true){
            console.log("IS AUTHENTIC!!!!!!!!")
            setAuth(true);
        }else{
            setAuth(false)
        }
    
    },[])
    return(
        <div id="bg " >
            <div className="h-screen w-full bg-yellow-200 text-black flex flex-col justify-center items-center px-12 py-0 transition-all ease-in duration-700">
            <Nav/>
                <h1 className="lg:mt-12 text-shadow text-6xl lg:text-9xl" id="mnf">Make new Friends!</h1>
                <div  className={`flex flex-row justify-center items-center py-4  w-full transition-all ease-in duration-700 ${isVisible1 ? "opacity-100 h-1/3" : "opacity-0 h-0"}`}>
                    <div ref={ref1} className="text-xl flex flex-col justify-center items-center lg:text-6xl">
                        Connect with people that are <b className="flex flex-row justify-evenly w-1/2 text-black"> <i>Just </i> <i>Like </i>  <i><i className="text-shadow">You</i></i></b> 
                    </div>
                    <div className="ml-4 transition-all ease-in duration-100 text-2xl lg:text-6xl hover:ml-12">
                        <Link to={auth?"/people":"/login"}>
                            <FaRightLong />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="h-screen w-full bg-purple-200 text-black flex flex-col justify-center items-center px-12 py-0">
                <h1 className="text-6xl lg:text-9xl text-shadow">Make a Post!!</h1>
                <div  className={`flex flex-row justify-center items-center  py-4 w-full transition-all ease-in duration-700 ${isVisible2 ? "opacity-100 h-1/2" : "opacity-0 h-0"}`}>
                    <div ref={ref2} className="text-xl lg:text-6xl flex flex-col justify-center items-center ">
                    Talk about your day <b className="flex flex-row justify-evenly w-full text-black"> <i >With </i> <i className="text-shadow">Your </i> <i>People</i></b> 
                        </div>
                        <div className="ml-8 transition-all ease-in duration-200 text-6xl hover:rotate-90">
                            
                            <Link to={auth?"/feed":"/login"}>
                                <FaPlus/>
                            </Link>
                        </div>
                </div>
            </div>
            <div className="h-screen w-full bg-red-200 text-black flex flex-col justify-center items-center px-12 py-0">
                <h1 className="text-6xl lg:text-9xl text-shadow">Watch Feed!</h1>
                <div  className={`flex flex-row justify-center items-center  py-4 w-full transition-all ease-in duration-700 ${isVisible3 ? "opacity-100 h-1/2" : "opacity-0 h-0"}`}>
                        <div ref={ref3} className="text-xl lg:text-6xl flex flex-col justify-center items-center ">
                            Watch what <b className="flex flex-row justify-evenly w-full text-black"> <i className="text-shadow">You </i> <i >Like</i></b> 
                        </div>
                    
                </div>
                <div >
                    {
                        auth?
                        <Link className="ml-8 transition-all ease-in duration-300 text-6xl hover:ml-12" to="/feed">
                            <GrDown style={{rotate:"-90deg"}}/>
                        </Link>
                        :
                        <Link className="ml-8 transition-all ease-in duration-300 text-6xl hover:ml-12" to="/login">
                            <GrDown style={{rotate:"-90deg"}}/>
                        </Link>
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Home;