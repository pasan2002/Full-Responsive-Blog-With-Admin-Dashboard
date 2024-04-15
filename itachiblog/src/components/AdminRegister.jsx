import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios"

export default function AdminRegister(){
    const [registerFormData, setRegisterFormData] = React.useState({
        name:"",
        email:"",
        password:"",
    })

    const[error, setError] = React.useState(null)
    const[success, setSuccess] = React.useState(null)

    const handleRegisterFormChange = (e) => {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:3000/api/v1/auth/register", registerFormData)
            console.log(response.data);
            setSuccess("User successfully registered!")
        }catch(error){
            if (error.response && error.response.status){
                if(error.response.status === 400){
                    setError("Invalid data provided. Please check your inputs")
                }else if(error.response.status === 403){
                    setError("Maximum user limit reached")
                }else{
                    setError("An error occured. Please try again later.")
                }
            }else{
                console.error(error)
            }
        }
    }
    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className=" text-center m-5 font-bold text-4xl">
                <h1>Register User</h1>
            </div>
            <section className="mx-auto w-full md:w-[700px] px-8 py-16 bg-gray-200 rounded-lg shadow-md m-5 flex flex-grow flex-col">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    {error && <p className="text-red-600 font-bold mb-1 text-center text-lg">{error}</p>}
                    {success && <p className="text-green-600 font-bold mb-1 text-center text-lg">{success}</p>}
                    <label htmlFor="name" className="text-gray-700 mb-1 block text-sm font-medium">Name</label>
                    <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    value={registerFormData.name}
                    onChange={handleRegisterFormChange}
                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-1"
                    />
                    <label htmlFor="email" className="text-gray-700 mb-1 block text-sm font-medium">Email</label>
                    <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    value={registerFormData.email}
                    onChange={handleRegisterFormChange}
                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-1"
                    />
                    <label htmlFor="password" className="text-gray-700 mb-1 block text-sm font-medium">Password</label>
                    <input 
                    type="password" 
                    id="password"
                    name="password"
                    required
                    value={registerFormData.password}
                    onChange={handleRegisterFormChange}
                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-1"
                    />
                    <div className="flex justify-center items-center flex-col">
                        <button type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 
                        focus:ring-blue-700 mt-4 mb-1"
                        >
                            Register User
                        </button>
                        <div>
                            <p>
                                If you already an admin {''}
                                <Link to="/adminlogin" className="text-blue-500 hover:text-blue-700">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </section>
            <Footer />
        </div>
    )
}
