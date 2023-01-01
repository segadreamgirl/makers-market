import "./discover.css"
import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"

export const PostList = () => {
    const [bookmarks, setBookmarks] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/textBookmarkCount?_expand=post`)
                .then(response => response.json())
                .then((data) => {
                    setBookmarks(data)
                })
        },
        []
    )



    const list = () => {

        return <>
        <div>
        {
                    bookmarks.map(
                        (bookmark) => {
                            return <div key={bookmark.id} className="post__container">
                                <section className="post__content">
                                    <h2 className="titleStyle"><Link className="link_styles" to={`/post/${bookmark?.post?.id}`}>{bookmark?.post?.title}</Link></h2>
                                <p>{bookmark?.post?.textContent}</p>
                                </section>
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