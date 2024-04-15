import React, {useEffect} from "react";
import axios from "axios"
import {Navigate, useNavigate} from "react-router-dom"
import { MdCreateNewFolder } from "react-icons/md"
import { IoLogOut } from "react-icons/io5"
import Header from "./Header";
import Footer from "./Footer";
import PostCard from "./PostCard"
import CreatePost from "./CreatePost";
import EditPosts from "./EditPosts";
import Members from "./Members";


export default function AdminBoard() {
    const [posts, setPosts] = React.useState([])
    const [showCreatePost, setShowCreatePost] = React.useState(false)
    const [editingPost, setEditingPost] = React.useState(null)
    const [memberEditor, setMembersEditor] = React.useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");

        const getAllPost = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/posts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        withCredentials: true
                    },
                    credentials: "include"
                });
                setPosts(response.data.posts);
            } catch (error) {
                console.log("Error fetching posts:", error);
            }
        };

        if (token) {
            getAllPost();
        } else {
            navigate("/adminlogin", { replace: true });
        }
    }, [navigate])

    const handleEdit = (post) => {
        setEditingPost(post)
    }
    
    const handleLogoutOnClose = (post) => {
        localStorage.removeItem("jwtToken")
    }
    
    window.addEventListener("beforeunload", handleLogoutOnClose)
    
    if(!localStorage.getItem("jwtToken")){
        return <Navigate to="/adminlogin" replace/>
    }
    
    const handleOnClick = () => {
        localStorage.removeItem("jwtToken")
        window.location.href = "/adminlogin"
    }

    const toggleCreatePost = () => {
        setShowCreatePost(!showCreatePost)
    }

    const toggleMembersEditor = () => {
        setMembersEditor(!memberEditor)
    }

    return (
        <section className="bg-orange-700">
            <Header />
            <h1 className="text-center mt-3 text-4xl font-bold mb-3 md:mb-4">DASHBOARD</h1>
            <div className=" w-[80%] m-auto p-[20px] bg-blue-200 rounded-lg mb-5 shadow-2xl">
                <div className="flex justify-between">
                    <button className="flex items-center gap-1 hover:text-red-600 font-bold" onClick={handleOnClick}>LogOut <IoLogOut/></button>
                    <button className="font-bold hover:text-green-600" onClick={toggleMembersEditor}>Edit Members</button>
                </div>
                <h1 className="text-center font-bold text-3xl">All Posts</h1>
                <div>
                    <ul className="flex flex-col md:flex-row">
                            {posts.length > 0 &&
                                posts.map((post) => (
                                    <PostCard key={post._id} post={post} handleEdit={handleEdit}/>
                                ))}
                    </ul>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white 
                        font-bold py-2 px-4 rounded flex items-center gap-3"
                        onClick={toggleCreatePost}
                        >
                        Create Post
                        <MdCreateNewFolder/>
                    </button>
                </div>
            </div>
            {showCreatePost && <CreatePost hideCreatePost = {toggleCreatePost}/>}
            {editingPost && <EditPosts post={editingPost} hideEditPost={() => setEditingPost(null)} />}
            {memberEditor && <Members hideCreateMembers = {toggleMembersEditor}/>}
            <Footer />
        </section>
    );
}
