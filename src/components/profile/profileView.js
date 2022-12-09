import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import deleteicon from "../images/delete.png"
import "./profile.css"

export const ProfileView = () => {
    //deconstruction of useState for posts
const [posts, setPosts] = useState([])

const makersUser = localStorage.getItem("makers_user")
const userObject = JSON.parse(makersUser)

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
<div className="profileContainer">
    <div className="postFeed">
    {
        posts.map(
            (post) => {
            if(post.userId===userObject.id){
                if(post.product===true){
                    return <section className="imgPost" key={post.id}>
                        <div className="titleContainer">
                        <h2 className="titleStyle">{post.title}</h2>
                        <div className="btnContainer">
                            <div className="btn_edit">
                            <Link to={`/profile/edit/product/${post.id}`} className="link_styles">edit</Link> 
                            </div>
                            <div className="btn_delete"> delete </div>
                        </div>
                        </div>
                        <img src={post.imgURL} className="imgPost__img" />
                        <p>
                            {post.textContent}
                        </p>
                    </section>
                } else {
                    return <section className="textPost" key={post.id}>
                        <div className="titleContainer">
                        <h2 className="titleStyle">{post.title}</h2>
                        <div className="btnContainer">
                            <div className="btn_edit">
                            <Link to={`/profile/edit/post/${post.id}`} className="link_styles">edit</Link> 
                            </div>
                            <div className="btn_delete"> 
                            delete
                            </div>
                        </div>
                        </div>
                            {post.textContent}
                    </section>
                }
            }
        }
        )
    }
</div>
<div className="sideProfile"></div>
</div>
</>
}