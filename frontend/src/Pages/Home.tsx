import TrashSection from "../Components/Home/TrashSection";
import Hero from "../Components/Home/Hero";
import Navbar from "../Components/Navbar";
import HowItWorks from "../Components/Home/HowItWorks";
import GoToMapSection from "../Components/Home/GoToMapSection";
import { SignUpRedirect } from "../Components/Home/SignUpRedirect";




const Home = () => {
  

  return (
    <>
      <Navbar/>
      <div className=" bg-slate-50 dark:bg-slate-800 text-wrap dark:text-white">
        <Hero />
        <SignUpRedirect/>
        <GoToMapSection />
        <HowItWorks />
        <TrashSection />
      </div>
    </>
  );
};

export default Home;
