import React, { useEffect, useState } from "react";
import WorkflowCard from "./WorkflowCard";
import {
  FaMapMarkerAlt,
  FaCamera,
  FaBell,
  FaCheckCircle,
  FaChartLine,
  FaSyncAlt,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

const WorkflowCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideInterval = 3000;
  const cards = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Grant Location Access:",
      description:
        "Allow the app to access your location to identify areas with unreported trash.",
    },
    {
      icon: <FaCamera />,
      title: "Report Unreported Trash:",
      description: "Capture and report unhandled trash in your community.",
    },
    {
      icon: <FaBell />,
      title: "Notify Trash Collectors:",
      description: "Alert local NGOs and helpers about the unreported trash.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Track and Mark Status:",
      description: "Monitor the progress of trash collection.",
    },
    {
      icon: <FaChartLine />,
      title: "View Progress:",
      description:
        "Check back to see the status of your report and whether the trash has been handled.",
    },
    {
      icon: <FaSyncAlt />,
      title: "Repeat to Keep Your Community Clean:",
      description: "Ensure ongoing cleanliness and community upkeep.",
    },
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextClick();
    }, autoSlideInterval);

    return () => clearInterval(intervalId);
  },[currentIndex]);
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className={` ${
        currentIndex % 2 == 0
          ? "bg-blue-900/95 dark:bg-yellow-400/95 text-white"
          : "text-blue-900 dark:text-yellow-500"
      } workflow-carousel rounded-lg md:w-2/3 max-md:w-5/6 relative mx-auto my-16`}
    >
      {/* Carousel Buttons */}
      <button
        className="absolute text-3xl left-0 top-1/2 transform -translate-y-1/2 md:p-12 p-2 rounded-full"
        onClick={handlePrevClick}
      >
        <FaRegArrowAltCircleLeft />
      </button>
      <button
        className="absolute text-3xl right-0 top-1/2 transform -translate-y-1/2 md:p-12 p-2 rounded-full"
        onClick={handleNextClick}
      >
        <FaRegArrowAltCircleRight />
      </button>

      <div className="flex justify-center">
        <WorkflowCard
          icon={cards[currentIndex].icon}
          title={cards[currentIndex].title}
          description={cards[currentIndex].description}
        />
      </div>
    </div>
  );
};

export default WorkflowCarousel;
