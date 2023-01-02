import "./discover.css"
import { ProductCarousel } from "./productCarousel"
import { PostList } from "./postList"
import { UserList } from "./userList"


export const Discover = () => {



    return <>
    <div className="pageContainer">
    <div className="disc__heads">
        <h1>trending products</h1>
        <h1>trending users</h1>
        <h1>trending posts</h1>
    </div>
    <div className="discovers__container">
    < ProductCarousel />
    < UserList />
    < PostList />
    </div>
    </div>
    </>
}