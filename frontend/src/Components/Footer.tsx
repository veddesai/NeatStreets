import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {

    const navigate = useNavigate();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative text-center p-8 text-blue-800 dark:text-yellow-500">
      
      <div className="mb-6">
        <h2 className="font-bold text-3xl">Work with us</h2>
        <p className="mt-6 text-lg max-w-lg mx-auto text-black dark:text-white">
          Interested in making your community cleaner? Partner with NeatStreets to help us achieve our mission of cleaner streets.
        </p>
        <button onClick={()=>{navigate("/contact")}} className="mt-4 px-6 py-2 bg-blue-800 dark:bg-yellow-500 text-white dark:text-black rounded-full shadow-md hover:shadow-lg transition">
          Get in Touch
        </button>
      </div>

     
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-800 dark:bg-yellow-500 text-white dark:text-black px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-yellow-600 transition"
      >
        Back to Top
      </button>

      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        Made with 💗 by Ved, Dev, and Jeet
      </div>
    </footer>
  );
};

export default Footer;
