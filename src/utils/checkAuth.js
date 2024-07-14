import getCookie from "./getCookie";

const checkAuth=()=>{
    const token=getCookie('sociotoken');
    console.log('checking auth: ',token);

    if(token && token!=''){
        console.log(token)
        return true;
    }
    return false;
}
export default checkAuth;