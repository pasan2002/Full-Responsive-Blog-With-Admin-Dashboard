import React, { useState } from "react"
import axios from "axios"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { FaWindowClose } from "react-icons/fa"

export default function CreatePost({hideCreatePost}) {
    const [postData, setPostData] = React.useState({
        title: "",
        description: "",
        author: "",
        language: "",
        linktitle: "",
        image: null
    })
    const [successMessage, setSuccessMessage] = React.useState("")
    const [notSuccessMessage, setNotSuccessMessage] = React.useState("")

    const handlePostFormChange = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = (e) => {
        setPostData({
            ...postData,
            image: e.target.files[0]
        })
    }

    const handleDescriptionChange = (value) => {
        setPostData({
            ...postData,
            description: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("jwtToken")

            const formData = new FormData()
            formData.append("image", postData.image)
            formData.append("title", postData.title)
            formData.append("description", postData.description)
            formData.append("author", postData.author)
            formData.append("language", postData.language)
            formData.append("linktitle", postData.linktitle)

            const response = await axios.post("http://localhost:3000/api/v1/posts", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSuccessMessage("Post created successfully.")
            console.log(response.data)
        } catch (error) {
            console.error("Error creating post:", error.response.data)
            setNotSuccessMessage("Error creating post. Please try again.")
        }
    }

    return (
        <div
        id="createpost"
        className="w-[80%] m-auto p-5 rounded-xl mt-8 mb-3 bg-blue-200">
            <FaWindowClose onClick={hideCreatePost} className="hover:text-red-600"/>
            <h1 className="text-center font-bold text-3xl">Create New Post</h1>
            {successMessage && <div className="text-green-500 text-center font-bold text-5xl">{successMessage}</div>}
            {notSuccessMessage && <div className=" text-red-500 text-center font-bold text-5xl">{notSuccessMessage}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="title" className="font-bold text-xl m-3">Enter the Title :</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={postData.title}
                    onChange={handlePostFormChange}
                    className="border-solid focus:outline-none rounded-md m-3"
                    required
                />
                <label htmlFor="description" className="font-bold text-xl m-3">Enter the post description :</label>
                <ReactQuill
                    theme="snow"
                    value={postData.description}
                    onChange={handleDescriptionChange}
                    className="m-3"
                    required
                />
                <label htmlFor="author" className="font-bold text-xl m-3">Name of the author :</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={postData.author}
                    onChange={handlePostFormChange}
                    className="border-solid focus:outline-none rounded-md m-3"
                    required
                />
                <div>
                    <label className="font-bold text-xl m-3">Language :</label>
                    <div>
                        <input
                            type="radio"
                            id="english"
                            name="language"
                            value="English"
                            checked={postData.language === "English"}
                            className="m-3"
                            onChange={handlePostFormChange}
                        />
                        <label htmlFor="english">English</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="indian"
                            name="language"
                            value="Indian"
                            checked={postData.language === "Indian"}
                            className="m-3"
                            onChange={handlePostFormChange}
                        />
                        <label htmlFor="indian">Indian</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="anime"
                            name="language"
                            value="Anime"
                            checked={postData.language === "Anime"}
                            className="m-3"
                            onChange={handlePostFormChange}
                        />
                        <label htmlFor="anime">Anime</label>
                    </div>
                </div>
                <label htmlFor="linktitle" className="font-bold text-xl m-3">Enter title for link :</label>
                <input
                    type="text"
                    id="linktitle"
                    name="linktitle"
                    value={postData.linktitle}
                    onChange={handlePostFormChange}
                    className="border-solid focus:outline-none rounded-md m-3"
                    required
                />
                <label htmlFor="image" className="font-bold text-xl m-3">Upload image :</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="m-3"
                    required
                />
                <div className="flex justify-center items-center">
                    <button type="submit" className="bg-blue-500 
                    hover:bg-blue-600 text-white 
                    font-bold py-2 px-4 rounded flex items-center gap-3"
                    >
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    )
}
