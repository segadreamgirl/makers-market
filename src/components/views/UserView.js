import { Outlet, Route, Routes } from "react-router-dom"
import { Discover } from "../discover/discover"
import { Post } from "../posts/post"
import { PostFeed } from "../posts/postFeed"
import { PostForm } from "../posts/postForm"
import { EditPost } from "../profile/editPost"
import { EditProduct } from "../profile/editProduct"
import { ProfileEdit } from "../profile/editProfileForm"
import { ForeignProfile } from "../profile/foreignProfile"
import { MyBookmarks } from "../profile/myBookmarks"
import { ProfileView } from "../profile/profileView"

export const UserView = () => {
    return (
        <Routes>
                <Route path="/" element={ <PostFeed />}/>
                <Route path="home" element={ <PostFeed />}/>
                <Route path="create-post" element={ <PostForm/> }/>
                <Route path="profile" element={ < ProfileView />}/>
                <Route path="profile/edit/product/:postId" element={ < EditProduct/> } />
                <Route path="profile/edit/post/:postId" element={ < EditPost /> } />
                <Route path="profile/edit" element={ < ProfileEdit /> } />
                <Route path="post/:postId" element={ < Post /> } />
                <Route path="profile/:userId" element={ < ForeignProfile /> } />
                <Route path="profile/bookmarks" element={< MyBookmarks />} />
                <Route path="discover" element={< Discover />} />
        </Routes>
    )


}