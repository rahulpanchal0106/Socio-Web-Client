import { redirect } from "react-router-dom";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";

const DelPost = async(objid)=>{
    console.log("❌❌❌❌ ",objid);
    
    const resp=await fetchData(url+"/post",{"id":objid},'DELETE');
    redirect('/feed')
    console.log("*(*(*(*(*)))) ",resp);

    
    // return;
}

export default DelPost;