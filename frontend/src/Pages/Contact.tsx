import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-center dark:text-white w-full p-12 lg:gap-x-8 max-lg:gap-y-16">
        {/* Main Heading */}
        <div className="text-center">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl uppercase text-blue-800 dark:text-yellow-500">
            Contact NeatStreets
          </h1>
          <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-semibold">
            Let's Get in Touch
          </h2>
        </div>

        {/* Contact Information */}
        <div className="mt-10 max-w-4xl text-center leading-relaxed text-lg md:text-xl">

          <p className="mb-6 text-sm md:text-2xl">Ahmedabad, Gujarat</p>
          <p className="mb-6 text-sm md:text-2xl">Phone: +91 8238746290</p>
          <p className="mb-6 text-sm md:text-2xl">Email: veddesai20@gmail.com</p>
        </div>

        {/* Google Maps Section */}
        <div className="mt-12 w-full max-w-4xl h-96">
          <iframe
            title="Indus University Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.29918790405!2d72.41493012913726!3d23.020158084541748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1728410723541!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <hr className="w-[95%] mx-auto h-1 bg-blue-800 dark:bg-slate-100"/>
      <Footer/>
    </>
  );
};

export default Contact;
