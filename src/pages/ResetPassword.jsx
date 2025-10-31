import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { token } = useParams();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/auth/reset-password/${token}`,
        { password: data.password }
      );
      toast.success(res.data.message);
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    // <div className="flex justify-center items-center h-screen bg-gray-100">
    //   <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     className="bg-white p-6 rounded-lg shadow-lg w-96"
    //   >
    //     <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
    //     {/* {message && <p className="text-green-500">{message}</p>} */}
    //     {/* {errors && <p className="text-red-500">{errors}</p>} */}

    //     <input
    //       type="password"
    //       placeholder="New Password"
    //       {...register("password")}
    //       className="w-full border p-2 rounded mb-2"
    //     />
    //     {errors.password && (
    //       <p className="text-red-500 text-sm">{errors.password.message}</p>
    //     )}

    //     <input
    //       type="password"
    //       placeholder="Confirm New Password"
    //       {...register("confirmPassword")}
    //       className="w-full border p-2 rounded mb-2"
    //     />
    //     {errors.confirmPassword && (
    //       <p className="text-red-500 text-sm">
    //         {errors.confirmPassword.message}
    //       </p>
    //     )}

    //     <button
    //       type="submit"
    //       className="w-full bg-blue-500 text-white p-2 rounded"
    //     >
    //       Reset Password
    //     </button>
    //   </form>
    // </div>




         <div className="flex justify-center  items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-gray-100"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-6 text-center text-gray-800"
        >
          🔒 Reset Password
        </motion.h2>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="password"
            placeholder="New Password"
            {...register("password")}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 rounded-lg mb-2 transition"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}
        </motion.div>

        {/* Confirm Password */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="password"
            placeholder="Confirm New Password"
            {...register("confirmPassword")}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 rounded-lg mb-2 transition"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mb-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </motion.div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
        >
          Reset Password
        </motion.button>
      </motion.form>
    </div>















  );
};

export default ResetPassword;
