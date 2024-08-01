import { useCookies } from "react-cookie";
import checkAuth from "../../utils/checkAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogOut = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['sociotoken', 'socio-user']);
    const navigate = useNavigate();

    useEffect(() => {
        if (checkAuth()) {
            removeCookie('sociotoken');
            removeCookie('socio-user');
            console.log("NO TOKEN");
            navigate("/");
        }
    }, [removeCookie, navigate]);

    return null;
};

export default LogOut;
