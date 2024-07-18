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
        <div id="bg" >
            <div className="h-screen w-full bg-yellow-200 text-black flex flex-col justify-center items-center px-12 py-0 transition-all ease-in duration-700">
            <Nav/>
                <h1 className="text-shadow text-9xl">Make new Friends!</h1>
                <div  className={`flex flex-row justify-center items-center py-4  w-full transition-all ease-in duration-700 ${isVisible1 ? "opacity-100 h-1/3" : "opacity-0 h-0"}`}>
                    <div ref={ref1} className="text-6xl flex flex-col justify-center items-center ">
                        Connect with people that are <b className="flex flex-row justify-evenly w-1/2 text-black"> <i>Just </i> <i>Like </i>  <i><i className="text-shadow">You</i></i></b> 
                    </div>
                    <div className="ml-4 transition-all ease-in duration-100 text-6xl hover:ml-12">
                        <Link to="/people">
                            <FaRightLong/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="h-screen w-full bg-purple-200 text-black flex flex-col justify-center items-center px-12 py-0">
                <h1 className="text-9xl text-shadow">Make a Post!!</h1>
                <div  className={`flex flex-row justify-center items-center  py-4 w-full transition-all ease-in duration-700 ${isVisible2 ? "opacity-100 h-1/2" : "opacity-0 h-0"}`}>
                    <div ref={ref2} className="text-6xl flex flex-col justify-center items-center ">
                    Talk about your day <b className="flex flex-row justify-evenly w-full text-black"> <i >With </i> <i className="text-shadow">Your </i> <i>People</i></b> 
                        </div>
                        <div className="ml-8 transition-all ease-in duration-200 text-6xl hover:rotate-90">
                            <Link to="/post">
                                <FaPlus/>
                            </Link>
                        </div>
                </div>
            </div>
            <div className="h-screen w-full bg-red-200 text-black flex flex-col justify-center items-center px-12 py-0">
                <h1 className="text-9xl text-shadow">Watch Feed!</h1>
                <div  className={`flex flex-row justify-center items-center  py-4 w-full transition-all ease-in duration-700 ${isVisible3 ? "opacity-100 h-1/2" : "opacity-0 h-0"}`}>
                        <div ref={ref3} className="text-6xl flex flex-col justify-center items-center ">
                            Let's See What's going on with <b className="flex flex-row justify-evenly w-full text-black"> <i className="text-shadow">Your </i> <i >Friends</i> <i>&</i> <i>The World</i></b> 
                        </div>
                    
                </div>
                <div >
                    {
                        auth?
                        <Link className="ml-8 transition-all ease-in duration-300 text-6xl hover:mt-12" to="/feed">
                            <GrDown/>
                        </Link>
                        :
                        <Link className="ml-8 transition-all ease-in duration-300 text-6xl hover:mt-12" to="/login">
                            <GrDown />
                        </Link>
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Home;