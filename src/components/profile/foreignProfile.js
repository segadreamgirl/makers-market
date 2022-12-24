import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import "./profile.css"

export const ForeignProfile = () =>{
    const {userId} = useParams()
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})


    useEffect (
        () =>{
            fetch(`http://localhost:8088/posts?userId=${userId}`)
                .then(response => response.json())
                .then((postArray)=>{
                    setPosts(postArray)
            })
        },
        []
    )

    useEffect (
        () =>{
            fetch(`http://localhost:8088/users/${userId}`)
                .then(response => response.json())
                .then((userObject)=>{
                    setUser(userObject)
            })
        },
        []
    )

return <>
        <div className="profileContainer">
            <div className="profilePostFeed">
            {
                posts.map(
                    (post) => {
                        if(post.product===true){
                            return <section className="imgPost" key={post.id}>
                                <div className="titleContainer">
                                <h3 className="titleStyle"><Link className="link_styles" to={`/post/${post.id}`}>{post.title}</Link></h3>
                                </div>
                                <img src={post.imgURL} className="profileImgPost__img" />
                                <p>
                                    {post.textContent}
                                </p>
                            </section>
                        } else {
                            return <section className="profileTextPost" key={post.id}>
                                <div className="titleContainer">
                                <h3 className="titleStyle"><Link className="link_styles" to={`/post/${post.id}`}>{post.title}</Link></h3>
                                </div>
                                    {post.textContent}
                            </section>
                        }
                }
                ).reverse()
            }
        </div>
        <div className="sideProfile">
                    <section><img src={user.profilePic} className="sideProfile__img"/></section>
                    <div>
                    <section className="sideProfile__name" key={user.id}><h2>{user.name}</h2></section>
                    <section><h3>@{user.username}</h3></section>
                    <section><h5>{user.bio}</h5></section>
                    </div>
        </div>
        </div>
</>
}