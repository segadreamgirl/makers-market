import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Feed.css"

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
    {
        posts.map(
            (post) => {
                if(post.imgURL!==""){
                    return <section className="imgPost">
                        <h2>{post.title}</h2>
                        <img src={post.imgURL} className="imgPost__img" />
                        <p>
                            {post.textContent}
                        </p>
                    </section>
                } else {
                    return <section className="textPost">
                        <h2>{post.title}</h2>
                            {post.textContent}
                    </section>
                }
            }
        )
    }
</>
}