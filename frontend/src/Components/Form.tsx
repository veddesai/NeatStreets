import { FormEvent} from "react";
import "../assets/utils.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface Props {
  type: "signIn" | "signUp";
}

interface SignUpFormData {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

interface SignInFormData {
  email: string;
  password: string;
}

type FormData = SignInFormData | SignUpFormData;

const Form: React.FC<Props> = ({ type }) => {
  const navigate = useNavigate();
  const isFlexRowReverse = type == "signUp" ? true : false;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      username?: { value: string };
      fullname?: { value: string };
    };

    let formData: FormData;
    if (type === "signUp") {
      formData = {
        username: target.username!.value,
        fullname: target.fullname!.value,
        email: target.email.value,
        password: target.password.value,
      } as SignUpFormData;

      await axios.post("http://localhost:8080/api/v1/auth/signup", formData);
    } else {
      formData = {
        email: target.email.value,
        password: target.password.value,
      } as SignInFormData;

      await axios.post("http://localhost:8080/api/v1/auth/signin", formData);
    }

    setInterval(() => {
      const route = type === "signUp" ? "/signin" : "/";
      navigate(route);
    }, 1000);
  };

  return (
    <>
      <div className=" h-screen w-[100%] flex flex-col fixed items-center py-9 bg-white dark:bg-slate-800">
        <div
          className={`form-container rounded-md sm:flex ${
            isFlexRowReverse ? "sm:flex-row-reverse" : "sm:flex-row"
          } w-max max-md:w-[75%] max-xs:w-[95%] shadow-lg dark:shadow-slate-900`}
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
                    className=" mt-10 dark:bg-slate-700 dark:text-white"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    className=" mb-10 dark:bg-slate-700 dark:text-white"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <Link
                    className=" sm:hidden text-center font-semibold"
                    to={"/signup"}
                  >
                    Don't have any account?
                    <br />
                    <span className="underline">Sign Up!</span>
                  </Link>
                </>
              )}
              {type === "signUp" && (
                <>
                  <input
                    type="text"
                    className=" dark:bg-slate-700 dark:text-white"
                    name="username"
                    placeholder="Username"
                    required
                  />
                  <input
                    type="text"
                    className=" dark:bg-slate-700 dark:text-white"
                    name="fullname"
                    placeholder="Fullname"
                    required
                  />

                  <input
                    type="email"
                    className=" dark:bg-slate-700 dark:text-white"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="password"
                    className=" dark:bg-slate-700 dark:text-white"
                    name="password"
                    placeholder="Password"
                    required
                  />

                  <Link
                    className=" sm:hidden text-center font-semibold"
                    to={"/signin"}
                  >
                    Already have an account?
                    <br />
                    <span className="underline">Sign In!</span>
                  </Link>
                </>
              )}
              <button
                className="m-auto my-4 py-2 px-6 uppercase font-bold bg-blue-600 dark:bg-blue-900 w-fit rounded-full text-white"
                type="submit"
              >
                {(type === "signIn" && "Sign In") ||
                  (type === "signUp" && "Sign Up")}
              </button>
            </form>
          </div>
          <div
            className={`${
              isFlexRowReverse ? "extra-card" : "signup-form"
            } px-2 gap-10 rounded-md max-sm:hidden flex flex-col justify-center text-center bg-blue-600 dark:bg-blue-900 text-white`}
          >
            <h2 className="text-4xl font-bold">Welcome Back!</h2>
            <p>
              To keep connected with us please{" "}
              {type === "signIn" ? "Sign up" : "Sign in"} with your personal
              info
            </p>
            <Link to={type === "signIn" ? "/signup" : "/signin"}>
              <button className="uppercase font-bold border-2 dark:border-white rounded-full w-fit mx-auto py-2 px-8">
                {type === "signIn" ? "Sign up" : "Sign in"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
