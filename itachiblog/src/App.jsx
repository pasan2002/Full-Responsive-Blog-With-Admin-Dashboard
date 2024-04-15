import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BlogCard from "./components/BlogCard";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import English from "./components/English";
import Anime from "./components/Anime";
import Indian from "./components/Indian";
import About from "./components/About";
import AdminRegister from "./components/AdminRegister";
import AdminLogin from "./components/AdminLogin";
import AdminBoard from "./components/AdminBoard";
import FullPost from "./components/FullPost"; 

function MainContent() {
  return (
    <div>
      <Header />
      <Hero />
      <BlogCard />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/english" element={<English />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/indian" element={<Indian />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminBoard />} />
        <Route path="/post/:postId" element={<FullPost />} />
      </Routes>
    </Router>
  );
}

export default App;
