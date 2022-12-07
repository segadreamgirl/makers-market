import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../nav/NavBar"
import { PostFeed } from "../posts/postFeed"
import { ApplicationViews } from "./ApplicationViews"

export const UserView = () => {
    return (
        <Routes>
            <Route path="/" element={ < PostFeed />
            }>
                <Route path="home" element={ <PostFeed />}/>
            </Route>
        </Routes>
    )


}