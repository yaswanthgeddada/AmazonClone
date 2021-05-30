import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";

const Login = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const email = useRef("");
  const password = useRef("");

  const { login, currentUser, resetPassword } = useAuth();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const submitHandler = async () => {
    setIsLoading(true);
    if (password.current.value !== "" && email.current.value !== "") {
      try {
        await login(email.current.value, password.current.value);
        history.push("/");
      } catch (error) {
        console.log(error);
        setError("login failed");
      }
    } else {
      setError("Invalid");
    }
    setIsLoading(false);
  };

  const resetPasswordHandler = async () => {
    if (email.current.value !== "") {
      try {
        await resetPassword(email.current.value);
        window.alert("check you mail");
      } catch (error) {
        setError("Email is Invalid");
      }
    } else {
      setError("Enter Email");
    }
  };

  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-80">
          <img
            src="/assets/blacklogo.png "
            className="h-28 mx-auto -my-5"
            alt=""
          />
          <div className="flex flex-col border-2 p-5">
            <div className="text-2xl font-semibold pb-3"> Sign-In</div>
            {error && (
              <div className="border-2 border-red-300 px-3 py-1 rounded-lg  text-red-400 my-3">
                {error}
              </div>
            )}
            <div className="font-bold text-sm">Email only</div>
            <input
              type="email"
              className="mb-4 mt-1 py-1 rounded"
              ref={email}
            />
            <input
              type="password"
              className="mb-4 py-1 rounded"
              ref={password}
            />

            <button
              className="
           bg-gradient-to-b 
          from-yellow-200 
          to-yellow-400 rounded-md
           border py-1 text-sm
           focus:outline-none
          hover:to-yellow-500
           "
              onClick={submitHandler}
            >
              <div className="flex justify-center items-center space-x-2">
                {isLoading && <CircularProgress size={16} />}
                <p>Continue</p>
              </div>
            </button>

            <div
              className="text-center text-blue-400 text-sm mt-4 hover:text-blue-600 cursor-pointer"
              onClick={resetPasswordHandler}
            >
              Forgot password
            </div>

            <p className="py-4 text-xs">
              By Continuing, you agree to Ammazon's{" "}
              <span className="text-blue-500 font-semibold">
                Conditions of use
              </span>{" "}
              and{" "}
              <span className="text-blue-500 font-semibold">
                Privacy Notice
              </span>
            </p>
          </div>

          <div className="mx-5 my-6">
            <Link
              to="/signup"
              className="
           bg-gradient-to-b 
          from-gray-200 
          to-gray-400 rounded-md
           border-2 py-1 text-sm
           focus:outline-none
          hover:to-yellow-500 
          px-10 
           "
            >
              Create your Ammazon account
            </Link>
          </div>

          <p className="text-center text-sm">
            1996-201,Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
