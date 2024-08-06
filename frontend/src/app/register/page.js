"use client";

import { IoMdMail } from "react-icons/io";
import { RiLock2Line } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, email, username } = formData;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", {
        duration: 1000,
      });
      return false;
    } else if (password.length < 5) {
      toast.error("Password is too short.", { duration: 1000 });
      return false;
    } else if (email === "") {
      toast.error("Email is required!", { duration: 1000 });
      return false;
    } else if (username === "") {
      toast.error("Username is required!", { duration: 1000 });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username } = formData;
    try {
      if (handleValidation()) {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/register";

        const response = await axios.post(url, {
          password,
          email,
          username,
        });

        const { data } = response;

        if (response.status === 201) {
          sessionStorage.setItem("taskToken", data.jwtToken);
          Cookies.set("taskToken", data.jwtToken);
          setFormData({
            password: "",
            email: "",
            username: "",
          });
          toast.success("Registered Successfully", {
            duration: 1000,
          });
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          toast.error(data.message, { duration: 1000 });
        }
      }
    } catch (error) {
      const { response } = error;
      toast.error(response.data.message, { duration: 1000 });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-white min-w-[300px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-white p-8 w-4/5 max-w-md min-w-[300px] rounded-2xl text-sm shadow-2xl"
      >
        <h1 className="text-black font-bold text-4xl mb-3">Register</h1>

        <label className="text-black font-semibold">Username</label>

        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <FaRegCircleUser className="mr-2" size={20} />
          <input
            onChange={handleChange}
            name="username"
            value={formData.username}
            type="text"
            className="ml-2 border-none h-full focus:outline-none w-[80%]"
            placeholder="Enter username"
          />
        </div>

        <label className="text-black font-semibold">Email</label>

        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <IoMdMail className="mr-2" size={20} />
          <input
            onChange={handleChange}
            value={formData.email}
            name="email"
            type="text"
            className="ml-2 border-none h-full focus:outline-none w-[80%]"
            placeholder="Enter your Email"
          />
        </div>

        <label className="text-black font-semibold">Password</label>

        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <RiLock2Line className="mr-2" size={20} />
          <input
            onChange={handleChange}
            value={formData.password}
            name="password"
            type={showPassword ? "text" : "password"}
            className="ml-2 border-none w-full h-full focus:outline-none"
            placeholder="Enter your Password"
          />
          {showPassword ? (
            <AiOutlineEyeInvisible
              onClick={() => setShowPassword(!showPassword)}
              className="mr-2 cursor-pointer"
              size={20}
            />
          ) : (
            <AiOutlineEye
              onClick={() => setShowPassword(!showPassword)}
              className="mr-2 cursor-pointer"
              size={20}
            />
          )}
        </div>

        <label className="text-black font-semibold">Confirm Password</label>

        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <RiLock2Line className="mr-2" size={20} />
          <input
            onChange={handleChange}
            value={formData.confirmPassword}
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            className="ml-2 border-none w-full h-full focus:outline-none"
            placeholder="Enter your Password"
          />
          {showPassword ? (
            <AiOutlineEyeInvisible
              onClick={() => setShowPassword(!showPassword)}
              className="mr-2 cursor-pointer"
              size={20}
            />
          ) : (
            <AiOutlineEye
              onClick={() => setShowPassword(!showPassword)}
              className="mr-2 cursor-pointer"
              size={20}
            />
          )}
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <input type="checkbox" className="mr-1" />
            <label className="text-black text-sm ml-2">Remember me</label>
          </div>
          <span className="text-blue-500 text-sm cursor-pointer font-normal">
            Forgot password?
          </span>
        </div>

        <button
          type="submit"
          className="mt-5 mb-2 bg-black text-white font-medium text-sm rounded-lg h-12 w-full transition hover:bg-gray-900"
        >
          Submit
        </button>
        <p className="text-center text-black text-sm">
          Already have an account?
          <span
            className="text-blue-500 cursor-pointer font-semibold ml-1"
            onClick={() => router.replace("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
