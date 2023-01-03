import "./dm.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const DirectMessage = () => {
    const [users, setUsers] = useState([])
    const [allMessages, setAllMessages] = useState([])
    const [currentUser, setCurrentUser] = useState(0)
    const [sendButton, sendButtonPressed] = useState(false)

    const makersUser = localStorage.getItem("makers_user")
    const userObject = JSON.parse(makersUser)

    const [messageToSend, update] = useState({
        senderId: 0,
        recipientId: 0,
        textContent: ""
    })

    const handleSend = (event) => {
        event.preventDefault()

        //what gets sent to the "API" thing
        const messageToSendToAPI = {
            senderId: userObject.id,
            recieverId: currentUser,
            textContent: messageToSend.textContent
        }

        //fetch call uses POST method to send postToSendToAPI to... the API...
        return fetch(`http://localhost:8088/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageToSendToAPI)
        }).then(response => response.json())
        .then(()=>{
            sendButtonPressed()
            const textarea = document.getElementById('textContent')
            textarea.value=''
        })
    }


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

    useEffect(
        () => {
            fetch(`http://localhost:8088/messages`)
                .then(response => response.json())
                .then((data) => {
                    setAllMessages(data)
                })
        },
        [currentUser]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/messages`)
                .then(response => response.json())
                .then((data) => {
                    setAllMessages(data)
                })
        },
        [sendButton]
    )

    const filterMessages = () => {
        return allMessages.filter(message => message.senderId === userObject.id || message.recieverId === userObject.id)
    }

    const myMessages = filterMessages()

    const findUserInfo = () => {
        return users.map(
            (user) => {
                if (user.id !== userObject.id) {
                    return <>
                        <div key={user.id} className="messaging__user--box" onClick={() => setCurrentUser(user.id)}>
                            <img className="messaging__user--img" src={user.profilePic} />
                            <h5 className="messaging__user--username">@{user.username}</h5>
                        </div>
                    </>
                }
            }
        )
    }

    const findMyMessages = () => {
        return users.map(
            (user) => {
                for (const message of myMessages) {
                    if (message.senderId === currentUser || message.recieverId === currentUser) {
                        if (message.senderId !== userObject.id) {
                            if (message.senderId === user.id || message.recieverId === user.id) {
                                if (userObject.id !== user.id) {
                                    return <>
                                        <div className="messaging_messages--box" key={user.id}>
                                        <Link to={`/profile/${user.id}`}><img src={user.profilePic} className="message--img" /></Link>
                                            <div className="message_textContent">
                                                {
                                                    message.textContent
                                                }
                                            </div>
                                        </div>
                                    </>
                                }
                            }
                        } else if (userObject.id === user.id) {
                            return <>
                                <div className="messaging_messages--box--mine" key={user.id}>
                                    <div className="message_textContent--mine">
                                        {
                                            message.textContent
                                        }
                                    </div>
                                    <Link to={`/profile/${user.id}`}><img src={user.profilePic} className="message--img--mine" /></Link>
                                </div>
                            </>
                        }
                    }
                }
            }
        )
    }

    const placeholder=() =>{
        return <>
        <div className="placeholder">
            <h1>Welcome to your messages!</h1>
            <h3>To start a conversation, choose a user from the list on the left. </h3>
        </div>
        </>
    }


    return <>
        <h1 className="messaging__title"><i>your messages</i></h1>
        <div className="messaging__container">
            <div className="messaging__container--inner">
                <div className="messaging__container--boxes">
                    <div className="messaging_users">
                        {
                            findUserInfo()
                        }
                    </div>
                    <div className="messaging_messages" id='root'>
                        {currentUser>0
                            ?
                            findMyMessages()
                            :
                            placeholder()
                        }
                    </div>
                    <div className="message-form">
                        <textarea
                            rows="2"
                            cols="88"
                            placeholder="Send a message..."
                            className="message_form--style"
                            onChange={
                                (event) => {
                                    const copy = { ...messageToSend }
                                    copy.textContent = event.target.value
                                    update(copy)
                                }
                            } 
                            id='textContent'/>
                        <button
                            className="message_send--btn"
                            onClick={(clickEvent) => handleSend(clickEvent)}>
                            send
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </>
}