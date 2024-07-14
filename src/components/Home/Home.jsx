import { useRef } from "react";
import { useIsVisible } from "../../utils/IsVisible";
import Nav from "../Navbar/Nav";
import { GiNextButton, GiOpeningShell } from "react-icons/gi";
import { FcOpenedFolder, FcRight } from "react-icons/fc";
import { GoTab } from "react-icons/go";
import { RiArrowRightFill, RiGhost2Line } from "react-icons/ri";
import { BiRightArrow, BiRightIndent, BiRightTopArrowCircle } from "react-icons/bi";
import { PiArrowElbowDownRightDuotone } from "react-icons/pi";
import { FaRightLong } from "react-icons/fa6";


const Home=()=>{
    const ref1 = useRef();
    const isVisible1 = useIsVisible(ref1);

    const ref2 = useRef();
    const isVisible2 = useIsVisible(ref2);

    const ref3 = useRef();
    const isVisible3 = useIsVisible(ref3);
    return(
        <div >
            <Nav/>
            <div className="h-screen w-full bg-blue-200 text-black flex flex-col justify-center items-center px-12 py-0 transition-all ease-in duration-700">
                <h1 className="text-shadow text-9xl">Make new Friends!</h1>
                <div ref={ref1} className={`flex flex-row justify-center items-center py-4  w-full transition-all ease-in duration-700 ${isVisible1 ? "opacity-100 h-1/3" : "opacity-0 h-0"}`}>
                    <div className="text-6xl flex flex-col justify-center items-center ">
                        Connect with people that are <b className="flex flex-row justify-between w-1/3 text-black"> <i>Just </i> <i>Like </i>  <i><u>You</u></i></b> 
                    </div>
                    <div className="ml-4 text-6xl">
                        <FaRightLong/>
                    </div>
                </div>
            </div>
            <div className="h-screen w-full bg-yellow-200 text-black flex flex-col justify-center items-center px-12 py-0">
                <h1 className="text-9xl">Make a Post!!</h1>
                <div ref={ref2} className={`flex flex-row justify-center items-center  py-4 w-full border-solid border-2 rounded-lg border-red-500 transition-all ease-in duration-700 ${isVisible2 ? "opacity-100 h-1/2" : "opacity-0 h-0"}`}>
                    jj
                </div>
            </div>
            <div className="h-screen w-full bg-red-200 text-black flex flex-col justify-center items-center px-12 py-0">
                <h1 className="text-9xl">Watch Feed!</h1>
                <div ref={ref3} className={`flex flex-row justify-center items-center  py-4 w-full border-solid border-2 rounded-lg border-red-500 transition-all ease-in duration-700 ${isVisible3? "opacity-100 h-1/2" : "opacity-0 h-0"}`}>
                    jj
                </div>
            </div>
            {/* <div className="text-9xl h-screen w-full bg-yellow-200 text-black flex-col flex justify-center items-center">
            <h1 className="text-9xl">Make a Post!</h1>
                <div ref={ref2} className={`transition-opacity ease-in duration-700 ${isVisible2 ? "opacity-100" : "opacity-0"}`}>
                    hh
                </div>
            </div>
            <div className="text-9xl h-screen w-full bg-blue-200 text-black flex-col flex justify-center items-center">
            <h1 className="text-9xl">Watch Feed!</h1>
                <div ref={ref3} className={`transition-opacity ease-in duration-700 ${isVisible3 ? "opacity-100" : "opacity-0"}`}>
                    hh
                </div>
            </div> */}
        </div>
    )
}

export default Home;