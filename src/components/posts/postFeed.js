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
                        <h3 className="titleStyle">{post.title}</h3>
                        <img src={post.imgURL} width="250px" />
                        <p>
                            {post.textContent}
                        </p>
                    </section>
                } else {
                    return <section className="textPost" key={post.id}>
                        <h3 className="titleStyle">{post.title}</h3>
                            {post.textContent}
                    </section>
                }
            }
        ).reverse()
    }
</div>
</>
}