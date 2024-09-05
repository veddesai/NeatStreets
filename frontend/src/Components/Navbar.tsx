import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState, useRef, useContext } from "react";
import AuthButton from "./AuthButton";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user, isAuthenticated } = authContext;
  const [taskbar, setTaskbar] = useState<boolean>(false);

  const navigator = useNavigate();
  const navbarRef = useRef<HTMLUListElement>(null);
  function toggleMenu(): void {
    setTaskbar((prevTaskbar) => !prevTaskbar);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setTaskbar(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setTaskbar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function showDragdown(event: MouseEvent): void {
    //i was here yesterday -- ved
  }

  return (
    <nav className="flex border-b border-slate-200 dark:border-none dark:shadow-md justify-around items-center dark:text-white bg-slate-100 w-full dark:bg-slate-900 sticky top-0 z-50">
      <div className="logo w-32 my-1 hover:cursor-pointer">
        <img
          onClick={() => {
            navigator("/");
          }}
          className="invert  dark:invert-0"
          src="/NeatStreets.png"
          alt="NeatStreets"
        />
      </div>

      <ul
        className={`${
          taskbar === true
            ? "flex-col border-l-[1px] border-r-[1px] border-b-[1px] dark:border-white absolute top-full left-[50%] w-[50%]  bg-slate-100 dark:bg-slate-800"
            : "max-md:hidden gap-10"
        } flex text-center`}
        ref={navbarRef}
      >
        {taskbar && (
          <li className="py-3 border-b-[1px] dark:border-white">
            {isAuthenticated ? (
              <Link
                onMouseOver={showDragdown}
                className="text-blue-600 dark:text-yellow-500 border-b-2 border-current"
                to={"/profile"}
              >
                {user?.username}
              </Link>
            ) : (
              <AuthButton
                type="signUp"
                className="text-blue-600 dark:text-yellow-400"
              />
            )}
          </li>
        )}
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
          <Link to="/trashmap" className="text-xl font-semibold">
            Trashmap
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
        {isAuthenticated ? (
          <Link
            className="max-md:hidden px-4 py-2 bg-blue-600 dark:bg-yellow-500 text-white rounded-full"
            to={"/profile"}
          >
            {" "}
            {user?.username?.charAt(0)}{" "}
          </Link>
        ) : (
          <AuthButton
            type="signUp"
            className="max-md:hidden px-4 py-2 bg-blue-600 dark:bg-yellow-500 text-white rounded-full"
          />
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
