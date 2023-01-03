import "./discover.css"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"

export const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
                .then(response => response.json())
                .then((data) => {
                    setUsers(data)
                })
        },
        []
    )


    const list = () => {

        return <>
        <div>
        {
                    users.map(
                        (user) => {
                            return <div key={user.id} className="featuredUser_container">
                                <img src={user.profilePic} className="featuredUser__img"/>

                                <div className="featuredUser_info">
                                <div>
                                    <p className="titleStyle">
                                     <Link className="link_styles" to={`/profile/${user.id}`}><h2>@{user.username}</h2></Link>
                                     </p>
                                </div>
                                <div><p>{user.bio}</p></div>
                                </div>
                            </div>
                        }
                    )
                }
        </div>
        </>
    }



    return <>
        {
            list()
        }
    </>
}