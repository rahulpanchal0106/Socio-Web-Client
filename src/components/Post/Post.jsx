import { useEffect, useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";
import getData from "../../utils/getData";
import Nav from "../Navbar/Nav";
import { useNavigate } from "react-router-dom";
import getCookie from "../../utils/getCookie";
import generate_UID from "../../utils/uid_generator";
import PostImgUpload from "./PostImage";

const Post = () => {
    const [content, setContent] = useState('');
    const [userData, setUserData] = useState(null);
    const [upid, setUpid] = useState('');
    const [uploadedImgUrl, setUploadedImgUrl] = useState('none'); // State to store the uploaded image URL
    const navigate = useNavigate();

    // Generate unique post ID when the component mounts
    useEffect(() => {
        const newUpid = generate_UID();
        setUpid(newUpid);
    }, []);

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getData();
            setUserData(user);
        };
        fetchUserData();
    }, []);

    const handleContent = (e) => {
        setContent(e.target.value);
    };

    const handleImageUpload = (imageUrl) => {
        // Callback function to handle image upload success
        setUploadedImgUrl(imageUrl);
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
                likes: 0,
            },
            metaData: {
                author: userData.username,
                profilePicture: getCookie('socio-pf'),
                date: new Date().toISOString(),
            },
            upid: upid,
            postImg: uploadedImgUrl,  // Use the uploaded image URL
            comments: [],
        };

        const resp = await fetchData(url + '/post', body, 'POST');
        console.log(resp);
        navigate('/feed'); // Navigate to the feed after submitting the post
    };

    return (
        <>
            <Nav />
            <div className="flex flex-col w-screen lg:w-full h-fit md:mt-20 justify-center items-center">
                <h1 className="mb-2 px-4 py-2 text-4xl mb-4">Make a <i className="text-shadow">POST!</i></h1>
                <form onSubmit={handleSubmit} className="w-1/2 h-1/2 px-10 py-5 flex flex-col justify-between items-center">
                    <textarea
                        required
                        type="text"
                        rows={2}
                        style={{ resize: "none" }}
                        className="h-60 textarea w-48 lg:w-full flex justify-center items-center px-4 py-2 rounded-lg dark:text-black drop-shadow-lg"
                        placeholder="So... What you wanna say?"
                        onChange={handleContent}
                    ></textarea>
                    <PostImgUpload postId={upid} onUploadSuccess={handleImageUpload} /> {/* Pass callback to handle image upload success */}
                    <button
                        className="button px-4 py-2 rounded-lg drop-shadow-lg bg-yellow-200 dark:bg-slate-600 dark:text-white hover:drop-shadow-lg mt-5 hover:bg-yellow-500 dark:hover:bg-slate-500 transition-all duration-300 hover:text-white ml-4"
                        type="submit"
                    >
                        Post
                    </button>
                </form>
            </div>
        </>
    );
};

export default Post;
