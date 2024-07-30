import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";
import getCookie from "../../utils/getCookie";
import DelPost from "../Post_actions/DelPost";
import LikePost from "../Post_actions/LikePost";

import { BiComment, BiCommentAdd, BiDotsVertical, BiDotsVerticalRounded, BiDownArrow, BiHeart, BiLeftArrow, BiPlus, BiShare, BiShield, BiShieldX, BiSolidComment, BiSolidHeart, BiSolidLeftArrow, BiSolidRightArrow, BiTrash, BiTrashAlt, BiWind } from "react-icons/bi";
import Nav from "../Navbar/Nav";
import { useNavigate } from "react-router-dom";
import { FaComment, FaComments, FaCommentsDollar, FaCommentSlash, FaCommentSms, FaDeleteLeft, FaLinkSlash, FaRegCommentDots, FaRegTrashCan, FaShieldCat, FaSlash, FaTextSlash, FaTrashArrowUp, FaTrashCan } from "react-icons/fa6";
import { FaCommentAlt, FaLeaf, FaRegComment, FaRegComments, FaRemoveFormat, FaStoreSlash, FaTintSlash, FaToiletPaperSlash, FaUserShield } from "react-icons/fa";
import TimeAgo from 'react-timeago';
import 'hugeicons-react';
import { CancelCircleIcon, CloudSlowWindIcon, CommentAdd01Icon, CommentRemove01Icon, CommentRemove02Icon, LeftAngleIcon, LeftToRightListDashIcon, MessageCancel02Icon, PreviousIcon, Share08Icon } from "hugeicons-react";
import getUserData from "../../utils/getData";
import DelPerm from "../Post_actions/DelePerm";
import AddFollower from "../Post_actions/addFollower.js"

const ProfilePage = () => {
    const { username,uidTo } = useParams(); 
    const [updateMode, setUpdateMode] = useState(false);
    const [formData, setFormData] = useState({ bio: "" });
    const [uname, setUname] = useState('');
    const [bio, setBio] = useState('');
    const [myPosts, setMyPosts] = useState([]);
    const [myTrash, setMyTrash] = useState([]);
    const [openMyPosts, setOpenMyPosts] = useState(true)
    const [feedPosts, setFeedPosts] = useState([]);
    const [userData, setUserData] = useState({});
    const [comment, setComment] = useState('');
    const [openCLikeStates, setOpenCLikeStates] = useState({});
    const [openPostLikeStates, setOpenPostLikeStates] = useState({});
    const [showComments, setShowComments] = useState({});
    const [followers, setFollowers] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [profile_data, setProfileData] = useState({})
    const [isFollowing, setisFollowing] = useState(false);
    const [openFollowers,setOpenFollowers] = useState(false);
    const [openFollowing,setOpenFollowing] = useState(false);
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
        getMyData()
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
        getMyData();
    };
    const handleDelPermenently = async (postId) => {
        console.log("♨️♨️♨️♨️ Deleting post permenently")
        await DelPerm(postId);
        getMyData();
    };

    const handleLike = async (postId) => {
        const resp = await LikePost(postId);
        console.log("🐸🐸🐸 ", resp);
        getMyData();
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

    const getMyData = async () => {
        const resp = await fetchData(url + '/person', { username: username }, 'POST');
        console.log("🟡🟡🟡🟡🟡🟡 RESP ", resp, username);
        setProfileData(resp)
        // res&&(res.followers.length>0)&&(res.followers)?()=>setFollowers(res.followers.length):console.log("NO FOLLOWER PRM")
        const resp1 = await fetchData(url+'/myPosts',{username:username}, 'POST');
        setMyPosts(resp1);
        var resp2=[];
        username==getCookie('socio-user')?
        resp2 = await fetchData(url+'/myTrash',null, 'GET')
        :null

        resp.followers && resp.followers.find((user)=>{
            user.username==username;
            setisFollowing(true);
        })
        
        setMyTrash(resp2);
        setMyPosts(resp1);
        setUname(resp.username ? resp.username : "nouname");
        setBio(resp.bio ? resp.bio : "no bio :(");
    };

    useEffect(() => {
        getMyData();
    }, [username]); 

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const fields = Object.fromEntries(formData.entries());
        fields.username = username; 
        const resp = await fetchData(url + '/profile', fields, 'PUT');
        console.log(resp);
        setUpdateMode(!updateMode)
        getMyData()
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }

    const toggleView=()=>{
        
    }

    return (
        <>
            <Nav/>
            <br />
            <br />
            <br />
            
            {updateMode ?
            <form className="flex flex-col justify-between items-center px-4 py-4" onSubmit={handleProfileUpdate}>
                <div className="flex flex-row px-5 py-4 justify-evenly   rounded-lg w-2/3">
                    <img src="/d-prof.jpg" className="rounded-full" width={200} height={200} alt="Profile" />
                    <div className="flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text-5xl" 
                            className="bg-gray-100 px-3 py-1 rounded-lg"
                            placeholder="Username" 
                            id="username" 
                            name="username" 
                            disabled 
                            value={uname} 
                            onChange={handleChange}
                        />
                        <label htmlFor="bio">Bio</label>
                        <textarea 
                            className="bg-gray-100 px-3 py-1 rounded-lg resize-none"
                            name="bio" 
                            id="bio" 
                            
                            placeholder="Enter your Bio"
                            value={formData.bio} 
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    {username === getCookie('socio-user') && (
                        <button className="" onClick={() => setUpdateMode(!updateMode)}> Cancel</button>
                    )}
                </div>
                <button className="bg-pink-200 rounded-lg px-3 py-1" type="submit">Submit</button>
            </form>
            :
            <div className="flex flex-col justify-between items-center px-4 py-4">
                <div className="w-full flex justify-end px-20 "> 
                    {username === getCookie('socio-user') && (<button className="bg-pink-200 rounded-lg px-3 py-1" onClick={() => setUpdateMode(!updateMode)}>Update Profile</button>)}
                </div>
                <div className="drop-shadow-lg flex flex-row px-5  justify-evenly items-center rounded-lg w-2/3">
                    <img src="/d-prof.jpg" className="rounded-full" width={150} height={150} alt="Profile" />
                    <div className="px-2 py-3 flex flex-col justify-center items-start">
                        <p className="text-5xl"><b>{uname}</b></p>
                        <p style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere"}} className="text-xs text-color-800 w-60 max-h-40 overflow-hidden break-words" >{bio}</p>
                        <div className="flex flex-row w-full justify-between items-center my-4">
                            <button className="flex flex-col-reverse justify-evenly items-center w-1/3 text-sm" >
                                {myPosts&&myPosts.length>1?"Posts":"Post"} <p className="text-xl">{myPosts?myPosts.length:0}</p>
                            </button>
                            <p className="text-xs" >|</p>
                            <button className="flex flex-col-reverse justify-evenly items-center w-1/2 text-sm" onClick={()=>{
                                setOpenFollowers(!openFollowers)
                                setOpenFollowing(false)
                            }} >
                                {profile_data.followers&&profile_data.followers.length>1?"Followers":"Follower"} <p className="text-xl">{profile_data.followers?profile_data.followers.length:0}</p>
                            </button>
                            <ul className="flex flex-col absolute w-40  right-full bg-white px-4 py-2 rounded-lg drop-shadow-lg  " style={{ display: openFollowers ? "flex" : "none", top:"70px" }}>
                                <p className="text-xs text-gray-400 py-2 ">Followed by</p>
                                <div className="absolute top-12" style={{ right: "-10px" }}><BiSolidRightArrow color="white" /></div>
                                <div className="max-h-50 overflow-y-scroll">
                                    {openFollowers && profile_data.followers.length > 0 ? profile_data.followers.map((el, i) => (
                                        <li className="rounded-lg mb-2 px-4 py-2 bg-gray-200" key={i}>
                                            <Link to={`/profile/${el.username}/${el.uid}`}>
                                                @ {el.username}    
                                            </Link>
                                        </li>
                                    )) : <p className="px-1 py-2" >No one :(</p>}
                                </div>
                            </ul>
                            <p className="text-xs" >|</p>
                            <button className="flex flex-col-reverse justify-evenly items-center w-1/2 text-sm" onClick={()=>{
                                setOpenFollowing(!openFollowing)
                                setOpenFollowers(false)
                            }}>
                                {profile_data.following&&profile_data.following.length>1?"Followings":"Following"} <p className="text-xl" >{profile_data.following?profile_data.following.length:0}</p>
                            </button>
                            <ul className="flex flex-col absolute w-40  right-full bg-white px-4 py-2 rounded-lg drop-shadow-lg  " style={{ display: openFollowing ? "flex" : "none", top:"70px" }}>
                                <p className="text-xs text-gray-400 py-2 ">Following </p>
                                <div className="absolute top-12" style={{ right: "-10px" }}><BiSolidRightArrow color="white" /></div>
                                <div className="max-h-50 overflow-y-scroll">
                                    {openFollowing && profile_data.following.length > 0 ? profile_data.following.map((el, i) => (
                                        <li className="rounded-lg mb-2 px-4 py-2 bg-gray-200" key={i}>
                                            <Link to={`/profile/${el.username}/${el.uid}`}>
                                                @ {el.username}    
                                            </Link>
                                        </li>
                                    )) : <p className="px-1 py-2" >No one :(</p>}
                                </div>
                            </ul>
                            {/* <p>Followers {profile_data.followers?profile_data.followers.length:0}</p>
                            <p>Followings {profile_data.following?profile_data.following.length:0}</p> */}
                        </div>
                        <div className="py-2  rounded-lg ">
                            <button className="px-3 bg-blue-200 rounded-lg py-2 transition-all duration-3000 hover:bg-blue-100" style={{
                                backgroundColor:isFollowing?"#dbeafe":"#bfdbfe "
                                // transition:"all 0.3s ease"
                            }} onClick={async ()=>{
                                const addf=await AddFollower(profile_data.uid)
                                addf.message=="You cannot follow yourself"?setisFollowing(false):setisFollowing(true);
                                
                            }}>{isFollowing?"Following":"Follow"}</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-evenly items-center w-1/2 px-2 py-4">

                    <button className="px-2 py-2  transition-all duration-300 rounded-lg" onClick={()=>setOpenMyPosts(true)} style={{
                        background: openMyPosts?"#fbcfe8":'white',
                        fontWeight: openMyPosts?"600":'100'
                    }} >Posts by {username==getCookie('socio-user')?"you":username}</button>
                    <button className="px-2 py-2 rounded-lg transition-all duration-300" onClick={()=>setOpenMyPosts(false)} style={{
                        background: !openMyPosts?"#fbcfe8":'white',
                        fontWeight: !openMyPosts?"600":'100'
                    }}>My Trash </button>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col-reverse"  >
                        
                        {
                            openMyPosts&& myPosts.map((post,i)=>{
                                const isLiked = post.post.likedBy? post.post.likedBy.some(like => like.username === userData.username):false;

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
                                // console.log("))))))))))0 ",post)
                                return(
                                    <div key={i} className="post bg-gray-100 mb-4 rounded-lg px-4 py-2 drop-shadow-lg" style={{width:"432px"}}>
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
                                    <div className="middle-section flex flex-row w-80 break-words px-0 py-4" style={{whiteSpace:'pre-wrap',overflowWrap:"anywhere"}}>
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
                                                                    {cisLiked ? <BiSolidHeart color="red"/> : <BiHeart />}
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
                                                    <div className="flex w-3/4 py-2 break-words" style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere"}} >
                                                        {el.comment}
                                                    </div>
                                                    {(el.commentBy || "aiyen?!") === userData.username ? (
                                                        <button
                                                            onClick={handleCommentDel}
                                                            className="text-red-700 border w-fit border-transparent transition-all duration-300 hover:border-red-700 rounded-full border-solid"
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
                                )
                            })
                        }
                        {
                            openMyPosts&&!myPosts.length>0?
                            <div className=" rounded-2xl bg-gray-100 text-gray-400 w-72 h-72 flex flex-col justify-center items-center" >
                                    <CancelCircleIcon size={100} color="lightgray" className="mb-2"/>
                                    No Posts Yet
                                </div>
                            :""
                        }
                    </div>
                    
                    {username==getCookie('socio-user') && !openMyPosts?
                        <div className="flex flex-col-reverse" >
                            {
                                myTrash.map((post,i)=>{
                                    const isLiked = post.post.likedBy? post.post.likedBy.some(like => like.username === userData.username):false;

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
                                    // console.log("))))))))))0 ",post)
                                    return(
                                        <div key={i} className="post bg-gray-100 mb-4 rounded-lg px-4 py-2 drop-shadow-lg" style={{width:"432px"}}>
                                        <div className="top-bar author flex flex-row justify-between items-center">
                                            <div className="left flex flex-row items-center justify-evenly w-11">
                                                <img src="/d-prof.jpg" alt="Profile" className="rounded-full w-3 h-3 border-3 border-white border-solid" />
                                                <b>{post.metaData.author}</b>
                                            </div>
                                            <div className="right flex flex-row">
                                                {post.metaData.author === userData.username ? (
                                                    <button
                                                        onClick={() => handleDelPermenently(post._id)}
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
                                        <div className="middle-section flex flex-row w-80 break-words px-0 py-4" style={{whiteSpace:'pre-wrap',overflowWrap:"anywhere"}}>
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
                                                    {post.post.comments?post.post.comments.length:"0"}
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
                                                                        {cisLiked ? <BiSolidHeart color="red"/> : <BiHeart />}
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
                                                        <div className="flex w-3/4 py-2 break-words" style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere"}} >
                                                            {el.comment}
                                                        </div>
                                                        {(el.commentBy || "aiyen?!") === userData.username ? (
                                                            <button
                                                                onClick={handleCommentDel}
                                                                className="text-red-700 border w-fit border-transparent transition-all duration-300 hover:border-red-700 rounded-full border-solid"
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
                                    )
                                })
                            }
                            {
                                !openMyPosts&&!myTrash.length>0?
                                <div className=" rounded-2xl bg-gray-100 text-gray-400 w-72 h-72 flex flex-col justify-center items-center" >
                                    <FaRegTrashCan size={100} color="lightgray" className="mb-2"/>
                                    
                                    No Trash Yet
                                </div>
                                :""
                            }
                        </div>
                    :
                    !openMyPosts&&<div className=" rounded-2xl bg-gray-100 text-gray-400 w-72 h-72 flex flex-col justify-center items-center" >
                        <BiShieldX size={100} color="lightgray" className="mb-2"/>
                        Private
                    </div>
                    } 
                </div>
            </div>
            }
        </>
    );
};

export default ProfilePage;