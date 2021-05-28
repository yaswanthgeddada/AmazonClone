import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const history = useHistory();

  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const email = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");

  const { signup, currentUser } = useAuth();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const submitHandler = async () => {
    if (password.current.value === confirmPassword.current.value) {
      try {
        setIsLoading(true);
        await signup(email.current.value, password.current.value);
        history.push("/profile");
      } catch {
        setError("failed to signup");
      }
    } else {
      setError("Password not matching");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-80">
        <img
          src="/assets/blacklogo.png "
          className="h-28 mx-auto -my-5"
          alt=""
        />
        <div className="flex flex-col border-2 p-5">
          <div className="text-2xl font-semibold pb-3"> Sign-Up</div>
          <div className="font-bold text-sm">Email only</div>
          {error && (
            <div className="border-2 border-red-300 px-3 py-1 rounded-lg  text-red-400 my-3">
              {error}
            </div>
          )}
          <input
            type="email"
            placeholder="email"
            className="mb-4 mt-1 py-1 rounded"
            ref={email}
          />
          <input
            type="password"
            placeholder="password"
            className="mb-4 py-1 rounded"
            ref={password}
          />
          <input
            type="password"
            placeholder="confirm password"
            className="mb-4 py-1 rounded"
            ref={confirmPassword}
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
            disabled={isloading}
            onClick={submitHandler}
          >
            Continue
          </button>

          <p className="py-4 text-xs">
            By Continuing, you agree to Ammazon's{" "}
            <span className="text-blue-500 font-semibold">
              Conditions of use
            </span>{" "}
            and{" "}
            <span className="text-blue-500 font-semibold">Privacy Notice</span>
          </p>
        </div>

        <div className="mx-5 my-6">
          <Link
            to="/login"
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
            login an Ammazon account
          </Link>
        </div>

        <p className="text-center text-sm">
          1996-201,Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Signup;
