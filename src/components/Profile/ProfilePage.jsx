import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";
import getCookie from "../../utils/getCookie";
import DelPost from "../Post_actions/DelPost";
import LikePost from "../Post_actions/LikePost";
import toast, { Toaster } from 'react-hot-toast';
import { BiBall, BiCloset, BiComment, BiCommentAdd, BiDotsVertical, BiDotsVerticalRounded, BiDownArrow, BiDownArrowAlt, BiEdit, BiExit, BiHeart, BiLeftArrow, BiLogOutCircle, BiPlus, BiPointer, BiShare, BiShield, BiShieldX, BiSolidComment, BiSolidHeart, BiSolidLeftArrow, BiSolidPointer, BiSolidRightArrow, BiTrash, BiTrashAlt, BiWind } from "react-icons/bi";
import Nav from "../Navbar/Nav";
import { useNavigate } from "react-router-dom";
import { FaComment, FaComments, FaCommentsDollar, FaCommentSlash, FaCommentSms, FaDeleteLeft, FaLinkSlash, FaRegCommentDots, FaRegTrashCan, FaShieldCat, FaSlash, FaTag, FaTextSlash, FaTrashArrowUp, FaTrashCan } from "react-icons/fa6";
import { FaCommentAlt, FaDotCircle, FaHeartbeat, FaInfo, FaLeaf, FaRegComment, FaRegComments, FaRemoveFormat, FaStoreSlash, FaTintSlash, FaToiletPaperSlash, FaUserShield } from "react-icons/fa";
import TimeAgo from 'react-timeago';
import 'hugeicons-react';
import { CancelCircleIcon, CircleIcon, CloudSlowWindIcon, CommentAdd01Icon, CommentRemove01Icon, CommentRemove02Icon, Edit01Icon, Edit02Icon, EditOffIcon, EditUser02Icon, InLoveIcon, LeftAngleIcon, LeftToRightListDashIcon, Logout02Icon, Logout03Icon, Logout04Icon, Logout05Icon, LogoutSquare02Icon, LoveKoreanFingerIcon, MaskLoveIcon, MessageCancel02Icon, ParagraphBulletsPoint01Icon, PreviousIcon, Share08Icon, UserAdd01Icon, UserCheck01Icon, UserEdit01Icon, UserLove01Icon, UserLove02Icon } from "hugeicons-react";
import getUserData from "../../utils/getData";
import DelPerm from "../Post_actions/DelePerm";
import AddFollower from "../Post_actions/addFollower.js"
import './style.css'
import { GrClose, GrDown, GrLike, GrLogout, GrTag } from "react-icons/gr";
import LogOut from "../Auth/LogOut.js";
import { useCookies } from "react-cookie";
import feather from 'feather-icons';
import FileUpload from "./FileUpload.jsx";
import {Bio_skel, Cat_skel, Pff_skel, Username_skell} from "../Loader/Profile_Skel.jsx";

const ProfilePage = () => {
    const { username,uidTo } = useParams(); 
    const [updateMode, setUpdateMode] = useState(false);
    const [formData, setFormData] = useState({ bio: "" });
    const [uname, setUname] = useState('');
    const [bio, setBio] = useState('');
    const [pf, setPf] = useState(null);
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
    const [selectedFile, setSelectedFile] = useState(null)
    const [pisLoading,setPIsLoading] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['sociotoken']);
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        feather.replace();
        setPf(profile_data.profilePicture?"https://drive.google.com/file/d/"+profile_data.profilePicture+"/preview":"/d-prof.jpg");
      }, []);

    const logout = () => {
        removeCookie('sociotoken');
        removeCookie('socio-pf')
        window.location.pathname = "/";
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getData = async () => {
        setPIsLoading(true);
        const data = await fetchData(url + "/feed", null, 'GET');
        setPIsLoading(false);
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
            if(user.username==getCookie('socio-user')){
                setisFollowing(true);
            }
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
        toast.loading("Updating profile data");
        const resp = await fetchData(url + '/profile', fields, 'PUT');
        toast.dismiss();
        
        
        if(resp.status==200){
            setUpdateMode(!updateMode)
            toast.success(resp.message);
            getMyData()
        }else{
            toast.error(resp.message);
        }

        if(resp==null || resp==undefined){
            toast.error("failed to update profile");
        }
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
            <Toaster/>
            {/* {!pisLoading?
            <div className="flex justify-center items-center">
                <Profile_Skel/>
            </div>
            : */}
            {
            (updateMode ?
            (
            <div className="flex flex-col justify-center items-center">
                    
            <form className="flex flex-col justify-between items-center px-4 py-4  " onSubmit={handleProfileUpdate}>
                    <FileUpload username={getCookie('socio-user')} src={profile_data.profilePicture?`https://lh3.googleusercontent.com/d/${profile_data.profilePicture}`:"/d-prof.jpg"} />
                <div className="flex flex-col lg:flex-row px-5 py-4 justify-evenly   rounded-lg w-2/3">
                    {/* <img src={profile_data.profilePicture?"https://drive.google.com/uc?export=view&id="+profile_data.profilePicture:"/d-prof.jpg"} className="rounded-full" width={window.innerWidth<766?100:150} height={window.innerWidth<766?100:150} alt="Profile" /> */}
                    <div className="flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text-5xl" 
                            className="bg-gray-100 dark:bg-gray-900 dark:text-white px-3 py-1 rounded-lg"
                            placeholder="Username" 
                            id="username" 
                            name="username" 
                            disabled 
                            value={uname} 
                            onChange={handleChange}
                        />
                        <label htmlFor="bio">Bio</label>
                        <textarea 
                            className="bg-gray-100 dark:bg-gray-900 dark:text-white px-3 py-1 rounded-lg resize-none"
                            name="bio" 
                            id="bio" 
                            maxLength={36}
                            placeholder="Enter your Bio"
                            value={formData.bio} 
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    {username === getCookie('socio-user') && (
                        <button className="text-red-500 hover:text-xl hover:text-red-200 px-2 py-4 align-center flex items-center justify-center absolute right-20 top-20" onClick={() => setUpdateMode(!updateMode)}> <GrClose/></button>
                    )}
                </div>
                <button className="bg-pink-200 dark:bg-slate-600 dark:text-white dark:hover:bg-slate-700 hover:bg-pink-500 rounded-lg px-3 py-1" type="submit">Update profile</button>
            </form>
            
            </div>
            )
            :
            <div className="flex flex-col justify-between lg:mt-20 items-center px-4 py-4">
                
                <div className="drop-shadow-lg flex flex-row px-5 lg:mt-12 justify-evenly items-start lg:items:center rounded-lg w-2/3">
                    {/* <div className="w-48 h-48 rounded-3xl overflow-hidden relative">
                        <iframe
                            className="absolute inset-0 w-48 h-48 rounded-3xl"
                            src={
                            profile_data.profilePicture
                                ? `https://drive.google.com/file/d/${profile_data.profilePicture}/preview`
                                : '/d-prof.jpg'
                            }
                            style={{
                            width: '100%',
                            transform: 'scale(1.25)',
                            border: 'none',
                            // pointerEvents: 'none',
                            }}
                            frameBorder="0"
                            title="Profile Picture"
                        ></iframe>
                    </div> */}


                    {/* <iframe className="rounded-full w-36 h-36 border border-none" 
                        style={{
                            // pointerEvents: 'none', 
                            color:"red",
                            border:"none"
                        }}
                        frameBorder="0"
                        allow="autoplay; fullscreen" 
                    src={pf}>
                        hhhh
                    </iframe> */}
                    {/* <img src={profile_data.profilePicture?"https://drive.google.com/thumbnail?id=1PT7UxITAVN6EsruZqwhhmojoz6g6p84H":"/d-prof.jpg"} className="rounded-full" width={ window.innerWidth<766?80:150} height={window.innerWidth<766?100:150} alt="Profile" /> */}
                    <div className="px-0 py-3 flex flex-col justify-center items-center ">
                        <div className="flex flex-row justify-center items-center w-screen">
                            <img className="rounded-full lg:w-48 lg:h-48 w-24 h-24 overflow-hidden border border-solid border-gray-400 object-cover" src={profile_data.profilePicture?`https://lh3.googleusercontent.com/d/${profile_data.profilePicture}`:"/d-prof.jpg"} alt="Profile" />
                            <p className="px-5 text-2xl lg:text-5xl"><b>{!uname? <Username_skell/> :uname}</b></p>
                        </div>
                        <div className="px-2 py-1 flex flex-row justify-evenly items-center ">
                            
                                <FaDotCircle className="mr-5"/>
                                <p style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere"}} className="py-4 text-s text-color-800 w-40 mr-5 max-h-40 overflow-hidden break-words flex flex-col justify-left items-left" >
                                    {!bio?<Bio_skel/>:bio}
                                </p>
                            
                            <div className="flex flex-row text-xs justify-evenly items-center w-fit rounded-lg bg-gray-200 dark:bg-gray-600 dark:text-white text-gray-500 px-2 py-1 ">
                                <BiSolidHeart size={17} className="mr-2"/>{
                                profile_data.category_pref?
                                
                                    !profile_data.category_pref[0]?
                                    <Cat_skel/>
                                :profile_data.category_pref[0]
                                
                                :<Cat_skel/>}
                            </div>
                        </div>
                        <div className="flex flex-row w-3/4 lg:w-64 justify-between items-center my-5">
                            <button className="flex flex-col-reverse justify-evenly items-center w-1/3 text-sm" >
                                {myPosts&&myPosts.length>1?"Posts":"Post"} <p className="text-xl">{myPosts?myPosts.length:<Pff_skel/>}</p>
                            </button>
                            <p className="text-xs" >|</p>
                            <button className="flex flex-col-reverse justify-evenly items-center w-1/2 text-sm" onClick={()=>{
                                setOpenFollowers(!openFollowers)
                                setOpenFollowing(false)
                            }} >
                                {profile_data.followers&&profile_data.followers.length>1?"Followers":"Follower"} <p className="text-xl">{
                                !profile_data.followers?
                                <Pff_skel/>
                                :profile_data.followers.length
                                
                                }</p>
                            </button>
                            <ul className="flex flex-col absolute w-full h-full  left-0 top-0 bg-white dark:bg-gray-600 dark:text-white px-4 py-2 rounded-lg drop-shadow-lg  " style={{ 
                                            display: openFollowers ? "flex" : "none",
                                            // top:"70px",  
                                            // right: window.innerWidth<766?"30%":"100%"
                                        }}>
                                <p className="text-xs text-gray-400 py-2 ">Followed by </p>
                                <button onClick={()=>setOpenFollowers(false)} className="absolute right-2" ><GrClose/></button>
                                {/* <div className="absolute top-12" style={{ right: "-10px" }}><BiSolidRightArrow color="white" /></div> */}
                                <div className="max-h-50 overflow-y-scroll">
                                    {openFollowers && profile_data.followers.length > 0 ? profile_data.followers.map((el, i) => (
                                        <li className="rounded-lg mb-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white" key={i}>
                                            <Link to={`/profile/${el.username}/${el.uid}`} className="flex flex-row justify-start items-center">
                                                <img className="rounded-full w-8 h-8 mr-2 overflow-hidden border border-solid border-gray-400 object-cover" src={el.profilePicture?`https://lh3.googleusercontent.com/d/${el.profilePicture}`:"/d-prof.jpg"} alt="Profile" />
                                                {el.username}    
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
                                {profile_data.following&&profile_data.following.length>1?"Followings":"Following"} <p className="text-xl" >{profile_data.following?profile_data.following.length:<Pff_skel/>}</p>
                            </button>
                            {/* <ul className="flex flex-col absolute w-40  right-full bg-white dark:bg-gray-600 dark:text-white px-4 py-2 rounded-lg drop-shadow-lg  " style={{  */}
                            <ul className="flex flex-col absolute w-full h-full  left-0 top-0 bg-white dark:bg-gray-600 dark:text-white px-4 py-2 rounded-lg drop-shadow-lg  " style={{ 
                                            display: openFollowing ? "flex" : "none",
                                            // top:"70px",  
                                            // right: window.innerWidth<766?"30%":"100%",
                                            // zIndex:50
                                        }}>
                                <button onClick={()=>setOpenFollowing(false)} className="absolute right-2" ><GrClose/></button>
                                <p className="text-xs text-gray-400 py-2 ">Following </p>
                                {/* <div className="absolute top-12" style={{ right: "-10px" }}><BiSolidRightArrow color="white" /></div> */}
                                <div className="max-h-50 overflow-y-scroll">
                                    {openFollowing && profile_data.following.length > 0 ? profile_data.following.map((el, i) => (
                                        <li className="rounded-lg mb-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white" key={i}>
                                            <Link to={`/profile/${el.username}/${el.uid}`} className="flex flex-row justify-start items-center">
                                                <img className="rounded-full w-8 h-8 mr-2 overflow-hidden border border-solid border-gray-400 object-cover" src={el.profilePicture?`https://lh3.googleusercontent.com/d/${el.profilePicture}`:"/d-prof.jpg"} alt="Profile" />
                                                {el.username}    
                                            </Link>
                                        </li>
                                    )) : <p className="px-1 py-2" >No one :(</p>}
                                </div>
                            </ul>
                            {/* <p>Followers {profile_data.followers?profile_data.followers.length:0}</p>
                            <p>Followings {profile_data.following?profile_data.following.length:0}</p> */}
                        </div>
                        
                        
                        {username != getCookie('socio-user') && ( <button className="px-3 w-36 my-5 bg-blue-200 dark:bg-gray-600 dark:text-white rounded-lg py-2 transition-all duration-300 hover:rounded-2xl hover:drop-shadow-lg" id="follow_btn" style={{
                                backgroundColor:isFollowing?"rgb(59 130 246 / 0.5)":"rgb(59, 130, 246)",
                                color:isFollowing?"black":"white"
                                // transition:"all 0.3s ease"
                            }} onClick={async ()=>{
                                const addf=await AddFollower(profile_data.uid)
                                addf.status==400?setisFollowing(false):setisFollowing(true);
                                addf.status==201?setisFollowing(true):setisFollowing(false);
                                
                            }}>{isFollowing?
                                <p className="flex flex-row w-full justify-evenly items-center">
                                    Following <UserCheck01Icon size={20}/>
                                </p>
                                :<p className="flex flex-row w-full justify-evenly items-center">
                                    Follow <UserAdd01Icon size={20}/>
                                </p>}
                            </button>)
                        }

                        {
                            username == getCookie('socio-user') && (
                                <div className="flex flex-row w-1/2 my-5 justify-evenly itmes-center"> 
                                    {username === getCookie('socio-user') && (<button className="bg-gray-200 dark:bg-gray-600 dark:text-white transition transition-all duration-300 hover:bg-gray-300 hover:drop-shadow-xlg rounded-lg px-3 py-1 text-xs lg:text-lg  " onClick={() => setUpdateMode(!updateMode)}>
                                        <UserEdit01Icon/>
                                    </button>)}
                                    <button
                                        className=" flex flex-row justify-between items-center text-left text-red-600 hover:drop-shadow-md hover:pb-2 hover:text-red-900"
                                        onClick={()=>logout()}
                                    >
                                        <Logout05Icon/>
                                    </button>
                                </div>
                            )
                        }
                        
                    </div>
                    
                </div>
                
                <div className="flex flex-row justify-evenly items-center w-1/2 px-2 py-4">

                    <button className={`px-2 py-2   text-xs lg:text-md transition transition-all duration-300 rounded-lg ${openMyPosts?"tracking-widest":'text-gray-500'}`} onClick={()=>setOpenMyPosts(true)} style={{
                        fontWeight: openMyPosts?"600":'100'
                    }} >Posts by {username==getCookie('socio-user')?"you":username}</button>
                    <button className={`px-2 py-2  text-xs lg:text-md rounded-lg transition-all duration-300 ${openMyPosts?"text-gray-500":'tracking-widest'}`} onClick={()=>setOpenMyPosts(false)} style={{
                        fontWeight: !openMyPosts?"600":'100'
                    }}>My Trash </button>
                    
                </div>
                <div className="flex flex-row mb-12">
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
                                    <div key={i} className="post bg-gray-100 dark:bg-gray-900 mb-4 rounded-lg px-4 py-2 drop-shadow-lg " style={{width:window.innerWidth<766?"343px":"432px"}}>
                                    <div className="top-bar author flex flex-row justify-between items-center">
                                        <div className="left flex flex-row items-center justify-evenly w-full">
                                            <Link to={`/profile/${post.metaData.author}/👋`} className="left flex flex-row items-center justify-start w-full">
                                                <img className="rounded-full w-8 h-8 border-3 border-white border-solid mr-2 object-cover" src={post.metaData.profilePicture && post.metaData.profilePicture!=undefined?`https://lh3.googleusercontent.com/d/${post.metaData.profilePicture}`:"/d-prof.jpg"} alt="Profile" />
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
                                        {   post.postImg && post.postImg!="none"
                                            ?<img className="rounded-2xl w-full h-full object-cover mt-1" src={post.postImg?`https://lh3.googleusercontent.com/d/${post.postImg}`:""} alt="Too many requests, Can't show the image for now" />
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
                                                    onClick={() => handleLike(post._id,isLiked)}
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
                                )
                            })
                        }
                        {
                            openMyPosts&&!myPosts.length>0?
                            <div className=" rounded-2xl bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-400 w-72 h-72 flex flex-col justify-center items-center" >
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
                                        <div key={i} className="post bg-gray-100 dark:bg-gray-900 dark:text-white mb-4 rounded-lg px-4 py-2 drop-shadow-lg " style={{width:window.innerWidth<766?"343px":"432px"}}>
                                        <div className="top-bar author flex flex-row justify-between items-center">
                                            <div className="left flex flex-row items-center justify-evenly w-full">
                                                <Link to={`/profile/${post.metaData.author}/👋`} className="left flex flex-row items-center justify-start w-full">
                                                    <img className="rounded-full w-8 h-8 border-3 border-white border-solid mr-2 object-cover" src={post.metaData.profilePicture && post.metaData.profilePicture!=undefined?`https://lh3.googleusercontent.com/d/${post.metaData.profilePicture}`:"/d-prof.jpg"} alt="Profile" />
                                                    <b>{post.metaData.author}</b>
                                                </Link>
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
                                        <div className="middle-section flex flex-col w-full break-words px-0 py-4" style={{whiteSpace:'pre-wrap',overflowWrap:' anywhere'}}>
                                            <div>
                                                {post.post.content}
                                            </div>
                                            {   post.postImg && post.postImg!="none"
                                                ?<img className="rounded-2xl w-full h-full object-cover mt-1" src={post.postImg?`https://lh3.googleusercontent.com/d/${post.postImg}`:""} alt="Too many requests, Can't show the image for now" />
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
                                                        onClick={() => handleLike(post._id,isLiked)}
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

                                        <ul className="flex flex-col absolute w-40  right-full bg-white dark:bg-gray-600 dark:text-white px-4 py-2 rounded-lg drop-shadow-lg  " style={{ 
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
                                                    <li className="rounded-lg mb-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white" key={i}>
                                                        <Link to={`/profile/${el.commentBy}/👋`} className="left flex flex-row items-center justify-evenly w-11">
                                                            <img src="/d-prof.jpg" alt="Profile" className="rounded-full w-3 h-3 border-3 border-white border-solid" />
                                                            {el.username}
                                                        </Link>
                                                    </li>
                                                )) : <p className="px-1 py-2" >No one :(</p>}
                                            </div>
                                        </ul>

                                        {showPostComments && <ul className=" flex flex-col-reverse  px-2  rounded-xl " style={{
                                                paddingTop:"10px", 
                                                paddingBottom:"10px",
                                                zIndex:10
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

                                                return (
                                                    <div className="flex flex-col mb-4 drop-shadow-lg bg-white dark:bg-gray-600 dark:text-white w-30 lg:96 px-4 py-4 border border-solid border-gray-200 rounded-xl" key={i}>
                                                        <div className="w-full flex flex-row justify-between">
                                                            <div className="flex flex-col">
                                                                <Link to={`/profile/${el.commentBy}/👋`} className="left flex flex-row items-center justify-evenly w-11">
                                                                    <img src="/d-prof.jpg" alt="Profile" className="rounded-full w-3 h-3 border-3 border-white border-solid" />
                                                                    <b>{el.commentBy || "aiyen?!"}</b>
                                                                </Link>
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
                                                                <ul style={{ display: openCLike ? "flex" : "none",left: window.innerWidth<766?"30%":"100%" }} className="flex flex-col w-1/2 absolute left-full bg-white px-4 py-2 rounded-lg drop-shadow-lg">
                                                                    <div className="absolute top-1/2" style={{ left: "-10px" }}><BiSolidLeftArrow color="white" /></div>
                                                                    <p className="text-xs text-gray-400 py-2 ">Comment Liked by</p>
                                                                    <div className="max-h-50 overflow-y-scroll"> 
                                                                        {el.likedBy.length>0?el.likedBy.map((like, i) => (
                                                                            <li key={i} className="rounded-lg mb-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white">@{like.username}</li>
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
                                            {/* <div className="relative left-20  " style={{ bottom:"22px" }}><BiSolidLeftArrow style={{rotate:"90deg"}} color="white" /></div> */}
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
                                <div className=" rounded-2xl bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-400 w-72 h-72 flex flex-col justify-center items-center" >
                                    <FaRegTrashCan size={100} color="lightgray" className="mb-2"/>
                                    
                                    No Trash Yet
                                </div>
                                :""
                            }
                        </div>
                    :
                    !openMyPosts&&<div className=" rounded-2xl bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-400 w-72 h-72 flex flex-col justify-center items-center" >
                        <BiShieldX size={100} color="lightgray" className="mb-2"/>
                        Private
                    </div>
                    } 
                </div>
            </div>
            )
            }
        </>
    );
};

export default ProfilePage;