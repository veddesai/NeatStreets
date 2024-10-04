import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useContext, useEffect } from "react";
import AuthButton from "./AuthButton";
import { AuthContext } from "../context/AuthContext";
import { FaHome, FaInfoCircle, FaMapMarkedAlt, FaTimes } from "react-icons/fa";
import { NavComponent } from "./NavComponent";
import { RiContactsBook3Fill } from "react-icons/ri";
import { IoIosPhotos } from "react-icons/io";

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user, isAuthenticated } = authContext;

  const navigator = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode === 'true';
  });

  const toggleOffcanvas = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <nav className="flex gap-4 border-b border-slate-200 dark:border-none dark:shadow-md justify-around items-center dark:text-white bg-slate-100 w-full dark:bg-slate-900 sticky top-0 z-50">
      <div className="logo w-32 my-1 hover:cursor-pointer">
        <img
          onClick={() => {
            navigator("/");
          }}
          className="invert dark:invert-0"
          src="/NeatStreets.png"
          alt="NeatStreets"
        />
      </div>

      <div className="max-xs:hidden w-1/2">
        <img className="mx-auto" src={ !isDark ? `/quote.gif` : `/quote-dark.gif`} alt="" />
      </div>

      <div className="flex gap-4">
        <div onClick={()=>{setIsDark(!isDark)}}>
          <DarkModeToggle />
        </div>

        <button
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
          onClick={toggleOffcanvas}
        >
          <GiHamburgerMenu className="size-6" />
        </button>

        <div className="offcanvas-container">
          <div
            className={`fixed inset-0 z-40 bg-black transition-opacity ${
              isOpen ? "opacity-60" : "hidden pointer-events-none"
            }`}
            onClick={toggleOffcanvas}
          ></div>

          <div
            className={`fixed w-96 border max-xs:w-full right-0 top-0 bottom-0 z-50 bg-white dark:bg-slate-900 transform ${
              isOpen ? "translate-x-0 overflow-y-auto" : "translate-x-full"
            } transition-transform duration-300 ease-in-out w-80 p-4`}
          >
            <div className="topButtonRow flex justify-end">
              <button
                className=""
                onClick={toggleOffcanvas}
              >
                <FaTimes size={30} />
              </button>
            </div>

            <h2 className="text-end max-md:text-4xl py-6 px-2 md:text-5xl font-extrabold">Welcome to Neatstreets</h2>
            <div title="Profile" className={`flex ${isAuthenticated?"flex-row-reverse bg-blue-700/85 cursor-pointer dark:bg-yellow-400/85 my-4":"my-8"} p-4 items-center justify-between my-4 mx-2`}>

              <h2 className="text-3xl text-white font-medium max-md:text-4xl">{user?.fullname}</h2>

              {isAuthenticated ? (
                <Link
                  className="size-16 border-4 border-white bg-blue-600 text-center text-5xl dark:bg-yellow-500 text-white rounded-full"
                  to={"/profile"}
                  title="Open Profile"
                >
                  {user?.username?.charAt(0)}
                </Link>
              ) : (
                <AuthButton
                  type="signUp"
                  role="END_USER"
                  className="px-4 py-2 bg-blue-600 dark:bg-yellow-500 text-white rounded-full"
                />
              )}
            </div>
            <ul className="p-2 flex flex-col ">
              <NavComponent icon={<FaHome />} name={"Home"} link={"/"}/>
              {isAuthenticated && <NavComponent icon={<IoIosPhotos />} name={"My Reports"} link={`/posts/${user?.id}`}/>}
              <NavComponent icon={<FaMapMarkedAlt />} name={"Map"} link={"/trashmap"}/>
              <NavComponent icon={<FaInfoCircle />} name={"About"} link={"/about"}/>
              <NavComponent icon={<RiContactsBook3Fill />} name={"Contact"} link={"/contact"}/>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
