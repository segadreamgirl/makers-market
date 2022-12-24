import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import "./post.css"

export const Post = () => {
    const {postId} = useParams()
    const [post, updatePost] = useState({})

useEffect(
    ()=>{
        fetch(`http://localhost:8088/posts/${postId}?_expand=user`)
        .then(response => response.json())
        .then((data) =>{
            updatePost(data)
        })
    },
    [postId]
)

const postDisplay = () => {
    if(post.product===true){
        return <>
        <section>
        <img src={post.imgURL} className="post__img"/>
        <p>{post.textContent}</p>
        </section>
        </>
    } else {
        return <>
        <section><p>{post.textContent}</p></section>
        </>
    }
}


return <>
<div className="post__container">
    <div className="post__username">
        <h5 className="post__postedBy">POSTED BY</h5>
        <img src={post?.user?.profilePic} className="profilePic"/>
        <h5><Link to={`profile/${post?.user?.id}`} className="link_styles">@{post?.user?.username}</Link></h5>
    </div>
    <div className="post__content">
        <h1 className="titleStyle">{post.title}</h1>
        {
            postDisplay()
        }
    </div>
</div>
    </>
}