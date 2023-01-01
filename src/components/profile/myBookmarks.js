import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./profile.css"

export const MyBookmarks = () => {
    const [users, setUsers] = useState([])
    const [bookmarks, setBookmarks] = useState([])

    const makersUser = localStorage.getItem("makers_user")
    const userObject = JSON.parse(makersUser)

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
        fetch(`http://localhost:8088/bookmarks?_expand=post&&userLikedId=${userObject.id}`)
            .then(response => response.json())
            .then((data)=>{
                setBookmarks(data)
        })
    },
    []
)

const userInfo = () =>     {
    return users.map(
        (user)=>{
            if(user.id === userObject.id)
            return <>
            <div><img src={user.profilePic} className="sideProfile__img"/></div>
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

const bookmarkDisplay = () =>{
    return bookmarks.map(
        (bookmark) => {
            if(bookmark?.post?.product===true){
                return <section className="imgPost" key={bookmark?.post?.id}>
                    <div className="titleContainer">
                    <h3 className="titleStyle"><Link to={`/post/${bookmark?.post?.id}`} className="link_styles">{bookmark?.post?.title}</Link></h3>
                    </div>
                    <img src={bookmark?.post?.imgURL} className="profileImgPost__img" />
                    <p>
                        {bookmark?.post?.textContent}
                    </p>
                </section>
            } else {
                return <section className="profileTextPost" key={bookmark?.post?.id}>
                    <div className="titleContainer">
                    <h3 className="titleStyle"><Link to={`/post/${bookmark?.post?.id}`} className="link_styles">{bookmark?.post?.title}</Link></h3>
                    </div>
                        {bookmark?.post?.textContent}
                </section>
            }
    }
    ).reverse()
}

return <>
    <div className="bkm__title"><h1>YOUR BOOKMARKS</h1></div>
    <div className="profileContainer">
    <div className="profilePostFeed">
    {
        bookmarkDisplay()
    }
</div>

    <div className="sideProfile">
    <div className="sideProfile__info">
    {
        userInfo()
    }
</div>
</div>
</div>
</>
}
