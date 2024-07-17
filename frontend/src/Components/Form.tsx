import { FormEvent } from "react";
import "../assets/utils.css";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

interface Props {
  type: "signIn" | "signUp";
}

interface SignUpFormData {
  username: string;
  firstname: string;
  lastname: string;
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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      username?: { value: string };
      firstname?: { value: string };
      lastname?: { value: string };
    };

    let formData: FormData;
    if (type === "signUp") {
      formData = {
        username: target.username!.value,
        firstname: target.firstname!.value,
        lastname: target.lastname!.value,
        email: target.email.value,
        password: target.password.value,
      } as SignUpFormData;
    } else {
      formData = {
        email: target.email.value,
        password: target.password.value,
      } as SignInFormData;
    }

    console.log(formData);

    const route = type === "signUp" ? "/signin" : "/";

    navigate(route);
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="form-container rounded-md sm:flex sm:flex-row-reverse w-max max-md:w-[75%] max-xs:w-[95%] shadow-2xl shadow-slate-500">
          <div className="signup-form rounded-md md:w-[65%] p-6 max-md:p-8 bg-white">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <h2 className="text-center capitalize leading-10 font-bold text-3xl my-4">
                {(type === "signIn" && "Login") ||
                  (type === "signUp" && "Create account")}
              </h2>
              {type === "signIn" && (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </>
              )}
              {type === "signUp" && (
                <>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                  />
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Firstname"
                    required
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </>
              )}
              <button
                className="m-auto my-4 py-2 px-6 uppercase font-bold bg-blue-500 w-fit rounded-full text-white"
                type="submit"
              >
                {(type === "signIn" && "Sign In") ||
                  (type === "signUp" && "Sign Up")}
              </button>
            </form>
          </div>
          <div className="extra-card gap-10 rounded-md max-sm:hidden flex flex-col justify-center text-center bg-blue-500 text-white">
            <h2 className="text-4xl font-bold">Welcome Back!</h2>
            <p>
              To keep connected with us please{" "}
              {type === "signIn" ? "Sign up" : "Sign in"} with your personal
              info
            </p>
            <Link to={type === "signIn" ? "/signup" : "/signin"}>
              <button className="uppercase font-bold border-2 border-white rounded-full w-fit mx-auto py-2 px-8">
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
