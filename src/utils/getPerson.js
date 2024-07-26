import fetchData from "./fetch_data"
import url from "./url"

const getPerson= async (username)=>{
    const person = await fetchData(url+"/person",{username:username},'POST');
    console.log("FETCHED PERSON DATA: ",person);

    return person;
}

export default getPerson