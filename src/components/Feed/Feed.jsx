import { useEffect, useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from '../../utils/url'

const Feed = () => {
    
    const [feed_posts, setFeed] = useState('');
    useEffect(() => {
        const getData = async () => {
            const data = await fetchData(url+"/feed",null,'GET');
            
            console.log(data);
            setFeed(data)
        };
        getData();
    }, []);


    return (
        <div className="px-10 py-5">
          {
            feed_posts? feed_posts.map((el,i)=>{
                return(
                    <div key={i} className="post bg-red-500 mb-4" >
                        <div className="top-bar author flex flex-row ">
                            <div className="left flex flex-row items-center justify-evenly w-11 ">
                                <img src="/d-prof.jpg" alt="Profile" className="rounded-full w-3 h-3 border-3 border-white border-solid" />
                                {el.metaData.author}
                            </div>
                            <div className="right">
                                {

                                }
                            </div>
                        </div>
                        <div className="middle-section ">
                            {el.post.content}
                        </div>
                        <div className="bottom-bar " >
                            <div className="likes">
                                {el.post.likes} likes
                            </div>
                            
                        </div>
                    </div>
                )
            }):"No data"
          }
        </div>
    );
};

export default Feed;
