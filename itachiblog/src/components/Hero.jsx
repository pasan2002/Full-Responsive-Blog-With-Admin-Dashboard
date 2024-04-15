import React from "react";
import backdropImage from "../assets/Hero/background.jpg"; 

export default function Hero() {
  return (
    <section className="relative flex justify-center items-center h-[500px] bg-cover bg-center">
      <img
        src={backdropImage}
        alt="Cinema"
        className="absolute inset-0 object-cover w-full h-[500px] filter blur-sm" 
      />
      <div className="relative text-container px-4 py-8 max-w-screen-xl mx-auto text-text_color">
        <h1 className="text-5xl font-bold tracking-widest text-zinc-50 mb-4 shadow-lg"> 
          Dive Deep into the World of Cinema
        </h1>
        <p className="text-xl opacity-75 shadow">
          Explore Reviews, Recommendations, and Analyses of your Favorite Films
        </p>
        <button className=" bg-navbar_color hover:bg-hover_color font-bold py-2 px-4 rounded-full mt-4 focus:outline-none shadow">
          Discover Movies Now
        </button>
      </div>
    </section>
  );
}