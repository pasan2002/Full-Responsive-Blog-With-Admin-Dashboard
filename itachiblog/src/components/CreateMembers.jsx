import React from "react";
import axios from "axios";
import { FaWindowClose } from "react-icons/fa"

export default function CreateMembers({hideCreateMembers}){
    const [memberData, setMemberData] = React.useState({
        name:"",
        role:"",
        image:null
    })
    const [successMessage, setSuccessMessage] = React.useState("")
    const [notSuccessMessage, setNotSuccessMessage] = React.useState("")

    const handleMembersFormChange = (e) => {
        setMemberData({
            ...memberData,
            [e.target.name] : e.target.value
        })
    }

    const handleImageChange = (e) => {
        setMemberData({
            ...memberData,
            image: e.target.files[0]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("jwtToken");

            const formData = new FormData();
            formData.append("name", memberData.name);
            formData.append("role", memberData.role);
            formData.append("image", memberData.image);

            const response = await axios.post("http://localhost:3000/api/v1/member", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            setSuccessMessage("Member Created Successfully.")
        } catch (error) {
            console.error(error.response.data);
            setNotSuccessMessage("Error Creating Member. Please try again.")
        }
    };
    
    return(
        <div className="w-[80%] m-auto p-5 rounded-xl mt-8 mb-3 bg-blue-200">
            <div className="hover:text-red-600">
                <button onClick={hideCreateMembers} className="text-xl p-1">
                    <FaWindowClose />
                </button>
            </div>
            <h1 className="text-3xl text-center font-bold">New Member</h1>
            {successMessage && <div className="text-green-500 text-center font-bold text-5xl">{successMessage}</div>}
            {notSuccessMessage && <div className=" text-red-500 text-center font-bold text-5xl">{notSuccessMessage}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="name" className="font-bold text-xl m-3">Name : </label>
                <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={memberData.name}
                    onChange={handleMembersFormChange}
                    className="border-solid focus:outline-none rounded-md m-3"
                    required
                />
                <label htmlFor="role" className="font-bold text-xl m-3">Role : </label>
                <input 
                    type="text" 
                    id="role"
                    name="role"
                    value={memberData.role}
                    onChange={handleMembersFormChange}
                    className="border-solid focus:outline-none rounded-md m-3"
                    required
                />
                <label htmlFor="image" className="font-bold text-xl m-3">Upload Image : </label>
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
                    <button type="submit"
                        className="bg-blue-500 
                        hover:bg-blue-600 text-white 
                        font-bold py-2 px-4 rounded flex items-center gap-3"
                    >
                        Create Member
                    </button>
                </div>
            </form>
        </div>
    )
}
