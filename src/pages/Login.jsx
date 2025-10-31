import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authentication";
import { toast } from "react-toastify";
import "../index.css";
import { useDispatch } from "react-redux";
import { setUser } from "../toolkit/authenticationSlice";

// ✅ Schema: only email + password
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authChannel = new BroadcastChannel("auth");

  useEffect(() => {
    authChannel.onmessage = (event) => {
      if (event.data.type === "LOGIN") {
        dispatch(setUser(event.data.payload));
        navigate("/home");
      }
    };
    return () => {
      authChannel.close();
    };
  }, [dispatch, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await loginUser(data);
      console.log(res)
      const userData = {
        email: res.data.data.user.email,
        id: res.data.data.user._id,
        name: res.data.data.user.name,
        avatar: res.data.data.user.avatar,
      };
      dispatch(setUser(userData));
      //Notify the other tabs
      authChannel.postMessage({ type: "LOGIN", payload: userData });

      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = () => {
    navigate("/magicLogin");
  };
  const handleGoogleOAuth = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    window.location.href = `${BASE_URL}/user/google`;
  };
  const handleFbOAuth = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    window.location.href = `${BASE_URL}/user/facebook`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-lg transition-all duration-300 transform scale-100 opacity-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Sign in
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-12"
              />
              <span
                role="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiOutlineEye className="h-5 w-5" />
                )}
              </span>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="rememberMe"
              {...register("rememberMe")}
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex gap-3 justify-center bg-indigo-600 text-white font-bold py-2.5 rounded-lg
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300
              ${isLoading ? "cursor-not-allowed opacity-70" : ""}`}
          >
            Sign In
            {isLoading && (
              <span className="w-6 h-6 rounded-full border-2 border-white border-l-transparent animate-spin" />
            )}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?
          <Link
            to="/signup"
            className="ml-1 font-semibold text-indigo-600 hover:text-indigo-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-4">
          <button
            onClick={handleMagicLink}
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2.5 font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <span>✨Continue with Magic Link</span>
          </button>

          {/* Google Button */}
          <button
            onClick={handleGoogleOAuth}
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2.5 font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>

          {/* Facebook Button */}
          <button
            onClick={handleFbOAuth}
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2.5 font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <FaFacebook size={20} className="text-blue-600" />
            <span>Continue with Facebook</span>
          </button>
        </div>

        {/* Forgot Password */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Forgot Password?
          <Link
            to="/forgot-password"
            className="ml-1 font-semibold text-indigo-600 hover:text-indigo-500 hover:underline"
          >
            Reset
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
