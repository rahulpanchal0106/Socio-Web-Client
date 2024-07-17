import { useEffect, useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from '../../utils/url'
import DelPost from "../Post_actions/DelPost";
import getUserData from "../../utils/getData";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import LikePost from "../Post_actions/LikePost";
import Nav from "../Navbar/Nav";
import UnLike from "../Post_actions/UnLike";

const Feed = () => {
    const [feedPosts, setFeedPosts] = useState([]);
    const [userData, setUserData] = useState({});

    const getData = async () => {
        const data = await fetchData(url + "/feed", null, 'GET');
        console.log(data);
        setFeedPosts(data);
    };

    useEffect(() => {
        getData();
        const fetchUserData = async () => {
            const user = await getUserData();
            console.log("🔴💥💥💥💥 ", user);
            setUserData(user);
            return user;
        };
        fetchUserData();
    }, []);

    const handleDel = async (postId) => {
        await DelPost(postId);
        getData(); // Refresh the feed data
    };

    const handleLike = async (postId) => {
        const resp = await LikePost(postId);
        console.log("🐸🐸🐸 ", resp);
        getData(); // Refresh the feed data
    };

    // const handleUnLike = async (postId) => {
    //     const resp = await UnLike(postId);
    //     console.log("🐸🐸🐸 ", resp);
    //     getData(); // Refresh the feed data
    // };

    return (
        <>
            <Nav />
            <div className="px-10 py-5">
                {feedPosts.length > 0 ? feedPosts.map((post, index) => {
                    const isLiked = post.post.likedBy.some(like => like.username === userData.username); // Check if the user has liked the post
                    return (
                        <div key={index} className="post bg-gray-200 mb-4 rounded-lg px-4 py-2 w-full drop-shadow-lg">
                            <div className="top-bar author flex flex-row justify-between items-center">
                                <div className="left flex flex-row items-center justify-evenly w-11">
                                    <img src="/d-prof.jpg" alt="Profile" className="rounded-full w-3 h-3 border-3 border-white border-solid" />
                                    <b>{post.metaData.author}</b>
                                </div>
                                <div className="right">
                                    {post.metaData.author === userData.username &&
                                        <button onClick={() => handleDel(post._id)}>🗑️</button>
                                    }
                                </div>
                            </div>
                            <div className="middle-section flex flex-row px-0 py-4">
                                {post.post.content}
                            </div>
                            <div className="bottom-bar flex flex-row justify-between">
                                <button
                                    onClick={() => handleLike(post._id)}
                                    className="likes flex flex-row items-center justify-center"
                                >
                                    {isLiked ? <BiSolidHeart /> : <BiHeart />}{post.post.likes}
                                </button>
                            </div>
                        </div>
                    );
                }) : "No data"}
            </div>
        </>
    );
};

export default Feed;
