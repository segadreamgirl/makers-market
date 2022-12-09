import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../posts/postForm.css"

export const EditPost = () =>{
    const {postId} = useParams()
    const [post, updatePost] = useState({
        title:"",
        imgURL:"",
        textContent:"",
        tagId:"",
    })

    const [tags, setTags] = useState([])
    const navigate = useNavigate()

    useEffect(
        ()=>{
            fetch(`http://localhost:8088/posts/${postId}`)
            .then(response => response.json())
            .then((data) =>{
                updatePost(data)
            })
        },
        [postId]
    )

    useEffect(
        ()=>{
            fetch(`http://localhost:8088/postTags`)
            .then(response => response.json())
            .then((data) =>{
                const tagsArray = data
                setTags(tagsArray)
            })
        },
        []
    )

    const handleUpdate = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/profile")
            })
    }


    return  <>
    <div className="formContainer">
    <form className="postForm">
    <fieldset>
        <div className="form-group">
            <label htmlFor="Title">Title:</label>
            <input
                required autoFocus
                type="text"
                defaultValue={post.title}
                onChange={
                    (event)=>{
                        const copy = {...post}
                        copy.title = event.target.value
                        updatePost(copy)
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
            defaultValue={post.textContent}
            style={{
                height: "10rem"
            }}
                onChange={
                    (event) =>{
                        const copy= {...post}
                        copy.textContent = event.target.value
                        updatePost(copy)
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="tagId">Select a Tag:</label><br />
            <select defaultValue={post.tagId}
            onChange={
                (event)=>{
                    const copy = {...post}
                    copy.tagId = event.target.value
                    updatePost(copy)
                }
            }>
            <option key="default">Select one..</option>
            { tags.map(
                (tag) => {
                    if(tag.id>3){
                        return <option key={tag.id} value={tag.id}>{tag.tag}</option>
                    }
                }
            ) }
            </select>
        </div>
    </fieldset>
    <button 
    onClick={(clickEvent) => handleUpdate(clickEvent)}
    className="postButton">
        Post
    </button>
    </form> 
    </div>
    </>
}