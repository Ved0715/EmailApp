import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    verificationCode: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/verify-email/send-verification-code",
        { email: input.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setVerificationToken(res.data.token);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const verifyEmailHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/verify-email/verify-verification-code",
        { email: input.email, verificationCode: input.verificationCode, token: verificationToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsEmailVerified(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-screen h-screen">
      <form
        onSubmit={isEmailVerified ? registerHandler : submitHandler}
        className={`relative flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md animate-fade-in`}
      >
        <h1 className="font-bold text-3xl text-center text-gray-800 mb-4">
          Sign Up for GamilApp
        </h1>
        <input
          onChange={changeHandler}
          value={input.fullname}
          name="fullname"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Name"
          required
        />
        <div className="relative">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={input.email}
                onChange={changeHandler}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                required
                disabled={isEmailVerified}
              />
              {isEmailVerified && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <AiFillLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              )}
        </div>
        {verificationToken && !isEmailVerified && (
          <>
            <input
              onChange={changeHandler}
              value={input.verificationCode}
              name="verificationCode"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Verification Code"
            />
            <button
              onClick={verifyEmailHandler}
              className="bg-blue-600 p-2 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Verify Email
            </button>
          </>
        )}
        {isEmailVerified && (
          <>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={input.password}
                onChange={changeHandler}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 p-2 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </>
        )}
        {!verificationToken && (
          <button
            type="submit"
            className="bg-blue-600 p-2 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Verify Email
          </button>
        )}
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
