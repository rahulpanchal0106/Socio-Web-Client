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
        <>
          {
            feed_posts? feed_posts.map((el,i)=>{
                return(
                    <div key={i} className="post bg-red-500" style={{
                        padding:"10px 20px",
                        borderRadius:"7px",
                        marginBottom:"8px"
                    }}>
                        <div className="content">
                            {el.post.content}
                        </div>
                        <div className="author" style={{
                            position:'relative',
                            right:"-120px"
                        }}>
                            ~ {el.metaData.author}
                        </div>
                        <div className="actions" style={{
                            position:'relative',
                            right:"-120px"
                        }}>
                            {el.post.likes} likes
                        </div>
                    </div>
                )
            }):"No data"
          }
        </>
    );
};

export default Feed;
