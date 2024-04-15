import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 

export default function BlogCard() {
    const [posts, setPosts] = useState([]);
    const [showFullContent, setShowFullContent] = useState([]);
    const [maxDescriptionLength, setMaxDescriptionLength] = useState(30);
    const [maxTitleLength, setMaxTitleLength] = useState(30);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/public");
                setPosts(response.data.posts);
                setShowFullContent(new Array(response.data.posts.length).fill(false)); 
            } catch(error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            console.log("Resizing...");
            const screenWidth = window.innerWidth;
            console.log("Screen width:", screenWidth);
            if (screenWidth >= 768) {
                console.log("Setting maxDescriptionLength to 100");
                setMaxDescriptionLength(100);
                setMaxTitleLength(100);
            } else {
                console.log("Setting maxDescriptionLength to 30");
                setMaxDescriptionLength(30);
                setMaxTitleLength(30);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section id="posts" className="container mx-auto px-4 py-8 max-w-xl">
            <h1 className="text-5xl font-bold mb-4">All Posts</h1>
            <ul className="list-none space-y-8">
                {posts.map((post, index) => (
                <li key={post._id} className="flex flex-col md:flex-row items-start border-b border-gray-200 pb-4">
                    <img
                        src={`${post.imageSrc}`}
                        className="w-full md:w-40 h-40 rounded-lg mb-4 md:mb-0 md:mr-4 object-cover"
                        alt={post.title}
                    />
                    <div className="flex-grow">
                        <h1 className="text-xl font-bold mb-2 truncate" title={post.title}>{post.title.length > maxTitleLength ? `${post.title.substring(0, maxTitleLength)}...` : post.title}</h1>
                        <p className={`text-gray-700 leading-loose ${showFullContent[index] ? '' : 'truncate'}`} 
                        dangerouslySetInnerHTML={{ __html: showFullContent[index] ? post.description : `${post.description.substring(0, maxDescriptionLength)}${post.description.length > maxDescriptionLength ? '...' : ''}` }} />
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
    );
}
