import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Navbar: React.FC = () => {
const [taskbar,setTaskbar] = useState<boolean>(false);
  function toggleMenu() :void {
    console.log(taskbar)
    setTaskbar((prevTaskbar)=>(!prevTaskbar));
  }

  return (
    <nav className="flex border-b border-slate-200 dark:border-none dark:shadow-md justify-around items-center dark:text-white bg-slate-100 w-full dark:bg-slate-800 sticky top-0 z-50">
      <div className="logo w-32 my-1">
        <img
          className="invert  dark:invert-0"
          src="/src/assets/NeatStreets.png"
          alt="NeatStreets"
        />
      </div>

      <ul className={`${taskbar===true ? 'flex-col absolute top-full w-full bg-slate-100 dark:bg-slate-800': 'max-md:hidden'} flex gap-10 text-center`}>
        <li>
          <Link to="/" className="text-xl">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-xl">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-xl">
            Contact
          </Link>
        </li>
      </ul>
      <ul className="flex gap-5">
        <div>
          <DarkModeToggle />
        </div>
        <div>
          <button onClick={toggleMenu} className="md:hidden p-2 bg-gray-200 dark:bg-gray-900 rounded">
            <GiHamburgerMenu  className="size-6"/>
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
