import { useEffect, useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";
import getData from "../../utils/getData";
import Nav from "../Navbar/Nav";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const Post = () => {
    const [content, setContent] = useState('');
    const [userData, setUserData] = useState(null);
    const navigator = useNavigate();
    const fetchUserData = async () => {
        const user = await getData();
        setUserData(user);

    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleContent = (e) => {
        setContent(e.target.value);
        console.log(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData) {
            console.error("User data is not loaded yet");
            return;
        }
        
        const body = {
            post: {
                content: content,
                likes: 0
            },
            metaData: {
                author: userData.username,
                date: new Date().toISOString()
            },
            comments:[]
        };
        
        const resp = await fetchData(url + '/post', body, 'POST');
        console.log(resp);
        navigator('/feed')
    };

    return (
        <>
        <Nav/>
        <div className="bg-yellow-200 flex flex-col w-full h-screen justify-center items-center">
            <form onSubmit={handleSubmit} className="w-1/2 h-1/2 px-10 py-5 flex flex-col justify-center items-center">
                <h1 className="mb-2 px-4 py-2 text-4xl mb-4">Make a <i className="text-shadow">POST!</i></h1>
                <textarea required type="text" className="textarea px-4 py-2 rounded-lg drop-shadow-lg" placeholder="So... What you wanna say?" onChange={handleContent} ></textarea>
                <button className="button px-4 py-2 rounded-lg drop-shadow-lg bg-red-200 hover:bg-red-500 transition-all duration-300 hover:text-white mt-4 " type="submit">Post</button>
            </form>
        </div>
        </>
    );
};

export default Post;
