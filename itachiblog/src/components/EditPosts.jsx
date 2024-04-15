import React from "react";
import axios from "axios";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { MdDelete } from "react-icons/md"
import { FaWindowClose } from "react-icons/fa";

export default function EditPosts({ post, hideEditPost}){
    const [imageSrc, setImageSrc] = React.useState(null)
    const [postData, setPostData] = React.useState({
        title: post.title || "",
        description: post.description || "",
        author: post.author || "",
        language: post.language || "",
        linktitle: post.linktitle || "",
        image: null
    })
    const [successMessage, setSuccessMessage] = React.useState("")
    const [notSuccessMessage, setNotSuccessMessage] = React.useState("")

    React.useEffect(() => {
        if(post.imageSrc){
            setImageSrc(post.imageSrc)
        }
    }, [post])

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if(file){
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageSrc(reader.result)
            }
            reader.readAsDataURL(file)
            setPostData({
                ...postData,
                image: file,
            });
        }
    }

    const handleDeleteImage = () => {
        setImageSrc(null)
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        try{
            const formData = new FormData();
            formData.append("description", postData.description);
            formData.append("title", postData.title);
            formData.append("author", postData.author);
            formData.append("language", postData.language);
            formData.append("linktitle", postData.linktitle);
            if (postData.image) {
                formData.append("image", postData.image);
            }

            const token = localStorage.getItem("jwtToken");
            const response = await axios.patch(
                `http://localhost:3000/api/v1/posts/${post._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            )

            console.log("Response from backend:", response.data);

            if (response.data.post && response.data.post.imageSrc){
                setImageSrc(response.data.post.imageSrc)
                console.log("New image source:", response.data.post.imageSrc)
            }

            console.log("Project updated successfully:", response.data);
            setSuccessMessage("Post Updated Successfully.")
        } catch(error){
            console.error("Error updating post:", error)
            setNotSuccessMessage("Error Updating Post. Please try again.")
        }
    }

    const handleDescriptionChange = (value) => {
        setPostData({
            ...postData,
            description: value,
        });
    };

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    }

    const handleClose = () => {
        hideEditPost()
    }

    return(
        <div id="editpost" 
            className="w-[80%] m-auto rounded-xl mt-8 mb-3 bg-blue-200 p-5"
        >
            <FaWindowClose onClick={handleClose} className="hover:text-red-600 m-3"/>
            <h1 className="text-center font-bold text-3xl mt-5">Edit Post</h1>
            {successMessage && <div className="text-green-500 text-center font-bold text-5xl">{successMessage}</div>}
            {notSuccessMessage && <div className="text-red-600 text-center font-bold text-5xl">{notSuccessMessage}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="title" className="font-bold text-xl m-3">Title : </label>
                <input 
                    type="text" 
                    id="title"
                    name="title"
                    value={postData.title}
                    onChange={handleChange}
                    className="border-solid focus:outline-none rounded-md m-3"
                    required
                />
                <label htmlFor="description" className="font-bold text-xl m-3">Description : </label>
                <ReactQuill
                    theme="snow"
                    value={postData.description}
                    onChange={handleDescriptionChange}
                    className="m-3"
                    required
                />
                <label htmlFor="author" className="font-bold text-xl m-3">Author : </label>
                <input 
                    type="text"
                    id="author"
                    name="author"
                    value={postData.author}
                    onChange={handleChange}
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
                            onChange={handleChange}
                            className="m-3"
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
                            onChange={handleChange}
                            className="m-3"
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
                            onChange={handleChange}
                            className="m-3"
                        />
                        <label htmlFor="anime">Anime</label>
                    </div>
                </div>
                <label htmlFor="linktitle" className="font-bold text-xl m-3">Link Title : </label>
                <input 
                    type="text" 
                    id="linktitle"
                    name="linktitle"
                    value={postData.linktitle}
                    onChange={handleChange}
                    className="border-solid focus:outline-none rounded-md m-3"
                    required
                />
                <div className="flex flex-col items-center justify-center md:flex-row">
                    {imageSrc && <img src={imageSrc} alt="Post Image Preview" className=" m-7 w-[300px] h-[300px] flex-shrink-0 m-3"/>}
                    <div>
                        {imageSrc && <MdDelete onClick={handleDeleteImage} className="w-7 h-7 hover:text-red-600 mt-1"/>}
                    </div>
                </div>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="m-3"
                />

                <div className="flex justify-center items-center">
                    <button type="submit" className="bg-blue-500 
                    hover:bg-blue-600 text-white 
                    font-bold py-2 px-4 rounded flex items-center gap-3 mb-4"
                    >
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    )
}
