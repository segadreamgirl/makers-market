import "./discover.css"
import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"

export const ProductCarousel = () => {
    const [bookmarks, setBookmarks] = useState([])
    const [nextButton, nextButtonPressed]=useState(false)
    const [prevButton, prevButtonPressed]=useState(false)
    let [currentBookmark, setCurrentBookmark]= useState(1)

    useEffect(
        () => {
            fetch(`http://localhost:8088/productBookmarkCount?_expand=post`)
                .then(response => response.json())
                .then((data) => {
                    setBookmarks(data)
                })
        },
        []
    )

    useEffect(
        () => {
            if(nextButton===true){
                console.log("hello!")
                nextButtonPressed(false)
                if(currentBookmark!==bookmarks.length){
                setCurrentBookmark(currentBookmark +1)
                }else{
                    setCurrentBookmark(1)
                }
                console.log(currentBookmark)
            }
        },
        [nextButton]
    )

    useEffect(
        () => {
            if(prevButton===true){
                console.log("goodbye!")
                prevButtonPressed(false)
                console.log(currentBookmark)
            if(currentBookmark===1){
                setCurrentBookmark(bookmarks.length)
            }else{
                setCurrentBookmark(currentBookmark -1)
            }
            }
        },
        [prevButton]
    )



    const carousel = () => {

        return <>
        <div className="carousel">
        {
                    bookmarks.map(
                        (bookmark) => {
                            if (bookmark.id===currentBookmark){
                            return <div key={bookmark.id} className="carousel__item carousel__item--visible">
                                <section className="post__content_product">
                                    <h2 className="titleStyle"><Link className="link_styles" to={`/post/${bookmark?.post?.id}`}>{bookmark?.post?.title}</Link></h2>
                                <img src={bookmark?.post?.imgURL} />
                                <p>{bookmark?.post?.textContent}</p>
                                </section>
                            </div>} else {
                                return <div key={bookmark.id} className="carousel__item">
                                    <img src={bookmark?.post?.imgURL} />
                                    </div>
                            }
                        }
                    )
                }
            <div className="carousel__actions_product">
            <button id="carousel__button--prev" aria-label="previous slide"
            onClick={()=>prevButtonPressed(true)}>{"<"}</button>
            <button id="carousel__button--next" aria-label="next slide"
            onClick={()=>nextButtonPressed(true)}>{">"}</button>
            </div>
        </div>
        </>
    }



    return <>
        {
            carousel()
        }
    </>
}