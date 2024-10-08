import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { GiHamburgerMenu, GiPositionMarker } from "react-icons/gi";
import { useState, useContext, useEffect } from "react";
import AuthButton from "./AuthButton";
import { AuthContext } from "../context/AuthContext";
import { FaHome, FaInfoCircle, FaMapMarkedAlt, FaTimes } from "react-icons/fa";
import { NavComponent } from "./NavComponent";
import { RiContactsBook3Fill } from "react-icons/ri";
import { IoIosPhotos } from "react-icons/io";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import Modal from "./ui/Modal";
import LocationFetchMap from "./LocationFetchMap";
import { useLocation } from "../context/LocationContext";

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { location, updateLocation } = useLocation();
  if (authContext === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user, isAuthenticated } = authContext;

  const navigator = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mapOpen, setMapOpen] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: location.lat || 0,
    lng: location.lng || 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true";
  });

  const toggleOffcanvas = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const fetchAddress = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const { address } = data;

      const addressParts: string[] = [];
      if (address.city) {
        addressParts.push(address.city);
      } else if (address.state_district) {
        addressParts.push(address.state_district);
      }
      if (address.state) {
        addressParts.push(address.state);
      }
      if (!address.state && address.country) {
        addressParts.push(address.country);
      }
      return addressParts.join(", ") || "Unknown Location";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Unknown Location";
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <>
      <nav
        className={`flex gap-4 justify-around items-center dark:text-white w-full sticky top-0 z-50 transition-all duration-300 ${
          isScroll
            ? "backdrop-blur-md bg-white/30 dark:bg-black/30 shadow-md"
            : "bg-transparent"
        }`}
      >
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

        <div className="max-md:hidden ">
          <TypewriterEffectSmooth
            className="mx-auto md:text-[2rem] max-xl:text-[2.25rem] font-bold text-center font-baskerville text-blue-800 dark:text-yellow-500 xl:text-[2.75rem]"
            words={[{ text: "Cleanliness Brings Clarity" }]}
          />
        </div>

        <div className="flex gap-4">
          <div
            onClick={() => {
              setIsDark(!isDark);
            }}
          >
            <DarkModeToggle />
          </div>

          <button
            className="p-2 text-gray-800 dark:text-gray-200"
            onClick={() => setMapOpen(true)}
          >
            <GiPositionMarker className="size-6" />
          </button>

          <button
            className="p-2 text-gray-800 dark:text-gray-200"
            onClick={toggleOffcanvas}
          >
            <GiHamburgerMenu className="size-6" />
          </button>
        </div>
      </nav>
      <div className="offcanvas-container z-[1000]">
        <div
          className={`fixed inset-0 z-40 bg-black transition-opacity ${
            isOpen ? "opacity-20" : "hidden pointer-events-none"
          }`}
          onClick={toggleOffcanvas}
        ></div>

        <div
          className={`fixed w-96 border max-xs:w-full dark:text-white right-0 top-0 bottom-0 z-50 bg-white dark:bg-slate-950 transform ${
            isOpen ? "translate-x-0 overflow-y-auto" : "translate-x-full"
          } transition-transform duration-300 ease-in-out w-80 p-4`}
        >
          <div className="topButtonRow flex justify-end">
            <button className="" onClick={toggleOffcanvas}>
              <FaTimes size={30} />
            </button>
          </div>

          <h2 className="text-end max-md:text-4xl py-6 px-2 md:text-5xl font-extrabold">
            Welcome to Neatstreets
          </h2>
          <div
            title="Profile"
            className={`flex ${
              isAuthenticated
                ? "flex-row-reverse bg-blue-700/85 cursor-pointer dark:bg-yellow-400/85 my-4"
                : "my-8"
            } p-4 items-center justify-between my-4 mx-2`}
          >
            <h2 className="text-3xl text-white font-medium max-md:text-4xl">
              {user?.fullname}
            </h2>

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
            <NavComponent icon={<FaHome />} name={"Home"} link={"/"} />
            {isAuthenticated && ( user?.role === "END_USER" ? (
              <NavComponent
                icon={<IoIosPhotos />}
                name={"My Reports"}
                link={`/posts/${user?.id}`}
              />
            ) : (
              <NavComponent
                icon={<IoIosPhotos />}
                name={"Assigned Reports"}
                link={`/posts/assigned`}
              />
            ))}
            <NavComponent
              icon={<FaMapMarkedAlt />}
              name={"Map"}
              link={"/trashmap"}
            />
            <NavComponent
              icon={<FaInfoCircle />}
              name={"About"}
              link={"/about"}
            />
            <NavComponent
              icon={<RiContactsBook3Fill />}
              name={"Contact"}
              link={"/contact"}
            />
          </ul>
        </div>
      </div>

      <Modal isOpen={mapOpen} onClose={() => setMapOpen(false)}>
        <LocationFetchMap
          position={position}
          onPositionChange={(latLng) => {
            setPosition(latLng);
          }}
        />

        <button
          onClick={() => {
            fetchAddress(position.lat, position.lng).then((address: string) => {
              updateLocation(position.lat, position.lng, address);
            });
            setMapOpen(false);
          }}
          className="block mx-auto text-white my-4 p-2 rounded-lg bg-blue-900 dark:bg-yellow-500 max-md:text-lg text-2xl"
        >
          Update Location
        </button>
      </Modal>
    </>
  );
};

export default Navbar;
