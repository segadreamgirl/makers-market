import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./profile.css"

export const ProfileView = () => {
    //deconstruction of useState for posts
const [posts, setPosts] = useState([])
const [deleteButton, deleteButtonClicked] = useState(false)

const [users, setUsers] = useState([])

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
    []
)

useEffect (
    () =>{
        fetch(`http://localhost:8088/users`)
            .then(response => response.json())
            .then((usersArray)=>{
                setUsers(usersArray)
        })
    },
    []
)

useEffect (
    () =>{
        fetch(`http://localhost:8088/posts`)
            .then(response => response.json())
            .then((postArray)=>{
                setPosts(postArray)
        })
    },
    [deleteButton]
)

const handleDelete = (postObject) => {
    fetch(`http://localhost:8088/posts/${postObject.id}`,{
        method: "DELETE"})
        .then(()=>{
            deleteButtonClicked(true)
        })
}

return <>
<div className="profileContainer">
    <div className="profilePostFeed">
    {
        posts.map(
            (post) => {
            if(post.userId===userObject.id){
                if(post.product===true){
                    return <section className="imgPost" key={post.id}>
                        <div className="titleContainer">
                        <h3 className="titleStyle">{post.title}</h3>
                        </div>
                        <img src={post.imgURL} className="profileImgPost__img" />
                        <p>
                            {post.textContent}
                        </p>
                        <div className="btnContainer">
                            <div className="btn_edit">
                            <Link to={`/profile/edit/product/${post.id}`} className="link_styles">edit</Link> 
                            </div>
                            <div className="btn_delete"> 
                            <Link to="" onClick={ () => {handleDelete(post)}} className="link_styles">delete</Link>
                        </div>
                        </div>
                    </section>
                } else {
                    return <section className="profileTextPost" key={post.id}>
                        <div className="titleContainer">
                        <h3 className="titleStyle">{post.title}</h3>
                        </div>
                            <p>{post.textContent}</p>
                            <div className="btnContainer">
                            <div className="btn_edit">
                            <Link to={`/profile/edit/post/${post.id}`} className="link_styles">edit</Link> 
                            </div>
                            <div className="btn_delete">
                            <Link to="" onClick={ () => {handleDelete(post)}} className="link_styles">delete</Link>
                            </div>
                        </div>
                    </section>
                }
            }
        }
        ).reverse()
    }
</div>
<div className="sideProfile">
    <div className="sideProfile__info">
{
    users.map(
        (user)=>{
            if(user.id === userObject.id)
            return <>
            <div key={user.id}><img src={user.profilePic} className="sideProfile__img"/></div>
            <div>
            <section className="sideProfile__name" key={user.id}><h2>{user.name}</h2></section>
            <section className="sideProfile__name"><h3>@{user.username}</h3></section>
            <section className="sideProfile__name"><h5>{user.bio}</h5></section>
            </div>
            <Link to='/profile/edit' className="link_styles"><h5>edit</h5></Link>
            </>
        }
    )
}
</div>
<div><Link to='/profile/bookmarks' className="sideProfile__bkm__btn"><h5>my bookmarks</h5></Link></div>
</div>
</div>
</>
}