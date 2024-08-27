const Hero: React.FC = () => {
  return (
    <div
      className={`p-16 flex max-lg:flex-col max-lg:gap-y-16 items-center w-full`}
    >
      <div>
        <h1 className=" text-6xl max-lg:text-4xl  text-center uppercase text-blue-600  dark:text-yellow-400">
          Reporting Trash One Click Away
        </h1>
        <h3 className="m-auto text-center mt-10 capitalize w-2/3 text-2xl">Efficiently report trash issues using Neatstreets for a cleaner community.</h3>
      </div>

      <div className="text-center">
        <img
          className={`bg-[url('/src/assets/wave.svg')] dark:bg-[url('/src/assets/dark-wave.svg')]  bg-cover shadow-lg ring-1 ring-black/5 rounded-2xl dark:bg-transparent m-auto`}
          src="/src/assets/Hero.png"
          alt="Loading..."
        />
      </div>
    </div>
  );
};

export default Hero;
