import { useEffect, useState } from "react";
import fetchData from "../../utils/fetch_data"
import url from "../../utils/url"
import Nav from "../Navbar/Nav";
import getData from "../../utils/getData";
import DelPost from "../Post_actions/DelPost";


const People = ()=>{
    const [data, setData]=useState([]);
    const [userData,setuData] = useState({});
    useEffect( ()=>{
        const getPeople = async()=>{
            const resp = await fetchData(url+"/people",null,'GET')
            setData(resp);
        }
        getPeople();
        const userData=async()=>{
            const user=await getData();
            console.log("🔴💥💥💥💥 ",user)
            setuData(user);
            return user
        }
        userData();
        // console.log("🥵🥵 ",getData())
    },[])

    
    console.log("%^%^^^^^^^^^^^^^^^^^^^^ ",data);
    return(
        <>
        
        <Nav/>
        <div className="flex flex-col justify-center items-center bg-yellow-200 h-screen">
            <h1 className="text-6xl mb-4">People</h1>
            {
                data?data.map((p,i)=>{
                    {console.log("🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡 ",p.username," = ",userData)}
                    return(
                        <div key={i} className="flex flex-row w-52 border border-solid border-black drop-shadow rounded-lg mb-4 px-4 py-2 justify-evenly  ">
                            <div className="img"><img src="/d-prof.jpg" alt="profile" className="rounded-full w-10 h-10" /></div>
                            <div className="info">
                                <div className="username">@<b>{p.username}</b></div>
                                <div className="about">Big time nerd</div>
                            </div>
                            {/* {console.log("😀😀😀😀 ",p._id)} */}

                            
                        </div>
                    )
                }):"no data"
            }
        </div>
        </>
    )
}
export default People