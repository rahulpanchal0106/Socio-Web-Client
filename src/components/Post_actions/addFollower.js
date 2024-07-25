import { redirect } from "react-router-dom";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";

const LikePost = async(objid)=>{
    console.log("++++++ ",objid);
    
    const resp=await fetchData(url+"/follower",{"id":objid},'PUT');
    
    console.log("LIKELIKELIKELIKE ",resp);

    
    return resp;
}

export default LikePost;