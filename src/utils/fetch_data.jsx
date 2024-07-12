import { useCookies } from "react-cookie";
import getCookie from "./getCookie";

const fetchData = async (url, body, method) => {
    
    console.log("ZZZZZZZZZZZZ: ", url, "\n", body, "\n", method);
    
    const cookie = getCookie('sociotoken');

    !cookie?
      console.log("Token cookie not found")
    :console.log("Token cookie found")

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Rho ${cookie}`
            },
            body: method !== 'GET' ? JSON.stringify(body) : null
        });

        console.log(`Response Status: ${response.status}`);
        
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return ;
        }

        const feedData = await response.json();
        console.log("Response Data: ", feedData);
        
        return feedData;
    } catch (e) {
        console.error(`Error fetching ${url || "url"}: `, e);
        return null;
    }
};

export default fetchData;
