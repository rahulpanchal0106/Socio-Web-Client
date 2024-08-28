import React, { useEffect, useReducer, useRef, useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from '../../utils/url';
import DelPost from "../Post_actions/DelPost";
import getUserData from "../../utils/getData";
import { BiComment, BiCommentAdd, BiDotsVertical, BiDotsVerticalRounded, BiDownArrow, BiHeart, BiLeftArrow, BiSolidComment, BiSolidHeart, BiSolidLeftArrow, BiSolidRightArrow, BiTrash } from "react-icons/bi";
import LikePost from "../Post_actions/LikePost";
import Nav from "../Navbar/Nav";
import './feed.css';
import { Link, useNavigate } from "react-router-dom";
import { FaComment, FaComments, FaCommentsDollar, FaCommentSlash, FaCommentSms, FaDeleteLeft, FaRegCommentDots, FaTrashCan } from "react-icons/fa6";
import { FaCommentAlt, FaPlus, FaRegComment, FaRegComments, FaRemoveFormat } from "react-icons/fa";
import TimeAgo from 'react-timeago';
import 'hugeicons-react';
import { BrokenBoneIcon, CheckListIcon, CheckmarkCircle04Icon, CommentAdd01Icon, CommentRemove01Icon, CommentRemove02Icon, LeftAngleIcon, PreferenceHorizontalIcon, PreferenceVerticalIcon, PreviousIcon, Select01Icon, Tag01Icon } from "hugeicons-react";
import Post from "../Post/Post";
import { GrClose, GrGooglePlus, GrPlan, GrTag } from "react-icons/gr";
import toast, { Toaster } from 'react-hot-toast';
import getCookie from "../../utils/getCookie";

const Feed = () => {
    const [feedPosts, setFeedPosts] = useState([]);
    const [userData, setUserData] = useState({});
    const [comment, setComment] = useState('');
    const [openCLikeStates, setOpenCLikeStates] = useState({});
    const [openPostLikeStates, setOpenPostLikeStates] = useState({});
    const [showComments, setShowComments] = useState({});

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
        toast.loading("Loading feed")
        const data = await fetchData(url + "/feed", null, 'GET');
        toast.dismiss()
        console.log(data);
        data.length>0?toast.success("Feed loaded successfully"):toast.error("Failed to load feed")
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

    const handleCommentChange = (e) => {
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

    const toggleOpenCLike = (commentId) => {
        setOpenCLikeStates(prevStates => ({
            ...prevStates,
            [commentId]: !prevStates[commentId]
        }));
    };

    const toggleOpenPostLike = (postId) => {
        setOpenPostLikeStates(prevStates => ({
            ...prevStates,
            [postId]: !prevStates[postId]
        }));
    };

    const toggleComments = (postId) => {
        setShowComments((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };
    
    return (
        <>
            <div className="px-10 relative z-10 py-5 bg-white-200 dark:bg-gray-800 flex flex-col justify-center items-center mb-12">
                <Nav />
                <Toaster/>
                {/* <Post/> */}
                <h1 className="text-6xl mb-4 mt-20">Feed</h1>
                <Link to='/post' className="drop-shadow-md bg-yellow-100  dark:bg-slate-600 dark:text-white flex justify-center items-center w-10 h-10 rounded-full border border-black border-solid fixed bottom-16 z-40 right-10 hover:drop-shadow-xl hover:bg-gray-100 hover:rotate-90">
                    <button>
                        <FaPlus/>
                    </button>
                </Link>
                <div className="mt-10 flex flex-col-reverse justify-center items-center">
                    {feedPosts.length > 0 &&  feedPosts[0]!=0 ? feedPosts.map((post, index) => {
                        const isLiked = post.post.likedBy.some(like => like.username === userData.username);

                        const handleAddComment = async (e) => {
                            e.preventDefault();
                            await fetchData(url + '/comment', {
                                comment: comment,
                                id: post._id,
                                post: post,
                                profilePicC: getCookie('socio-pf')
                            }, "PUT");
                            getData();
                            setComment(null)
                        }

                        if(post.postImg){
                            console.log("POSTSSSSSS ",post.postImg, post)
                        }

                        const openPostLike = openPostLikeStates[post._id] || false;
                        const showPostComments = showComments[post._id] || false;

                        return (
                            <div key={index} className="post bg-gray-100 dark:bg-gray-900 mb-4 rounded-lg px-4 py-2 drop-shadow-lg " style={{width:window.innerWidth<766?"343px":"432px"}}>
                                <div className="top-bar author flex flex-row justify-between items-center">
                                    <div className="left flex flex-row items-center justify-evenly w-full">
                                        <Link to={`/profile/${post.metaData.author}/👋`} className="left flex flex-row items-center justify-start w-full">
                                            <img className="rounded-full w-8 h-8 border-3 border-white border-solid mr-2 object-cover" src={post.metaData.profilePicture?`https://lh3.googleusercontent.com/d/${post.metaData.profilePicture}`:"/d-prof.jpg"} alt="Profile" />
                                            <b>{post.metaData.author}</b>
                                        </Link>
                                    </div>
                                    <div className="right flex flex-row">
                                        {post.metaData.author === userData.username ? (
                                            <button
                                                onClick={() => handleDel(post._id)}
                                                className="transition-all duration-300 border border-red-800 border-solid text-red-800 rounded-full px-2 py-2 text-xs text-gray-700 hover:bg-red-900 hover:text-white"
                                            >
                                                <FaTrashCan />
                                            </button>
                                        ) : ""}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600">
                                    <TimeAgo date={post.metaData.date} />
                                </p>
                                <div className="middle-section flex flex-col w-full break-words px-0 py-4" style={{whiteSpace:'pre-wrap',overflowWrap:' anywhere'}}>
                                    <div>
                                        {post.post.content}
                                    </div>
                                    {   post.postImg!=='none'
                                        ?<img className="rounded-2xl w-full h-full object-cover" src={post.postImg!=='none'?`https://lh3.googleusercontent.com/d/${post.postImg}`:"/d-prof.jpg"} alt="Profile" />
                                        :""
                                    }
                                        
                                </div>
                                <div className="bottom-bar mb-2 flex flex-row  justify-between">
                                    {
                                        post.category&&<div className="flex flex-row text-xs justify-evenly items-center rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-500 px-2 py-0 ">
                                            <GrTag/> <b>{post.category}</b> 
                                        </div>
                                    }
                                    <div className="flex flex-row justify-evenly items-center">
                                        <div className="flex py-2 flex-row items-center justify-center">
                                            <button
                                                onClick={() => handleLike(post._id)}
                                                className="likes flex flex-row items-center justify-center"
                                            >
                                                {isLiked ? <BiSolidHeart color="red" /> : <BiHeart />}
                                            </button>
                                            <button className="px-2" onClick={() => toggleOpenPostLike(post._id)}>
                                                <b>{post.post.likes}</b>
                                            </button>
                                        </div>
                                        <button className="flex flex-row items-center justify-center transition-all duration-300" onClick={() => toggleComments(post._id)}>
                                            <button className="" >
                                                {showPostComments ? <FaCommentSlash size={14}/> : <FaRegComment size={14}/>} 
                                            </button>
                                            <p className="px-2">
                                                {post.post.comments.length}
                                            </p>
                                        </button>
                                    </div>
                                    
                                </div>

                                <ul className="flex flex-col absolute w-40  right-full bg-white dark:bg:gray-800 px-4 py-2 rounded-lg drop-shadow-lg  " style={{ 
                                        display: openPostLike ? "flex" : "none",
                                        top:"70px",  
                                        right: window.innerWidth<766?"30%":"100%",
                                        zIndex:10
                                    }}>
                                    <p className="text-xs text-gray-400 py-2 ">Post Liked by</p>
                                    <button onClick={()=>toggleOpenPostLike(post._id)} className="absolute right-2" ><GrClose/></button>
                                    <div className="absolute top-12" style={{ right: "-10px" }}><BiSolidRightArrow color="white" /></div>
                                    <div className="max-h-50 overflow-y-scroll">
                                        {post.post.likedBy && post.post.likedBy.length > 0 ? post.post.likedBy.map((el, i) => (
                                            <li className="rounded-lg mb-2 px-4 py-2 bg-gray-200 dark:bg-gray-800" key={i}>
                                                <Link to={`/profile/${el.username}/${el.uid}`}>
                                                    @ {el.username}    
                                                </Link>
                                            </li>
                                        )) : <p className="px-1 py-2" >No one :(</p>}
                                    </div>
                                </ul>

                                {showPostComments && <ul className=" flex flex-col-reverse  px-2  rounded-xl " style={{
                                        paddingTop:"10px", 
                                        paddingBottom:"10px",
                                    }}>
                                    
                                    {post.post.comments && post.post.comments.length > 0 ? post.post.comments.map((el, i) => {
                                        const openCLike = openCLikeStates[el.comment_id] || false;
                                        console.log(el);
                                        const cisLiked = el.likedBy.some(like => like.username === userData.username);
                                        
                                        const handleCLike = async (e) => {
                                            e.preventDefault();
                                            await fetchData(url + "/comment", { post_id: post.upid, comment_id: el.comment_id }, "POST");
                                            getData();
                                        }

                                        const handleCommentDel = async (e) => {
                                            e.preventDefault();
                                            await fetchData(url + '/comment', { post_id: post.upid, comment_id: el.comment_id }, "DELETE");
                                            getData();
                                        }

                                        console.log("{}}{}{}{{}{}{}{}{}{}{}{} ",el)

                                        return (
                                            <div className="flex flex-col mb-4 drop-shadow-lg bg-white dark:bg-gray-800 w-30 lg:96 px-4 py-4 border border-solid border-gray-200 rounded-xl" key={i}>
                                                <div className="w-full flex flex-row justify-between ">
                                                    <div className="flex flex-col">
                                                        <Link to={`/profile/${el.commentBy}/👋`} className="left flex flex-row items-center justify-start w-full">
                                                            
                                                            <img className="rounded-full w-8 h-8 border-3 border-white border-solid mr-2 object-cover" src={el.profilePicC?`https://lh3.googleusercontent.com/d/${el.profilePicC}`:"/d-prof.jpg"} alt="Profile" />
                                                            <b>{el.commentBy || "aiyen?!"}</b>
                                                        </Link>
                                                        <p className="text-xs text-gray-600">
                                                            <TimeAgo date={el.date} />
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col justify-center items-center">
                                                        <div className="flex flex-row justify-center items-center">
                                                            <button className="flex flex-row" onClick={handleCLike}>
                                                                {cisLiked ? <BiSolidHeart color="red" /> : <BiHeart />}
                                                            </button>
                                                            <button onClick={() => toggleOpenCLike(el.comment_id)} className="px-2">
                                                                <b>{el.likedBy.length}</b>
                                                            </button>
                                                            
                                                        </div>
                                                        <ul style={{ display: openCLike ? "flex" : "none",left: window.innerWidth<766?"30%":"100%" }} className="flex flex-col w-1/2 absolute left-full bg-white dark:bg-gray-800 px-4 py-2 rounded-lg drop-shadow-lg">
                                                            <div className="absolute top-1/2" style={{ left: "-10px" }}><BiSolidLeftArrow color="white" /></div>
                                                            <p className="text-xs text-gray-400 py-2 ">Comment Liked by</p>
                                                            <button onClick={()=>toggleOpenCLike(el.comment_id)} className="absolute right-2" ><GrClose/></button>
                                                            <div className="max-h-50 overflow-y-scroll"> 
                                                                {el.likedBy.length>0?el.likedBy.map((like, i) => (
                                                                    <li key={i} className="rounded-lg mb-2 px-4 py-2 bg-gray-200 dark:bg-gray-800">
                                                                        <Link to={`/profile/${like.username}/${like.uid}`}>
                                                                            @ {like.username}    
                                                                        </Link>
                                                                    </li>
                                                                )):<p className="px-1 py-2" >No one :(</p>}
                                                            </div>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="flex w-3/4 px-2 py-3 break-words" style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere"}} >
                                                    {el.comment}
                                                </div>
                                                {(el.commentBy || "aiyen?!") === userData.username ? (
                                                    <button
                                                        onClick={handleCommentDel}
                                                        className="text-red-700 border w-fit p-1 border-transparent transition-all duration-300 hover:border-red-700 rounded-full border-solid"
                                                    >
                                                        <CommentRemove01Icon size={15} />
                                                    </button>
                                                ) : ""}
                                            </div>
                                        );
                                    }) : <p className="px-1 py-2" >No comments </p>}
                                    <p className="text-sm text-gray-500 mb-2"> {post.post.comments.length} {post.post.comments.length>1?"Comments":"Comment"}</p>
                                    {/* <div className="relative left-20  " style={{ bottom:"22px" }}><BiSolidLeftArrow style={{rotate:"90deg"}} color="white" /></div> */}
                                    <form action="" className="flex flex-row justify-between drop-shadow-lg items-center py-3 px-2">
                                        <textarea required rows={1} style={{resize:"none", whiteSpace:'pre-wrap'}} className="input w-10/12 px-4 py-2 rounded-full flex flex-row items-center dark:text-black" type="text" placeholder="Make a Comment" onChange={handleCommentChange} ></textarea>
                                        <button type="submit" className="button px-2 py-2 text-lg bg-transparent hover:bg-gray-200 rounded-full transition-all duration-300" onClick={handleAddComment}>
                                            <CommentAdd01Icon />
                                        </button>
                                    </form>
                                </ul>}
                            </div>
                        );
                    }) :
                    
                    feedPosts[0]==0?
                    <div onClick={()=>navigate('/login')} className=" rounded-2xl bg-gray-100 dark:bg-gray-900 text-gray-400 w-72 h-72 flex flex-col justify-center items-center" >

                        <PreferenceHorizontalIcon size={100} color="lightgray" className="mb-2"/>
                        Set your preferences
                        {                                   
                            toast.loading("Need to select your preferences")
                        }
                    </div>   
                    :<button onClick={()=>navigate('/login')} className=" rounded-2xl bg-gray-100 dark:bg-gray-900 text-gray-400 w-72 h-72 flex flex-col justify-center items-center" >

                        <BrokenBoneIcon size={100} color="lightgray" className="mb-2"/>
                        Something broke
                        {       
                            
                            toast.error("Failed to load feed")
                            
                        }
                    </button>
                    }
                </div>
            </div>
        </>
    );
};

export default Feed;
