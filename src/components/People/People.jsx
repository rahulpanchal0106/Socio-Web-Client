import { useEffect, useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";
import Nav from "../Navbar/Nav";
import getData from "../../utils/getData";
import { Link } from "react-router-dom";

const People = () => {
    const [data, setData] = useState([]);
    const [userData, setuData] = useState({});
    
    useEffect(() => {
        const getPeople = async () => {
            const resp = await fetchData(url + "/people", null, 'GET');
            setData(resp);
        };
        getPeople();

        const fetchUserData = async () => {
            const user = await getData();
            // console.log("🔴💥💥💥💥 ", user);
            setuData(user);
            return user;
        };
        fetchUserData();
    }, []);

    console.log("%^%^^^^^^^^^^^^^^^^^^^^ ", data);
    
    return (
        <>
            <Nav />
            <div className="lg:mt-20 flex flex-col justify-center items-center bg-white h-12/11 overflow-scroll">
                <h1 className="text-6xl mb-4 mt-5">People</h1>
                {data ? data.map((p, i) => {
                    console.log("🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡 ", p.username, " = ", userData);
                    return (
                        <div key={i} className="bg-gray-100 flex flex-col w-52 border border-solid border-gray-200 drop-shadow rounded-lg mb-4 px-4 py-2 justify-evenly">
                            <Link to={`/profile/${p.username}/${p.uid}`}>
                                            
                                <div className="flex flex-row w-full justify-evenly itmes-center" >
                                    <div className="img">
                                        <img src="/d-prof.jpg" alt="profile" className="rounded-full w-10 h-10" />
                                    </div>
                                    <div className="info">
                                        <div className="username">
                                            <b>
                                                <Link to={`/profile/${p.username}/${p.uid}`}>
                                                    {p.username}    
                                                </Link>
                                            </b>
                                        </div>
                                        <div className="about text-xs text-color-800 w-20 max-h-40 overflow-hidden break-words" style={{whiteSpace:"pre-wrap"}}>{p.bio?p.bio:"No bio"}</div>
                                    </div>
                                </div>
                                <div className="flex flex-row w-full justify-evenly items-center px-2 py-1">
                                    <p className="flex flex-row justify-evenly items-center w-1/2 text-xs">
                                        Followers <p className="text-lg">{p.followers.length}</p>
                                    </p>
                                    <p className="text-xs" >|</p>
                                    <p className="flex flex-row justify-evenly items-center w-1/2 text-xs">
                                        Following <p className="text-lg" >{p.following.length}</p>
                                    </p>
                                    {/* <button className=" bg-pink-200 px-2 py-1 rounded-lg text-xs border border-solid border-pink-300">
                                        
                                        </button> */}
                                </div>
                            </Link>
                        </div>
                    );
                }) : "no data"}
            </div>
        </>
    );
};

export default People;
