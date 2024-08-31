
import TrashSection from "../Components/TrashSection";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className=" text-wrap dark:text-white">
        <Hero/>
        <TrashSection/>
        .
      </div>
    </>
  );
};

export default Home;
