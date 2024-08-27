import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [taskbar, setTaskbar] = useState<boolean>(false);
  const navigator = useNavigate();
  function toggleMenu(): void {
    setTaskbar((prevTaskbar) => !prevTaskbar);
  }

  return (
    <nav className="flex border-b border-slate-200 dark:border-none dark:shadow-md justify-around items-center dark:text-white bg-slate-100 w-full dark:bg-slate-800 sticky top-0 z-50">
      <div className="logo w-32 my-1 hover:cursor-pointer">
        <img onClick={()=>{navigator("/")}}
          className="invert  dark:invert-0"
          src="/src/assets/NeatStreets.png"
          alt="NeatStreets"
        />
      </div>

      <ul
        className={`${
          taskbar === true
            ? "flex-col border-l-[1px] border-r-[1px] border-b-[1px] dark:border-white absolute top-full left-[50%] w-[50%]  bg-slate-100 dark:bg-slate-800"
            : "max-md:hidden gap-10"
        } flex text-center`}
      >
        <li
          className={`${
            taskbar === true ? "py-3 border-b-[1px] dark:border-white" : ""
          }`}
        >
          <Link to="/" className="text-xl font-semibold">
            Home
          </Link>
        </li>
        <li
          className={`${
            taskbar === true ? "py-3 border-b-[1px] dark:border-white" : ""
          }`}
        >
          <Link to="/about" className="text-xl font-semibold">
            About
          </Link>
        </li>
        <li
          className={`${
            taskbar === true ? "py-3 border-b-[1px] dark:border-white" : ""
          }`}
        >
          <Link to="/contact" className="text-xl font-semibold">
            Contact
          </Link>
        </li>
      </ul>
      <ul className="flex gap-5">
        <div>
          <DarkModeToggle />
        </div>
        <div>
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 bg-gray-200 dark:bg-gray-900 rounded"
          >
            <GiHamburgerMenu className="size-6" />
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
