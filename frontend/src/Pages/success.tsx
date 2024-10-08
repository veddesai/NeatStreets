import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Success = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/signin");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-950">
        <h1 className="text-4xl font-bold text-blue-800 dark:text-yellow-500">
          Success!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Your OTP verification was successful. You can now log in to your
          account.
        </p>
        <button
          onClick={handleRedirect}
          className="mt-6 px-4 py-2 bg-blue-800 dark:bg-yellow-500 text-white rounded hover:bg-blue-900 hover:dark:bg-yellow-600 transition duration-300"
        >
          Go to Login
        </button>
      </div>
    </>
  );
};

export default Success;
