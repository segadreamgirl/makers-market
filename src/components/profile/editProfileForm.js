import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./editProfile.css"

export const ProfileEdit = () => {
const [users, setUsers] = useState([])
const [profileToBeEdited, setProfile] = useState([])
//const profileToBeEdited = users.filter(user => user.id===userObject.id)

const makersUser = localStorage.getItem("makers_user")
const userObject = JSON.parse(makersUser)

const navigate = useNavigate()

useEffect (
    () =>{
        fetch(`http://localhost:8088/users/${userObject.id}`)
            .then(response => response.json())
            .then((user)=>{
                setProfile(user)
        })
    },
    []
)

const handleUpdate = (event) => {
    event.preventDefault()

    return fetch(`http://localhost:8088/users/${profileToBeEdited.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profileToBeEdited)
    })
        .then(response => response.json())
        .then(() => {
            navigate("/profile")
        })
}

return <>
    <div className="profileEdit__container">
        <h1 className="profileEdit__title">Edit Profile</h1>
        <div className="editFormContainer">
    <form className="profileForm">
    <fieldset>
        <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
                required autoFocus
                type="text"
                defaultValue={profileToBeEdited.name}
                onChange={
                    (event)=>{
                        const copy = {...profileToBeEdited}
                        copy.name = event.target.value
                        setProfile(copy)
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
            required autoFocus 
            type="text"
            defaultValue={profileToBeEdited.username}
                onChange={
                    (event) =>{
                        const copy= {...profileToBeEdited}
                        copy.username = event.target.value
                        setProfile(copy)
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="profilePic">Profile Picture:</label>
            <input
                required autoFocus
                type="text"
                defaultValue={profileToBeEdited.profilePic}
                onChange={
                    (event)=>{
                        const copy = {...profileToBeEdited}
                        copy.profilePic = event.target.value
                        setProfile(copy)
                    }
                } />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <input
                required autoFocus
                type="text"
                defaultValue={profileToBeEdited.bio}
                onChange={
                    (event)=>{
                        const copy = {...profileToBeEdited}
                        copy.bio= event.target.value
                        setProfile(copy)
                    }
                } />
        </div>
    </fieldset>

    <button 
    onClick={(clickEvent) => handleUpdate(clickEvent)}
    className="save">
         <Link className="link_styles">   <h3>Save</h3>    </Link>
    </button>

    </form> 
    </div>
        </div>
        <div className="sideProfile">
        <div className="sideProfile__title"><h2>Current Settings</h2></div>
{
        <>
        <div className="sideProfile__info">
            <div><img src={profileToBeEdited.profilePic} className="sideProfile__img"/></div>
            <div>
            <section className="sideProfile__name" key={profileToBeEdited.id}><h2>{profileToBeEdited.name}</h2></section>
            <section className="sideProfile__name"><h3>@{profileToBeEdited.username}</h3></section>
            <section className="sideProfile__name"><h5>{profileToBeEdited.bio}</h5></section>
            </div>
        </div>
        </>
}
</div>
</>}