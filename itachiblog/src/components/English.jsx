import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer"
import { Link } from "react-router-dom";
import axios from "axios";

export default function English() {
    const [posts, setPosts] = useState([]);
    const [showFullContent, setShowFullContent] = useState([]);
    const [maxDescriptionLength, setMaxDescriptionLength] = useState(30);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/public");
                const englishPosts = response.data.posts.filter(post => post.language === "English");
                setPosts(englishPosts);
                setShowFullContent(new Array(englishPosts.length).fill(false));
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1024) {
                setMaxDescriptionLength(100);
            } else {
                setMaxDescriptionLength(30);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <section id="posts" className="container mx-auto px-4 py-8 max-w-2xl flex-grow">
                <h1 className="text-5xl font-bold mb-4">English Posts</h1>
                <ul className="list-none space-y-8">
                    {posts.map((post, index) => (
                        <li key={post._id} className="flex items-center border-b border-gray-200 pb-4">
                            <img
                                src={`${post.imageSrc}`}
                                className="w-48 h-48 rounded-lg mr-4 object-cover"
                                alt={post.title}
                            />
                            <div className="flex-grow">
                                <h1 className="text-xl font-bold mb-2">{post.title}</h1>
                                <p className={`text-gray-700 leading-loose ${showFullContent[index] ? '' : 'truncate'}`} dangerouslySetInnerHTML={{ __html: showFullContent[index] ? post.description : `${post.description.substring(0, maxDescriptionLength)}${post.description.length > maxDescriptionLength ? '...' : ''}` }} ></p>
                                {showFullContent[index] && (
                                    <div>
                                        <h2 className="text-gray-500 font-italic mt-4 text-lg font-bold">
                                            Author: {post.author}
                                        </h2>
                                    </div>
                                )}
                                {!showFullContent[index] && (
                                    <Link to={`/post/${post.linktitle}`} className="text-blue-600 hover:text-blue-900">
                                        See More...
                                    </Link>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <Footer />
        </div>
    );
}
