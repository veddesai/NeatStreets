import { BackgroundBeams } from "../ui/BackgroundBeams";


const Hero: React.FC = () => {
  
  return (
    <BackgroundBeams className="flex flex-col md:flex-row items-center w-full p-24 lg:gap-x-8 max-lg:gap-y-16">
  
      <div className="text-center">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl uppercase text-blue-800 dark:text-yellow-500">
          Reporting Trash One Click Away
        </h1>
        <h3 className="m-auto font-[300] mt-6 max-w-xl text-2xl">
          Efficiently report trash issues using Neatstreets for a cleaner community.
        </h3>
      </div>

      <div className="mt-8">
        <img
          className={`bg-cover shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:shadow-[rgba(0,_0,_0,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.3)_0px_1px_1px_0px] dark:bg-transparent`}
          src="/Hero1.png"
          alt="Loading..."
        />
      </div>
    </BackgroundBeams>
  );
};

export default Hero;
