
import TrashSection from "../Components/TrashSection";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import HowItWorks from "../Components/HowItWorks";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className=" text-wrap dark:text-white">
        <Hero/>
        <HowItWorks/>
        <TrashSection/>
        .
      </div>
    </>
  );
};

export default Home;
