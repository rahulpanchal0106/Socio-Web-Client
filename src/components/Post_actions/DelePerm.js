import { redirect } from "react-router-dom";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";

const DelPerm = async(objid)=>{
    console.log("❌❌❌❌PERMENENTLY ",objid);
    
    const resp=await fetchData(url+"/deletepermenently",{"id":objid},'DELETE');
    redirect('/feed')
    console.log("After deleting permenently ",resp);

    
    // return;
}

export default DelPerm;