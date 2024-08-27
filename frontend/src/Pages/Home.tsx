
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="overflow-x-hidden text-wrap dark:text-white">
        <Hero/>
        
      </div>
    </>
  );
};

export default Home;
