import { redirect } from "react-router-dom";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";

const AddFollower = async(objid)=>{
    console.log("++++++ ",objid);
    
    const resp=await fetchData(url+"/follower",{"uidTo":objid},'PUT');
    
    console.log("LIKELIKELIKELIKE ",resp);

    
    return resp;
}

export default AddFollower;