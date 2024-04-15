import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = React.useState({
        email: "",
        password: "",
    });

    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);

    const handleLoginFormChange = (e) => {
        setLoginFormData({
        ...loginFormData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post(
            "http://localhost:3000/api/v1/auth/login",
            loginFormData
        );
        console.log(response.data);

        if (response.data.token) {
            localStorage.setItem("jwtToken", response.data.token);
            setSuccess("Login Successful!!!");
            navigate("/admindashboard");
        } else {
            setError("Login failed. Please check your credentials.");
        }
        } catch (error) {
        if (error.response && error.response.status) {
            if (error.response.status === 401) {
            setError("Email or Password is wrong check again");
            } else {
            setError("An error occured. Please try again later.");
            }
        } else {
            console.error(error);
        }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        <div className="text-center m-5 font-bold text-4xl">
            <h1>Login User</h1>
        </div>
        <section
            className={`mx-auto w-full md:w-[700px] px-8 py-16 bg-gray-200 rounded-lg shadow-md m-5 flex flex-grow flex-col gap-4`}
        >
            {error && <p className="text-red-600 font-bold mb-1 text-center text-lg">{error}</p>}
            {success && <p className="text-green-600 font-bold mb-1 text-center text-lg">{success}</p>}
            <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-gray-700 mb-1 block text-sm font-medium">
                Email
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={loginFormData.email}
                onChange={handleLoginFormChange}
                required
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-1"
            />
            <label
                htmlFor="password"
                className="text-gray-700 mb-1 block text-sm font-medium"
            >
                Password
            </label>
            <input
                type="password"
                id="password"
                name="password"
                value={loginFormData.password}
                onChange={handleLoginFormChange}
                required
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-1"
            />
            <div className="flex justify-center items-center flex-col">
                <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 mt-4 mb-1"
                >
                Login User
                </button>
                <div>
                <p>
                    You wanna become an admin{" "}
                    <Link to="/adminregister" className="text-blue-500 hover:text-blue-700">
                    Register
                    </Link>
                </p>
                </div>
            </div>
            </form>
        </section>
        <Footer />
        </div>
    );
}
