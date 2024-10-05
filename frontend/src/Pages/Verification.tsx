import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { API_URL } from "../config/config";
import { AuthContext } from "../context/AuthContext";

const Verification = () => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>(""); // Ensure error is of type string
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext){
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const navigate = useNavigate();

  const {signupData} = authContext;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");


    try {
      const response = await axios.post(
        `${API_URL}/auth/verify-otp`,
        { otp: otp }
      );

      if (response.status === 200) {
      
        console.log(signupData);
        await axios.post(`${API_URL}/auth/signup`, signupData); 
        navigate("/success");
       } 
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); 
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-yellow-400 mb-6">
          Verify Your Email
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Please enter the OTP sent to your email.
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          {error && (
            <div className="text-red-600 dark:text-red-400">{error}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white font-bold bg-blue-600 dark:bg-yellow-400 rounded-md hover:bg-blue-700 dark:hover:bg-yellow-500 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
