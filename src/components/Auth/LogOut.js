import { useCookies } from "react-cookie"
import checkAuth from "../../utils/checkAuth"
import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogOut=()=>{
    const [cookie, setCookie, removeCookie] = useCookies(['sociotoken']);
    const navigate = useNavigate()    
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%55")
    useEffect(()=>{
        if(checkAuth){
            ()=>removeCookie('sociotoken');
            ()=>removeCookie('socio-user')
        }
    },[])
    console.log("NO TOKEN");
    navigate("/")
    
    return;
}

export default LogOut