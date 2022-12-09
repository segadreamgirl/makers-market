import { useEffect, useState } from "react"
import "./postFeed.css"

export const PostFeed = () => {
    //deconstruction of useState for posts
const [posts, setPosts] = useState([])


useEffect (
    () =>{
        fetch(`http://localhost:8088/posts`)
            .then(response => response.json())
            .then((postArray)=>{
                setPosts(postArray)
        })
    },
    [] //observing initial state
)

return <>
    <div className="postFeed">
    {
        posts.map(
            (post) => {
                if(post.product===true){
                    return <section className="imgPost" key={post.id}>
                        <h2 className="titleStyle">{post.title}</h2>
                        <img src={post.imgURL} className="imgPost__img" />
                        <p>
                            {post.textContent}
                        </p>
                    </section>
                } else {
                    return <section className="textPost" key={post.id}>
                        <h2 className="titleStyle">{post.title}</h2>
                            {post.textContent}
                    </section>
                }
            }
        )
    }
</div>
</>
}