import { useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";
import { useCookies  } from "react-cookie";


const Login=()=>{
    const [uname,setUname] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['sociotoken']);

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
        console.log("OOOOOOOOOOOOOOOO",url)
        const data = await fetchData(url+"/login",{"username":uname,"password":password},'POST');
        console.log("PPPPPPPPPPPPPP ",data)
        const token = data.token;
        setCookie('sociotoken',token);
    }

     
    return(
        
        <form className="container form">
            <input type="text" className="input" onChange={handleInput} placeholder="Username" />
            <input type="password" className="input" onChange={handlePassword} placeholder="password" />
            <button type="submit" className="button" onClick={handleSubmit}>Login</button>
        </form>        
        
    )
}
export default Login;