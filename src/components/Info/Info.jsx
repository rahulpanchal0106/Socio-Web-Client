import { AiBrain04Icon, ArrowDiagonalIcon, Github01Icon } from "hugeicons-react"
import "./info.css"
import { BiRightArrow, BiSolidHeart } from "react-icons/bi"
import { FaBoxOpen, FaGithub } from "react-icons/fa"
import Nav from "../Navbar/Nav"

const Info = ()=>{
    return (
        <div className="w-screen lg:mt-5 mt-5 overflow-y-scroll absolute top-0 right-0 flex flex-col justify-center items-center ">
            <Nav/>
            <h1 className="text-6xl lg:mb-10 mb-20 mt-24">About</h1>
            <div className="w-full px-10 lg:p-0 lg:w-1/2 text-xs flex flex-col justify-center items-top my-10">
                <p className="w-full text-sm flex flex-row justify-center items-center">
                    - In simple words, Socio is an AI powered social media platform. 
                    <br/>
                    <br/>
                    - It is a platform where the user will see what they actually like to see.
                    <br/>
                    - The powerful people recommendation system introduces the user with other people who has similar interests, who are more likely to be Friends.
                </p>
            </div>  
            {/* <h2 className="mb-5"></h2> */}
            <h1 className="text-2xl mb-5">Curious about how it works?</h1>
            <ul className="w-1/2 list-disc" >
                <li className="flex lg:flex-row flex-col w-full h-fit justify-center items-start py-2">
                    <b className="text-md lg:mt-0 mt-3">
                       AI Powered Categorization
                    </b>
                    <p className="text-5xl lg:mx-5 lg:my-0 mx-0 my-0 ">
                        -
                    </p>
                    <p className="text-sm lg:mb-0 mb-10"> 
                        Gemini detects the Category or Emotion of the post being made and tags them with it, Which is used to identify user's interests.
                    </p>
                </li>
                <li className="flex lg:flex-row flex-col w-full h-fit justify-center items-start py-2">
                    <b className="text-md lg:mt-0 mt-3">
                        Personalised Feed
                    </b>
                    <p className="text-5xl lg:mx-5 lg:my-0 mx-0 my-0 ">
                        -
                    </p>
                    <p className="text-sm lg:mb-0 mb-10"> 
                        Socio has a custom algorithm running on the server, powered by efficient MongoDB aggregation techniques and other data-structures. It basically sorts the feed based on user's likes map.
                    </p>
                </li>
                <li className="flex lg:flex-row flex-col w-full h-fit justify-center items-start py-2">
                    <b className="text-md lg:mt-0 mt-3">
                        Customizable Profile
                    </b>
                    <p className="text-5xl lg:mx-5 lg:my-0 mx-0 my-0 ">
                        -
                    </p>
                    <p className="text-sm lg:mb-0 mb-10"> 
                        User can customie their profile. The profile is also tagged with the user's most liked category.
                    </p>
                </li>
                <li className="flex lg:flex-row flex-col w-full h-fit justify-center items-start py-2">
                    <b className="text-md lg:mt-0 mt-3">
                        People recommendation system
                    </b>
                    <p className="text-5xl lg:mx-5 lg:my-0 mx-0 my-0 ">
                        -
                    </p>
                    <p className="text-sm lg:mb-0 mb-10"> 
                        Based on the profile tags, all the people having common interests are returned first on the people section. The user will likely be friends with these chosen people.
                    </p>
                </li>
                <li className="flex lg:flex-row flex-col w-full h-fit justify-center items-start py-2">
                    <b className="text-md lg:mt-0 mt-3">
                        High Quality Media Support
                    </b>
                    <p className="text-5xl lg:mx-5 lg:my-0 mx-0 my-0 ">
                        -
                    </p>
                    <p className="text-sm lg:mb-0 mb-10"> 
                        The platform is connnected with a 15GB of google drive storage, and is capable of storing and delivering high quality image data. For both Profile Pictures and image Posts.
                    </p>
                </li>
                <li className="flex lg:flex-row flex-col w-full h-fit justify-center items-start py-2">
                    <b className="text-md lg:mt-0 mt-3">
                        Post and Profile actions
                    </b>
                    <p className="text-5xl lg:mx-5 lg:my-0 mx-0 my-0 ">
                        -
                    </p>
                    <p className="text-sm lg:mb-0 mb-10"> 
                        Just like any other social media platform, Socio provides all the basic post actions such as Like posts and comments, Comment, Follow and Unfollow.
                    </p>
                </li>
                <li className="flex lg:flex-row flex-col w-full h-fit justify-center items-start py-2">
                    <b className="text-md lg:mt-0 mt-3">
                        Social Netowork
                    </b>
                    <p className="text-5xl lg:mx-5 lg:my-0 mx-0 my-0 ">
                        -
                    </p>
                    <p className="text-sm lg:mb-0 mb-10"> 
                        The user can traverse through the whole social network via post likes, comments, follower lists.
                    </p>
                </li>
                <li className="flex lg:flex-row flex-col w-full h-fit justify-center items-start py-2">
                    <b className="text-md lg:mt-0 mt-3">
                        Open sourced
                    </b>
                    <p className="text-5xl lg:mx-5 lg:my-0 mx-0 my-0 ">
                        -
                    </p>
                    <p className="text-sm lg:mb-0 mb-10"> 
                        If you're that nerd who really wants to know and tweak how it works, do check out the GitHub repositories. 
                        <br />
                        - <a className="text-blue-500" target="_blank" href="https://github.com/rahulpanchal0106/Socio-Web-Client">Front-end</a>
                        <br />
                        - <a className="text-blue-500" target="_blank" href="https://github.com/rahulpanchal0106/Socio-server">Back-end</a>
                        <br />
                        PRs are welcomed!

                    </p>
                </li>
            </ul>
            <div className="w-full text-xs flex flex-col justify-center items-top my-10">
                <p className="w-full text-xs flex flex-row justify-center items-center">
                    Made with <BiSolidHeart color="red" className="mx-1" /> by 
                    <a href="https://github.com/rahulpanchal0106" className="px-1 text-blue-500" rel="noopener noreferrer" target="_blank">rho</a> 
                    and <a className="px-1 text-blue-500" href="https://github.com/rahulpanchal0106/Socio-Web-Client/graphs/contributors" rel="noopener noreferrer" target="_blank">contributors</a>

                </p>
                <div className="w-full text-xs flex flex-row justify-center items-center my-5">
                    <a href="https://github.com/rahulpanchal0106/Socio-Web-Client" target="_blank"><FaGithub size={17}/></a>
                </div>
            </div>  
        </div>
    )
}

export default Info