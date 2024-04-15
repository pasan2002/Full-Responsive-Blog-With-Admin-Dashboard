import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function Indian() {
    const [posts, setPosts] = useState([]);
    const [showFullContent, setShowFullContent] = useState([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/public");
                const indianPosts = response.data.posts.filter(post => post.language === "Indian");                
                setPosts(indianPosts);
                setShowFullContent(new Array(indianPosts.length).fill(false));
            } catch(error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <section className="container mx-auto px-4 py-8 max-w-2xl flex-grow">
                <h1 className="text-5xl font-bold mb-4">Indian Posts</h1>
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
                                <p className={`text-gray-700 leading-loose ${showFullContent[index] ? '' : 'truncate'}`} 
                                    dangerouslySetInnerHTML={{ __html: showFullContent[index] ? post.description : `${post.description.substring(0, 30)}${post.description.length > 30 ? '...' : ''}` }} />
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
