import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import "./post.css"

export const Post = () => {
    const {postId} = useParams()
    const [post, setPost] = useState({})
    const [bookmarks, setBookmarks]= useState([])

    const makersUser = localStorage.getItem("makers_user")
    const userObject = JSON.parse(makersUser)

    const [unbookmark, unbookmarked] = useState()

useEffect(
    ()=>{
        fetch(`http://localhost:8088/posts/${postId}?_expand=user`)
        .then(response => response.json())
        .then((data) =>{
            setPost(data)
        })
    },
    [postId]
)

useEffect(
    ()=>{
        fetch(`http://localhost:8088/bookmarks?postId=${postId}`)
        .then(response => response.json())
        .then((data) =>{
            setBookmarks(data)
        })
    },
    []
)

useEffect (
    () =>{
        fetch(`http://localhost:8088/bookmarks?postId=${postId}`)
            .then(response => response.json())
            .then((data)=>{
                setBookmarks(data)
        })
    },
    [unbookmark]
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

const linkToProfile = () =>{
    if(post?.user?.id===userObject.id){
        return <><Link to={`/profile`} className="link_styles">@{post?.user?.username}</Link></>
    } else{
        return<><Link to={`/profile/${post?.user?.id}`} className="link_styles">@{post?.user?.username}</Link></>
    }
}

const handleBookmark = (event) => {
    event.preventDefault()

    //what gets sent to the API
    const infoToSendToApi ={
        postId: postId,
        userLikedId: userObject.id
    }

    //fetch call uses POST method to send postToSendToAPI to... the API...
    return fetch(`http://localhost:8088/bookmarks`,{
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(infoToSendToApi)
    })
    .then(() =>
    unbookmarked(false)
    )
}

const handleUnbookmark = (bookmarkObject) => {
    fetch(`http://localhost:8088/bookmarks/${bookmarkObject.id}`,{
        method: "DELETE"})
        .then(()=>{
            unbookmarked(true)
        })
}


const postFooter=()=> {

    const bookmarkVerify = bookmarks.filter((bookmark)=>bookmark.userLikedId===userObject.id)

        if(bookmarkVerify[0]){
            return <>
            <div className="postFooter">
                {bookmarks.length} people have bookmarked this post, including you.
                <div className="postFooter__bkm__btn"
                onClick={ () => {handleUnbookmark(bookmarkVerify[0])}}>
                    <Link to="" className="link_styles"><b>unbookmark this?</b></Link>
                </div>
            </div>
            </>
        } else {
            return <>
            <div className="postFooter">
                {bookmarks.length} people have bookmarked this post.
                <div className="postFooter__bkm__btn"
                onClick={ (clickEvent) => {handleBookmark(clickEvent)}}>
                    <Link to="" className="link_styles"><b>bookmark this?</b></Link>
                </div>
            </div>
            </>
        }
    }

return <>
<div className="post__container">
    <div className="post__username">
        <h5 className="post__postedBy">POSTED BY</h5>
        <img src={post?.user?.profilePic} className="profilePic"/>
        <h5>{linkToProfile()}</h5>
    </div>
    <div className="post__content">
        <h1 className="titleStyle">{post.title}</h1>
        {
            postDisplay()
        }
    </div>
    {
        postFooter()
    }
</div>
    </>
}