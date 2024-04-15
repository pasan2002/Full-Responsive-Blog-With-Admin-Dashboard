import React from "react"
import { useParams } from "react-router-dom" 
import Header from "./Header"
import Footer from "./Footer"
import axios from "axios"

export default function FullPost() {
    const { postId } = useParams()
    const [posts, setPosts] = React.useState([])

    const post = posts.find((item) => item.linktitle === postId)

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/public")
                setPosts(response.data.posts)
            }catch(error){
                console.error(error)
            }
        }

        fetchPosts()
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        <section className="container mx-auto px-4 py-8 max-w-2xl flex-grow">
            {post && (
            <>
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <img src={post.imageSrc} className="w-full rounded-lg mb-4" alt={post.title} />
                <p className="text-gray-700" dangerouslySetInnerHTML={{__html:post.description}}></p>
                <p className="text-gray-500 font-italic mt-4">Author: {post.author}</p>
            </>
            )}
        </section>
        <Footer />
        </div>
    )
}
