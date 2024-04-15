import React from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";

export default function EditMembers({ member, hideEditMembers }) {
    const [image, setImage] = React.useState(null);
    const [memberData, setMemberData] = React.useState({
        name: member.name || "",
        role: member.role || "",
        image: member.image || "",
    });

    const [successMessage, setSuccessMessage] = React.useState("");
    const [notSuccessMessage, setNotSuccessMessage] = React.useState("");

    React.useEffect(() => {
        if (member.image) {
            setImage(member.image);
        }
    }, [member]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            setMemberData({
                ...memberData,
                image: file,
            });
        }
    };

    const handleDeleteImage = () => {
        setImage(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", memberData.name);
            formData.append("role", memberData.role);
            if (memberData.image) {
                formData.append("image", memberData.image);
            }

            const token = localStorage.getItem("jwtToken");
            const response = await axios.patch(
                `http://localhost:3000/api/v1/member/${member._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Response from backend:", response.data);

            if (response.data.member && response.data.member.image) {
                setImage(response.data.member.image);
                console.log("New image source:", response.data.post.image);
            }

            console.log("Member updated successfully:", response.data);
            setSuccessMessage("Member Updated Successfully.");
        } catch (error) {
            console.error("Error updating member:", error);
            setNotSuccessMessage("Error Updating Member. Please try again.");
        }
    };

    const handleChange = (event) => {
        setMemberData({
            ...memberData,
            [event.target.name]: event.target.value,
        });
    };

    const handleClose = () => {
        hideEditMembers();
    };

    return (
        <div className="w-[80%] m-auto rounded-xl mt-8 mb-3 bg-blue-200 p-5">
            <FaWindowClose onClick={handleClose} className="hover:text-red-600 mt-1 cursor-pointer" />
            <h1 className="text-center font-bold text-3xl mt-5">Edit Members</h1>
            {successMessage && <div className="text-green-500 text-center font-bold text-5xl">{successMessage}</div>}
            {notSuccessMessage && <div className=" text-red-500 text-center font-bold text-5xl">{notSuccessMessage}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="name" className="font-bold text-xl m-3">
                    Name :
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={memberData.name}
                    onChange={handleChange}
                    className="border-solid focus:outline-none rounded-md m-3"
                    required
                />
                <label htmlFor="role" className="font-bold text-xl m-3">
                    Role :
                </label>
                <input
                    type="text"
                    id="role"
                    name="role"
                    value={memberData.role}
                    onChange={handleChange}
                    className="border-solid focus:outline-none rounded-md m-3"
                    required
                />
                <div className="flex flex-col items-center justify-center md:flex-row">
                    {image && <img src={image} alt="Member Image Preview" className=" m-7 w-[300px] h-[300px] flex-shrink-0 m-3" />}
                    <div>
                        {image && <MdDelete onClick={handleDeleteImage} className="w-7 h-7 hover:text-red-600 mt-1" />}
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
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white 
                                    font-bold py-2 px-4 rounded flex items-center gap-3 mb-4 mt-2"
                    >
                        Update Member
                    </button>
                </div>
            </form>
        </div>
    );
}
