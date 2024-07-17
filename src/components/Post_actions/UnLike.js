import { redirect } from "react-router-dom";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";

const UnLike = async(objid)=>{
    console.log("💗💗💗💗 ",objid);
    
    const resp=await fetchData(url+"/like",{"id":objid},'DELETE');
    
    console.log("UNLIKEUNLIKEUNLIKE ",resp);

    
    return resp;
}

export default UnLike;