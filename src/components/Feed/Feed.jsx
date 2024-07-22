import React, { useEffect, useReducer, useRef, useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from '../../utils/url';
import DelPost from "../Post_actions/DelPost";
import getUserData from "../../utils/getData";
import { BiComment, BiCommentAdd, BiDotsVertical, BiDotsVerticalRounded, BiDownArrow, BiHeart, BiLeftArrow, BiSolidComment, BiSolidHeart, BiSolidLeftArrow, BiSolidRightArrow, BiTrash } from "react-icons/bi";
import LikePost from "../Post_actions/LikePost";
import Nav from "../Navbar/Nav";
import './feed.css';
import { useNavigate } from "react-router-dom";
import { FaComment, FaComments, FaCommentsDollar, FaCommentSlash, FaCommentSms, FaDeleteLeft, FaRegCommentDots, FaTrashCan } from "react-icons/fa6";
import { FaCommentAlt, FaRegComment, FaRegComments, FaRemoveFormat } from "react-icons/fa";
import TimeAgo from 'react-timeago';
import 'hugeicons-react';
import { CommentAdd01Icon, CommentRemove01Icon, CommentRemove02Icon, LeftAngleIcon, PreviousIcon } from "hugeicons-react";
import Post from "../Post/Post";

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
            <div className="px-10 relative z-10 py-5 bg-white-200 flex flex-col justify-center items-center">
                <Nav />
                <Post/>
                <div className="mt-10 flex flex-col-reverse justify-center items-center">
                    {feedPosts.length > 0 ? feedPosts.map((post, index) => {
                        const isLiked = post.post.likedBy.some(like => like.username === userData.username);

                        const handleAddComment = async (e) => {
                            e.preventDefault();
                            await fetchData(url + '/comment', {
                                comment: comment,
                                id: post._id,
                                post: post
                            }, "PUT");
                            getData();
                            setComment(null)
                        }

                        const openPostLike = openPostLikeStates[post._id] || false;
                        const showPostComments = showComments[post._id] || false;

                        return (
                            <div key={index} className="post bg-gray-100 mb-4 rounded-lg px-4 py-2 drop-shadow-lg" style={{width:"432px"}}>
                                <div className="top-bar author flex flex-row justify-between items-center">
                                    <div className="left flex flex-row items-center justify-evenly w-11">
                                        <img src="/d-prof.jpg" alt="Profile" className="rounded-full w-3 h-3 border-3 border-white border-solid" />
                                        <b>{post.metaData.author}</b>
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
                                <div className="middle-section flex flex-row w-80 break-all px-0 py-4" style={{whiteSpace:'pre-wrap'}}>
                                    {post.post.content}
                                </div>
                                <div className="bottom-bar mb-2 flex flex-row  justify-end">
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

                                <ul className="flex flex-col absolute w-40  right-full bg-white px-4 py-2 rounded-lg drop-shadow-lg  " style={{ display: openPostLike ? "flex" : "none", top:"70px" }}>
                                    <p className="text-xs text-gray-400 py-2 ">Post Liked by</p>
                                    <div className="absolute top-12" style={{ right: "-10px" }}><BiSolidRightArrow color="white" /></div>
                                    <div className="max-h-50 overflow-y-scroll">
                                        {post.post.likedBy && post.post.likedBy.length > 0 ? post.post.likedBy.map((el, i) => (
                                            <li className="rounded-lg mb-2 px-4 py-2 bg-gray-200" key={i}>@{el.username}</li>
                                        )) : <p className="px-1 py-2" >No one :(</p>}
                                    </div>
                                </ul>

                                {showPostComments && <ul className="bg-white flex flex-col-reverse drop-shadow-lg px-2  rounded-xl" style={{paddingTop:"10px", paddingBottom:"10px"}}>
                                    
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

                                        return (
                                            <div className="flex flex-col mb-4 drop-shadow-lg w-96 px-2 py-4 border border-solid border-gray-200 rounded-xl" key={i}>
                                                <div className="w-full flex flex-row justify-between">
                                                    <div className="flex flex-col">
                                                        <b>@{el.commentBy || "aiyen?!"}</b>
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
                                                        <ul style={{ display: openCLike ? "flex" : "none" }} className="flex flex-col w-1/2 absolute left-full bg-white px-4 py-2 rounded-lg drop-shadow-sm">
                                                            <div className="absolute top-1/2" style={{ left: "-10px" }}><BiSolidLeftArrow color="white" /></div>
                                                            <p className="text-xs text-gray-400 py-2 ">Comment Liked by</p>
                                                            <div className="max-h-50 overflow-y-scroll"> 
                                                                {el.likedBy.length>0?el.likedBy.map((like, i) => (
                                                                    <li key={i} className="rounded-lg mb-2 px-4 py-2 bg-gray-200">@{like.username}</li>
                                                                )):<p className="px-1 py-2" >No one :(</p>}
                                                            </div>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="flex w-3/4 py-2 break-all" style={{whiteSpace:"pre-wrap"}} >
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
                                    <p className="text-sm text-gray-300 mb-2">Comments</p>
                                    <div className="relative left-20  " style={{ bottom:"22px" }}><BiSolidLeftArrow style={{rotate:"90deg"}} color="white" /></div>
                                    <form action="" className="flex flex-row justify-between drop-shadow-lg items-center py-3 px-2">
                                        <textarea required rows={1} style={{resize:"none", whiteSpace:'pre-wrap'}} className="input w-10/12 px-4 py-2 rounded-full flex flex-row items-center" type="text" placeholder="Make a Comment" onChange={handleCommentChange} ></textarea>
                                        <button type="submit" className="button px-2 py-2 text-lg bg-transparent hover:bg-gray-200 rounded-full transition-all duration-300" onClick={handleAddComment}>
                                            <CommentAdd01Icon />
                                        </button>
                                    </form>
                                </ul>}
                            </div>
                        );
                    }) : "No data"}
                </div>
            </div>
        </>
    );
};

export default Feed;
