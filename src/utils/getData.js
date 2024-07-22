import fetchData from "./fetch_data";
import getCookie from "./getCookie";
import url from "./url";


const getData = async () => {
    // const token = getCookie('token'); // Assuming your cookie name is 'token'

    // if (!token) {
    //     console.error('Token not found in cookies');
    //     return null;
    // }

    try {
        const userData = await fetchData(url+'/getData',{token:''},'POST') ;

        console.log("🟢🟢🟢🟢🟢🟢 ",userData);

        
        return userData.data;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return "rho";
    }
}

export default getData;
