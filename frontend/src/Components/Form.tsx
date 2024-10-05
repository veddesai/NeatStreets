import { FormEvent, useContext, useState } from "react";
import "../assets/utils.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { API_URL } from "../config/config";
import SkeletonLoader from "./SkeletonLoader";
import { motion } from "framer-motion";
interface Props {
  type: "signIn" | "signUp";
}

enum Role {
  END_USER = "END_USER",
  ADMIN = "ADMIN",
  HELPER = "HELPER",
}

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  role: Role;
}

interface SignInFormData {
  email: string;
  password: string;
}

type FormData = SignInFormData | SignUpFormData;

const Form: React.FC<Props> = ({ type }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { login,setSignupData } = authContext;
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFlexRowReverse = type === "signUp";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage("");

    const target = e.target as typeof e.target & {
      email: { value: string };
      fullname: { value: string };
      password: { value: string };
      username: { value: string };
    };

    let formData: FormData;
    try {
      if (type === "signUp") {
        formData = {
          username: target.username.value,
          fullname: target.fullname.value,
          email: target.email.value,
          password: target.password.value,
          role: role as Role,
        } as SignUpFormData;
        setSignupData(formData);
        const response = await axios.post(`${API_URL}/auth/verify`, formData);
        if (
          response.status == 200 &&
          response.data.message === "OTP sent to your email."
        ) {
          setMessage("Sign up successful! Redirecting to verification page...");

          navigate("/verify", { replace: true });
        } else {
          setError("Give Proper Email..!");
        }
      } else {
        formData = {
          email: target.email.value,
          password: target.password.value,
        } as SignInFormData;

        const loginSuccess: unknown = await login(
          formData.email,
          formData.password
        );

        if (loginSuccess) {
          setMessage("Login successful! Redirecting to Home Page...");
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
        } else {
          setError("Invalid Credentials. Please try again.");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="h-screen w-full lg:fixed flex flex-col items-center py-20 bg-slate-50 dark:bg-slate-950">
      <motion.div
        className={`form-container rounded-md sm:flex ${
          isFlexRowReverse ? "sm:flex-row-reverse" : "sm:flex-row"
        } w-max max-md:w-[75%] max-xs:w-[95%] shadow-lg dark:shadow-slate-900`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`${
            isFlexRowReverse ? "signup-form" : "extra-card"
          } rounded-md md:w-[60%] p-6 max-md:p-8 dark:bg-slate-800 bg-white dark:text-white text-black`}
        >
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <h2 className="text-center capitalize leading-10 font-bold text-3xl my-4">
              {(type === "signIn" && "Login") ||
                (type === "signUp" && "Create account")}
            </h2>
            {type === "signIn" && (
              <>
                <input
                  className="mt-10 dark:bg-slate-700 dark:text-white"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <input
                  className="mb-10 dark:bg-slate-700 dark:text-white"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <Link
                  className="sm:hidden text-center font-semibold"
                  to={"/signup"}
                >
                  Don't have an account?
                  <br />
                  <span className="underline">Sign Up!</span>
                </Link>
              </>
            )}
            {type === "signUp" && (
              <>
                <input
                  type="text"
                  className="dark:bg-slate-700 dark:text-white"
                  name="fullname"
                  placeholder="Fullname"
                  required
                />
                <input
                  type="text"
                  className="dark:bg-slate-700 dark:text-white"
                  name="username"
                  placeholder="Username"
                  required
                />

                <input
                  type="email"
                  className="dark:bg-slate-700 dark:text-white"
                  name="email"
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  className="dark:bg-slate-700 dark:text-white"
                  name="password"
                  placeholder="Password"
                  required
                />

                <div className="text-blue-600 dark:text-yellow-400 underline">
                  Registering... as a {role}
                </div>

                <Link
                  className="sm:hidden text-center font-semibold"
                  to={"/signin"}
                >
                  Already have an account?
                  <br />
                  <span className="underline">Sign In!</span>
                </Link>
              </>
            )}

            {message && <p className="text-green-500 text-center">{message}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              className="m-auto my-4 py-2 px-6 uppercase font-bold bg-blue-600 dark:bg-yellow-500 w-fit rounded-full text-white"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : type === "signIn"
                ? "Sign In"
                : "Sign Up"}
            </button>
          </form>
        </div>
        <div
          className={`${
            isFlexRowReverse ? "extra-card" : "signup-form"
          } px-2 gap-10 rounded-md max-sm:hidden flex flex-col justify-center text-center bg-blue-600 dark:bg-yellow-500 text-white`}
        >
          <h2 className="text-4xl font-bold">Welcome Back!</h2>
          <p>
            To keep connected with us please{" "}
            {type === "signIn" ? "Sign up" : "Sign in"} with your personal info
          </p>
          <Link to={type === "signIn" ? "/signup?role=END_USER" : "/signin"}>
            <button className="uppercase font-bold border-2 dark:border-white rounded-full w-fit mx-auto py-2 px-8">
              {type === "signIn" ? "Sign up" : "Sign in"}
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Form;
