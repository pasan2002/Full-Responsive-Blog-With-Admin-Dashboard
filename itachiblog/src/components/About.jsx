import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

export default function About() {
    const [members, setMembers] = React.useState([]);

    React.useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/public/publicmembers");
                setMembers(response.data.members);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMembers();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 px-4 py-8 text-center">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">About Us</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Welcome to our blog! We are a team of passionate web developers based in Sri Lanka, dedicated to crafting exceptional digital experiences.
                </p>
                <div className="flex flex-wrap justify-center items-center mb-8">
                    {members.map((member, index) => (
                        <div key={index} className="flex flex-col items-center m-4">
                            <img src={member.image} alt={member.name} className="rounded-full w-32 h-32 m-2" />
                            <div className="text-lg text-gray-800">
                                <strong>{member.name}</strong><br />
                                {member.role}
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-lg text-gray-600 mb-8">
                    Our mission is to create innovative solutions that empower businesses and individuals to thrive in the digital age. With expertise in a wide range of technologies and a commitment to excellence, we strive to deliver outstanding results that exceed expectations.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                    Whether you're looking to build a stunning website, develop a powerful web application, or enhance your online presence, we've got you covered. Let's collaborate and turn your vision into reality!
                </p>
                <button className="mt-5 bg-navbar_color text-white font-bold text-lg p-4 rounded-full hover:bg-hover_color">
                    <a href="/contact">Contact Us</a>
                </button>
            </div>
            <Footer />
        </div>
    );
}
