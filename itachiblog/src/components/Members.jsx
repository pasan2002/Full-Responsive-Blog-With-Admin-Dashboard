import React, { useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { MdCreateNewFolder } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa"
import CreateMembers from "./CreateMembers";
import EditMembers from "./EditMembers";

export default function Members({hideCreateMembers}){
    const [members, setMembers] = React.useState([])
    const [showCreateMember, setShowCreateMember] = React.useState(false)
    const [editingMember, setEditingMember] = React.useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("jwtToken")

        const getAllMembers = async () => {
            try{
                const response = await axios.get("http://localhost:3000/api/v1/member", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials:true
                })
                setMembers(response.data.members)
                console.log(response.data.members)
            }catch(error){
                console.log("Error fetching Members:", error);
            }
        }

        if(token) {
            getAllMembers()
        }else{
            navigate("/adminlogin", { replace: true })
        }
    }, [navigate])

    const deleteMember = async (_id) => {
        try {
            const token = localStorage.getItem("jwtToken");
            await axios.delete(`http://localhost:3000/api/v1/member/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    withCredentials: true,
                },
                credentials: "include",
            });
            console.log("Member Deleted: ", _id);

        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    const handleDelete = (_id) => {
        deleteMember(_id);
    };

    const toggleMembersEditor = () => {
        setShowCreateMember(!showCreateMember)
    }

    const handleEdit = (members) => {
        setEditingMember(members)
    }

    return(
        <section>
            <div className="w-[80%] m-auto p-[20px] bg-blue-200 rounded-lg mb-5 shadow-2xl">
                <FaWindowClose onClick={hideCreateMembers} className="hover:text-red-600"/>
                <h1 className="text-center text-3xl font-bold">Members Editor</h1>
                <div>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {members.map((member) => (
                        <li key={member._id} className="bg-white rounded-lg shadow-md p-4 text-center hover:scale-105 transition duration-300 ease-in-out mx-4 my-8">
                            <h2 className="font-bold text-xl">Name : {member.name}</h2>
                            <div>
                                <img src={member.image} 
                                alt={member.name}
                                className="mt-2 rounded-md w-[100%] max-h-[200px] object-fill"
                                />
                            </div>
                            <h3 className="font-bold m-5">Role: {member.role}</h3>
                            <div className="flex justify-between">
                                <MdEditNote 
                                    className="hover:scale-150 transition duration-300 ease-in-out"
                                    onClick={() => handleEdit(member)}
                                />
                                <AiFillDelete 
                                    className="hover:scale-150 transition duration-300 ease-in-out"
                                    onClick={() => handleDelete(member._id)}
                                />
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white 
                        font-bold py-2 px-4 rounded flex items-center gap-3"
                        onClick={toggleMembersEditor}
                    >
                        Create Member
                        <MdCreateNewFolder/>
                    </button>
                </div>
            </div>
            {showCreateMember && <CreateMembers hideCreateMembers={() => setShowCreateMember(null)} />}
            {editingMember && <EditMembers member={editingMember} hideEditMembers={() => setEditingMember(null)}/>}
        </section>
    )
}
