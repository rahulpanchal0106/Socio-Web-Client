import checkAuth from "./checkAuth";

const getCookie = (cname)=>{
    let name = cname + "=";
    let ca = document.cookie.split(';');
    if(checkAuth){
        //delete cookie
        document.cookie = null
    }
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        const final_token=c.substring(name.length, c.length);
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ",final_token)
        return final_token;
        }
    }
    return null;
}

export default getCookie