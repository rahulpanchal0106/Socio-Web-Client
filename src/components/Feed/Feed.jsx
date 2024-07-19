import { useEffect, useReducer, useRef, useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from '../../utils/url'
import DelPost from "../Post_actions/DelPost";
import getUserData from "../../utils/getData";
import { BiCommentAdd, BiDotsVertical, BiDotsVerticalRounded, BiHeart, BiSolidHeart, BiTrash } from "react-icons/bi";
import LikePost from "../Post_actions/LikePost";
import Nav from "../Navbar/Nav";
import './feed.css'
import { useNavigate } from "react-router-dom";
import { FaDeleteLeft, FaTrashCan } from "react-icons/fa6";
import { FaRemoveFormat } from "react-icons/fa";
import TimeAgo from 'react-timeago'
import 'hugeicons-react'
import { CommentAdd01Icon } from "hugeicons-react";

const Feed = () => {
    const [feedPosts, setFeedPosts] = useState([]);
    const [userData, setUserData] = useState({});
    const [comment,setComment] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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

    const handleCommentChange=(e)=>{
        setComment(e.target.value);
        console.log(e.target.value);
    }

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
            <div  className="px-10 relative z-10 py-5 bg-white-200 flex flex-col justify-center items-center">
                  <Nav />

                  <div className="mt-20 flex flex-col-reverse">
                    
                    {feedPosts.length > 0 ? feedPosts.map((post, index) => {
                        const isLiked = post.post.likedBy.some(like => like.username === userData.username);
                        const handleOpenLikes=(openLikes)=>{
                            openLikes= !openLikes;
                            console.log("******************** ",openLikes)
                            return;
                        }

                        const handleAddComment = async(e)=>{
                            e.preventDefault();
                            await fetchData(url+'/comment',{
                                comment:comment, 
                                id: post._id,
                                post:post
                            },"PUT")
                            getData()
                        }
                    
                        
                        return (
                            <div key={index} className="post bg-gray-100 mb-4 rounded-lg px-4 py-2 w-full drop-shadow-lg">
                                <div className="top-bar author flex flex-row justify-between items-center">
                                    <div className="left flex flex-row items-center justify-evenly w-11">
                                        <img src="/d-prof.jpg" alt="Profile" className="rounded-full w-3 h-3 border-3 border-white border-solid" />
                                        <b>{post.metaData.author}</b>
                                        
                                    </div>
                                    <div className="right flex flex-row ">
                                        

                                    {(
                                        
                                            
                                                post.metaData.author==userData.username?
                                                <button
                                                    onClick={() => handleDel(post._id)}
                                                    className="transition-all duration-300 border border-red-800 border-solid text-red-800 rounded-full px-2 py-2 text-xs text-gray-700 hover:bg-red-900 hover:text-white"
                                                >
                                                    <FaTrashCan/>
                                                </button>
                                                :""
                                            
                                        
                                    )}
                                    
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600">
                                    <TimeAgo date={post.metaData.date}/>
                                </p>
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

                                    
                                    
                                </div>
                                <form action="" className="flex flex-row justify-between items-center" >
                                    <input required className="input w-10/12 px-2 py-2 rounded-full flex flex-row itmes-center " type="text" placeholder="Make a Comment" onChange={(e)=>handleCommentChange(e)} />
                                    <button type="submit" className="button px-2 py-2 text-lg bg-transparent hover:bg-gray-200 rounded-full transition-all duration-300 " onClick={(e)=>handleAddComment(e)} >
                                        <CommentAdd01Icon/>
                                    </button>
                                </form>
                                
                                <ul>
                                {
                                        post.post.likedBy && post.post.likedBy.length>0?post.post.likedBy.map((el,i)=>{
                                            
                                            return <li key={i} >{el.username}</li>
                                        }):"No Likes"
                                    }
                                </ul>
                                <ul className="" style={{
                                    // display: 'flex'
                                    
                                }}>
                                    
                                    <div>
                                        {
                                            post.post.comments  && post.post.comments.length>0?
                                            post.post.comments.map((el,i)=>{
                                                console.log(el)
                                                
                                                const cisLiked = el.likedBy.some(like => like.username === userData.username);
                                                
                                                const handleCLike=async(e)=>{
                                                    e.preventDefault();
                                                    await fetchData(url+"/comment",{post_id:post.upid,comment_id:el.comment_id},"POST")
                                                    getData()
                                                }

                                                const handleCommentDel = async (e)=>{
                                                    e.preventDefault();
                                                    await fetchData(url+'/comment',{post_id:post.upid, comment_id:el.comment_id},"DELETE")
                                                    getData()
                                                }

                                                const openCLikes = (e)=>{
                                                    e.preventDefault();

                                                }

                                                return (
                                                  <div
                                                    className="flex flex-col mb-4 drop-shadow-lg px-2 py-4 border border-solid border-gray-200 rounded-lg "
                                                    key={i}
                                                  >
                                                    <div className="w-full flex flex-row justify-between">
                                                        <div className="flex flex-col">
                                                            <b>
                                                                @
                                                                {el.commentBy ||
                                                                "aiyen?!"}
                                                                
                                                            </b>
                                                            <p className="text-xs text-gray-600">
                                                                <TimeAgo date={el.date}/>
                                                            </p>

                                                        </div>
                                                      <div className="flex flex-row justify-center items-center">
                                                        <div
                                                        className="flex flex-col"
                                                          onClick={(e) =>
                                                            handleCLike(e)
                                                          }
                                                        >
                                                            {cisLiked ? (
                                                                <BiSolidHeart />
                                                            ) : (
                                                                <BiHeart />
                                                            )}
                                                            </div>
                                                            <button
                                                            onClick={(e) =>
                                                                openCLikes(e)
                                                            }
                                                            >
                                                            {el.likedBy.length}
                                                            </button>
                                                            <div className="flex flex-col">
                                                            {el.likedBy.map(
                                                                (like) =>
                                                                like.username
                                                            )}
                                                        </div>
                                                        
                                                      </div>
                                                    </div>
                                                    {/* <div className="w-full flex flex-row justify-between"><b>@{"rho"}</b> <div className="flex flex-row justify-center items-center"><div onClick={(e)=>handleCLike(e)}>{cisLiked?<BiSolidHeart/>:<BiHeart/>}</div>{el.likedBy.length}</div></div> */}
                                                    <div className="flex w-full ">
                                                      {el.comment}
                                                    </div>
                                                    {(el.commentBy ||
                                                      "aiyen?!") ==
                                                    userData.username ? (
                                                      <div
                                                        onClick={(e) =>
                                                          handleCommentDel(e)
                                                        }
                                                      >
                                                        <BiTrash />
                                                      </div>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                );
                                            }):"No comments"
                                        }
                                    </div>
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
