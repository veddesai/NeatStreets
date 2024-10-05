import TrashSection from "../Components/Home/TrashSection";
import Hero from "../Components/Home/Hero";
import Navbar from "../Components/Navbar";
import HowItWorks from "../Components/Home/HowItWorks";
import GoToMapSection from "../Components/Home/GoToMapSection";
import { SignUpRedirect } from "../Components/Home/SignUpRedirect";




const Home = () => {
  

  return (
    <>

      

      <div className="relative bg-slate-50 dark:bg-slate-950 bg-grid-black/[0.08] dark:bg-grid-white/[0.08] text-wrap dark:text-white">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
      <Navbar/>

        <Hero />
        <hr className="w-[95%] mx-auto h-1 bg-blue-800 dark:bg-slate-100"/>
        <SignUpRedirect/>
        <hr className="w-[95%] mx-auto h-1 bg-blue-800 dark:bg-slate-100"/>
        <GoToMapSection />
        <hr className="w-[95%] mx-auto h-1 bg-blue-800 dark:bg-slate-100"/>
        <HowItWorks />
        <hr className="w-[95%] mx-auto h-1 bg-blue-800 dark:bg-slate-100"/>
        <TrashSection />
        <hr className="w-[95%] mx-auto h-1 bg-blue-800 dark:bg-slate-100"/>
      </div>
    </>
  );
};

export default Home;
