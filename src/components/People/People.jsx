import { useEffect, useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";
import Nav from "../Navbar/Nav";
import getData from "../../utils/getData";
import { Link, useNavigate } from "react-router-dom";
import { BrokenBoneIcon, SignalNo01Icon, SignalNo02Icon, Tag01Icon, Unlink02Icon } from "hugeicons-react";
import { BiNoEntry, BiNoSignal } from "react-icons/bi";
import toast, { Toaster } from 'react-hot-toast';
import { FaTag } from "react-icons/fa";
import getPerson from "../../utils/getPerson";
import getCookie from "../../utils/getCookie";
import "./people.css"
import { People_skel } from "../Loader/Profile_Skel";
const People = () => {
    const [data, setData] = useState([]);
    const [userData, setuData] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        const getPeople = async () => {
            toast.loading("Loading people");
            const resp = await fetchData(url + "/people", null, 'GET');
            toast.dismiss()
            setData(resp);

        };
        
        getPeople();

        // const fetchUserData = async () => {
        //     const user = await getData();
        //     console.log("🔴💥💥💥💥 ", user);
        //     setuData(user);
        //     return user;
        // };
        // fetchUserData();

        const fetchUserDoc = async()=>{
            const doc = await getPerson(getCookie('socio-user'));
            setuData(doc);
        }
        fetchUserDoc()
    }, []);

    console.log("%^%^^^^^^^^^^^^^^^^^^^^ ", data);
    data&&data.length>0 && (setTimeout(()=>{
            toast.success("People loaded successfully")
        },10)
    )
    return (
        <div className="flex flex-col justify-center items-center dark:bg-gray-800 dark:text-white">
            <Nav />
            <Toaster/>
        
            <h1 className="text-6xl  lg:mb-0  mt-24 mb-20 ">People</h1>
            <div className="lg:mt-20 mb-20  lg:w-80 w-3/4 flex flex-col-reverse justify-center items-center bg-white dark:bg-gray-800 dark:text-white h-12/11 overflow-scroll">
                {data && data.length>0 ? data.map((p, i) => {
                    // console.log("🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡 ", p, " = ", userData);
                    return (
                      <div
                        key={i}
                        className="bg-gray-100 dark:bg-gray-900 flex lg:w-full flex-col w-full border border-solid border-gray-200 dark:border-gray-800 drop-shadow rounded-lg mb-4 px-4 py-2 justify-centre"
                      >
                        <Link to={`/profile/${p.username}/${p.uid}`} className="flex flex-col justify-center items-center">
                        {p.category_pref[0] && p.category_pref[0] == userData.category_pref[0] ? (
                          <div className="jlu w-fit relative flex flex-row mb-2 text-xs justify-center items-center rounded-lg bg-yellow-200 dark:bg-slate-600 text-gray-500 dark:text-white px-2 py-1 ">
                            <abbr className="w-fit flex flex-row justify-center abbr" title={p.category_pref[0]}>
                              <b className="jlub flex flex-row justify-evenly text-black dark:text-white">
                                
                                {
                                    p.username == userData.username?<>
                                        <i>Its</i> 
                                    </>:<>
                                        <i>Just </i> 
                                        <i>Like </i>
                                    </>
                                }
                                <i className="you">You</i><i>!</i>
                                
                              </b>
                            </abbr>
                          </div>
                        ) : (
                          ""
                        )}
                          <div className="flex flex-row w-full justify-evenly itmes-center">
                            <div className="img">
                            
                              <img className="rounded-full w-20 h-20 object-cover" src={p.profilePicture?`https://lh3.googleusercontent.com/d/${p.profilePicture}`:"/d-prof.jpg"} alt="Profile" />
                            </div>
                            <div className="info">
                              <div className="username">
                                <b>
                                  <Link to={`/profile/${p.username}/${p.uid}`}>
                                    {p.username}
                                  </Link>
                                </b>
                              </div>
                              <div
                                className="about text-xs text-color-800 w-20 max-h-40 overflow-hidden break-words"
                                style={{ whiteSpace: "pre-wrap" }}
                              >
                                {p.bio ? p.bio : "No bio"}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row w-full justify-evenly items-center px-2 py-1">
                            <p className="flex flex-row justify-evenly items-center w-1/2 text-xs">
                              Followers{" "}
                              <p className="text-lg">{p.followers.length}</p>
                            </p>
                            <p className="text-xs">|</p>
                            <p className="flex flex-row justify-evenly items-center w-1/2 text-xs">
                              Following{" "}
                              <p className="text-lg">{p.following.length}</p>
                            </p>
                            {/* <button className=" bg-pink-200 px-2 py-1 rounded-lg text-xs border border-solid border-pink-300">
                                        
                                        </button> */}
                          </div>
                        </Link>
                      </div>
                    );
                }) : <>
                <People_skel/>
                <People_skel/>
                <People_skel/>
                <People_skel/>
                </>
                
                
                // <button onClick={()=>navigate('/login')} className=" rounded-2xl bg-gray-100 text-gray-400 w-72 h-72 flex flex-col justify-center items-center" >

                //     <BrokenBoneIcon size={100} color="lightgray" className="mb-2"/>
                //     Something broke
                //     {       
                //         setTimeout(()=>{
                //             toast.error("Failed to load people")
                //         },10)
                //     }
                // </button>
                }
            </div>
        </div>
    );
};

export default People;
