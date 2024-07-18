import { useEffect, useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from '../../utils/url'
import DelPost from "../Post_actions/DelPost";
import getUserData from "../../utils/getData";
import { BiDotsVertical, BiHeart, BiSolidHeart } from "react-icons/bi";
import LikePost from "../Post_actions/LikePost";
import Nav from "../Navbar/Nav";
import './feed.css'

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
        getData(); 
    };

    const handleLike = async (postId) => {
        const resp = await LikePost(postId);
        console.log("🐸🐸🐸 ", resp);
        getData();
    };

    var openLikes=false;
    return (
        <>
            <div  className="px-10 relative z-10 py-5 bg-pink-200 flex flex-col justify-center items-center">
                  <Nav />
                  <div className="mt-20">
                    
                    {feedPosts.length > 0 ? feedPosts.map((post, index) => {
                        const isLiked = post.post.likedBy.some(like => like.username === userData.username);
                        const handleOpenLikes=(openLikes)=>{
                            openLikes= !openLikes;
                            console.log("******************** ",openLikes)
                            return;
                        }
                        return (
                            <div key={index} className="post bg-pink-100 mb-4 rounded-lg px-4 py-2 w-full drop-shadow-lg">
                                <div className="top-bar author flex flex-row justify-between items-center">
                                    <div className="left flex flex-row items-center justify-evenly w-11">
                                        <img src="/d-prof.jpg" alt="Profile" className="rounded-full w-3 h-3 border-3 border-white border-solid" />
                                        <b>{post.metaData.author}</b>
                                    </div>
                                    <div className="right flex flex-row">
                                        
                                        <select name="" id="" className="bg-transparent">
                                            <option value=""><BiDotsVertical/></option>
                                            {/* {
                                                post.metaData.author === userData.username &&
                                                <option><button className="text-red-200" onClick={() => handleDel(post._id)}>
                                                    Delete
                                                </button></option> 
                                            } */}
                                            <option value="" onClick={() => handleDel(post._id)}>Delete</option>
                                            <option value="">Report</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="middle-section flex flex-row px-0 py-4">
                                    {post.post.content}
                                </div>
                                <div className="bottom-bar flex flex-row justify-between ">
                                    <div className="flex flex-row items-center justify-center">
                                        <button
                                            onClick={() => handleLike(post._id)}
                                            className="likes flex flex-row items-center justify-center"
                                        >
                                            {isLiked ? <BiSolidHeart /> : <BiHeart />}
                                        </button>
                                        <button className="px-2" onClick={handleOpenLikes(openLikes)}>
                                            {post.post.likes}
                                        </button>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600">
                                            {
                                                post.metaData.date
                                            }
                                        </p>
                                    
                                </div>
                                <ul className="bg-gray-200" style={{
                                    // display: 'flex'
                                    display: openLikes?"flex":'none'
                                }}>
                                    {
                                        post.post.likedBy && post.post.likedBy.length>0?post.post.likedBy.map((el,i)=>{
                                            
                                            return <li key={i} >{el.username}</li>
                                        }):"No Likes"
                                    }
                                </ul>
                            </div>
                        );
                    }) : "No data"}
                  </div>
            </div>
        </>
    );
};

export default Feed;
