import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Contact() {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "YOUR ACCESS KEY");

        const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        });

        const data = await response.json();

        if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        } else {
        console.log("Error", data);
        setResult(data.message);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16 flex-grow bg-gray-200 rounded-lg shadow-md m-5">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">Contact Us</h1>
            <form className="grid sm:grid-cols-2 gap-4" onSubmit={onSubmit}>
            <div className="flex flex-col sm:w-full">
                <label htmlFor="name" className="text-gray-700 mb-1 block text-sm font-medium">
                Name
                </label>
                <input
                type="text"
                id="name"
                name="name"
                required
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-1"
                />
            </div>
            <div className="flex flex-col sm:w-full">
                <label htmlFor="email" className="text-gray-700 mb-1 block text-sm font-medium">
                Email
                </label>
                <input
                type="email"
                id="email"
                name="email"
                required
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-1"
                />
            </div>
            <div className="flex flex-col sm:col-span-2">
                <label htmlFor="message" className="text-gray-700 mb-1 block text-sm font-medium">
                Message
                </label>
                <textarea
                name="message"
                id="message"
                required
                className="rounded-md border border-gray-300 px-3 py-2 h-24 resize-none focus:outline-none focus:ring-blue-500 focus:ring-1"
                />
            </div>
            <div className="sm:col-span-2 flex justify-center">
                <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                >
                Submit
                </button>
            </div>
            </form>
            <span>{result}</span>
        </main>
        <Footer />
        </div>
    );
}
