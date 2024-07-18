import { useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";
import { useCookies  } from "react-cookie";
import { Link, Navigate, redirect, resolvePath, useNavigate } from "react-router-dom";


const Login=()=>{
    const [uname,setUname] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['sociotoken']);
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const handleInput=(e)=>{
        console.log(e.target.value);
        setUname(e.target.value);
    }

    const handlePassword = (e)=>{
        console.log(e.target.value);
        setPassword(e.target.value);
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        // console.log("OOOOOOOOOOOOOOOO",url)
        setIsLoading(true)
        const data = await fetchData(url+"/login",{"username":uname,"password":password},'POST').catch((e)=>{
            alert("Error Logging in, ",e)
            setIsLoading(false)
        });
        // console.log("PPPPPPPPPPPPPP ",data)
        const token = data?data.token:null;
        setCookie('sociotoken',token);
        if(token){
            // console.log("**********************************")
            // window.location.reload()
        }
        setIsLoading(false)
        navigate('/')
    }

     
    return(
        <div className="bg-yellow-200 flex flex-col w-full h-screen justify-center items-center">
            <form className="w-1/2 h-1/2 px-10 py-5 flex flex-col justify-center items-center">
            <h1 className="mb-2 px-4 py-2 text-4xl">Log in to <i className="text-shadow">Socio</i></h1>
                <input type="text" className="input mb-2 px-4 py-2 rounded-lg" onChange={handleInput} placeholder="Username" />
                <input type="password" className="input mb-2  px-4 py-2 rounded-lg" onChange={handlePassword} placeholder="password" />
                <button type="submit" className="bg-pink-200 px-4 py-2 rounded-lg hover:bg-pink-400 transition-all duration-300" onClick={handleSubmit}>Login</button> {isLoading?"Loading...":""}
            </form>  

            <div className="flex flex-row">
                Are you new to this? Consider to <Link className="ml-2 text-shadow" to="/signup">Sign Up</Link>!

            </div>
        </div>
        
    )
}
export default Login;