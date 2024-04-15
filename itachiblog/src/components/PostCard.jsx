import React from "react";
import axios from "axios";
import { MdEditNote } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const PostCard = ({ post, handleEdit }) => {
    const deletePost = async (_id) => {
        try {
        const token = localStorage.getItem("jwtToken");
        await axios.delete(`http://localhost:3000/api/v1/posts/${_id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            withCredentials: true,
            },
            credentials: "include",
        });
        console.log("Post Deleted: ", _id);
        } catch (error) {
        console.error("Error deleting post:", error);
        }
    };

    const handleDelete = (_id) => {
        deletePost(_id);
    };

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
        } else {
        return text;
        }
    };

    return (
        <div
        className={`bg-white rounded-lg shadow-md p-4 m-2 text-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 hover:scale-105 transition duration-300 ease-in-out`}
        >
        <h2 className="text-lg font-semibold">{post.title}</h2>
        <p
            className="text-gray-500"
            dangerouslySetInnerHTML={{ __html: truncateDescription(post.description, 100) }}
        />
        <img
            src={post.imageSrc}
            alt={post.title}
            className="mt-2 rounded-md w-full max-h-[200px] object-cover"
        />
        <div className="mt-2 text-sm text-gray-500 flex flex-col lg:flex-row justify-between">
            <p>Author: {post.author}</p>
            <p className="mt-2 lg:mt-0">Language: {post.language}</p>
        </div>
        <div className="flex justify-between mt-5">
            <MdEditNote
            className="hover:scale-150 transition duration-300 ease-in-out"
            onClick={() => handleEdit(post)}
            />
            <AiFillDelete
            className="hover:scale-150 transition duration-300 ease-in-out"
            onClick={() => handleDelete(post._id)}
            />
        </div>
        </div>
    );
};

export default PostCard;
