import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./postForm.css"

export const ProductForm = () => {
    //deconsturction of useState looks at the posts table in makers-API
    const [post, update] = useState({
        title:"",
        imgURL:"",
        textContent:"",
        product:true,
        tagId:1,
    })

     //observing state of postTags table + saving it to local variable 'tags' using useState() and useEffect()
     const [tags, setTags] = useState([])

     useEffect(
         () => {
             fetch(`http://localhost:8088/postTags`)
                 .then(response => response.json())
                 .then((tagsArray) => {
                     setTags(tagsArray)
                 })
         },
         []
     )

    //useNavigate will redirect to postFeed post-posting (haha)
    const navigate = useNavigate()

    //will need for the userId part of the whole "api" thing lol
    const localUser = localStorage.getItem("makers_user")
    const UserObject = JSON.parse(localUser)

//function (within a function) that will send the new post to the posts table
const handlePost = (event) => {
    event.preventDefault()

    //what gets sent to the "API" thing
    const postToSendToAPI ={
        userId: UserObject.id,
        title: post.title,
        imgURL: post.imgURL,
        textContent: post.textContent,
        product: true,
        tagId: post.tagId,
        likes: 0
    }

    //fetch call uses POST method to send postToSendToAPI to... the API...
    return fetch(`http://localhost:8088/posts`,{
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(postToSendToAPI)
    })
    .then(response => response.json())
    .then(()=>{
        navigate("/home")
    })
}

return <>
<div className="formContainer">
<form className="postForm">
<fieldset>
    <div className="form-group">
        <label htmlFor="Title">Title:</label>
        <input
            required autoFocus
            type="text"
            className="form-control"
            placeholder="What's your product called?"
            value={post.title}
            onChange={
                (event)=>{
                    const copy = {...post}
                    copy.title = event.target.value
                    update(copy)
                }
            } />
    </div>
</fieldset>
<fieldset>
    <div className="form-group">
        <label htmlFor="textContent">Description:</label>
        <input
        required autoFocus 
        type="text"
        className="form-control"
        placeholder="Give a brief description of your product"
        value={post.textContent}
            onChange={
                (event) =>{
                    const copy= {...post}
                    copy.textContent = event.target.value
                    update(copy)
                }
            } />
    </div>
</fieldset>
<fieldset>
    <div className="form-group">
        <label htmlFor="imgURL">Image URL:</label>
        <input
            required autoFocus
            type="text"
            className="form-control"
            placeholder="paste a url for a picture of your product"
            value={post.imgURL}
            onChange={
                (event)=>{
                    const copy = {...post}
                    copy.imgURL = event.target.value
                    update(copy)
                }
            } />
    </div>
</fieldset>
<fieldset>
    <div className="form-group">
        <label htmlFor="tagId">Select a Tag:</label><br />
        <select value={post.tagId}
        onChange={
            (event)=>{
                const copy = {...post}
                copy.tagId = event.target.value
                update(copy)
            }
        }>
        <option key="default">Select one..</option>
        { tags.map(
            (tag) => {
                if(tag.label==="product"){
                    return <option key={tag.id} value={tag.id}>{tag.tag}</option>
                }
            }
        ) }
        </select>
    </div>
</fieldset>
<button 
onClick={(clickEvent) => handlePost(clickEvent)}
className="postButton">
    <Link className="link_styles"><h3>Post</h3></Link>
</button>
</form> 
</div>
</>
}