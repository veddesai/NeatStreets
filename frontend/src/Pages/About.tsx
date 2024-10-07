import React from "react";

import Navbar from "../Components/Navbar";


const About: React.FC = () => {
  return (
    <>
    <Navbar/>
    <div className="relative flex flex-col items-center dark:text-white w-full p-12 lg:gap-x-8 max-lg:gap-y-16">

      {/* Main Heading */}
      <div className="text-center">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl uppercase text-blue-800 dark:text-yellow-500">
          About NeatStreets
        </h1>
        <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-semibold">
          Reporting Trash, One Click Away
        </h2>
      </div>
      

      {/* Description Section */}
      <div className="mt-10 max-w-4xl text-center leading-relaxed text-lg md:text-xl">
        <p className="mb-6">
          Welcome to <strong>NeatStreets</strong>, a platform designed to bring
          cleaner, more organized communities through the power of crowd-sourced reporting.
          We believe in making waste management efficient and simple for everyone,
          from concerned citizens to organizations responsible for keeping our streets clean.
        </p>
        <p className="mb-6">
          With just a click, any user can report areas where trash management has fallen short.
          Our aim is to bridge the gap between community members and those responsible for
          waste collection, ensuring that reported issues are addressed quickly and efficiently.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-12 max-w-3xl text-center">
        <h3 className="text-3xl font-semibold mb-6 text-blue-800 dark:text-yellow-500">
          Our Features:
        </h3>
        <ul className="list-disc list-inside text-left space-y-4 text-lg">
          <li>
            <strong>Easy Reporting:</strong> NeatStreets empowers everyday users to post reports about
            inefficient trash management or uncleared waste. Just take a photo, add a description,
            and report the location — the rest is up to us!
          </li>
          <li>
            <strong>Manage Your Reports:</strong> Users can view and track the progress of their submitted reports.
            You also have the ability to delete reports if they’re no longer relevant.
          </li>
          <li>
            <strong>Helpers & Collectors:</strong> Dedicated helpers and waste management organizations can get assigned
            to a reported issue. They can mark a report as "In Progress" once they begin the task and change it to "Completed"
            when the issue is resolved.
          </li>
        </ul>
      </div>

      {/* Mission Section */}
      <div className="mt-12 max-w-4xl text-center text-lg md:text-xl">
        <h3 className="text-3xl font-semibold mb-6 text-blue-800 dark:text-yellow-500">
          Our Mission:
        </h3>
        <p className="mb-6">
          At <strong>NeatStreets</strong>, our mission is to create cleaner, healthier environments for everyone by leveraging
          community input. We strive to improve the way waste is managed, making it easier for organizations to handle trash collection
          while giving citizens an active role in maintaining the cleanliness of their streets.
        </p>
        <p className="font-semibold text-lg">
          Together, we can make a difference, <strong>one report at a time.</strong>
        </p>
      </div>

      
    </div>
    </>
    
  );
};

export default About;
