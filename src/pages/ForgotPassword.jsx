import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";



const schema = z.object({
  email: z.string().email("Invalid email"),
});

const ForgotPassword = () => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setError("");
      const res = await axios.post("http://localhost:8000/api/auth/forgot-password", data);
      toast.success(res.data.message)
      reset()
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }

  };

  return (
    // <div className="flex justify-center items-center h-screen bg-gray-100">
    //   <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg w-96">
    //     <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
    //     {/* {message && <p className="text-green-500">{message}</p>} */}
    //     {error && <p className="text-red-500">{error}</p>}

    //     <input
    //       type="email"
    //       placeholder="Enter your email"
    //       {...register("email")}
    //       className="w-full border p-2 rounded mb-2"
    //     />
    //     {/* {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>} */}

    //     <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
    //       Send Reset Link
    //     </button>
    //   </form>
    // </div>



    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
  <motion.form
    onSubmit={handleSubmit(onSubmit)}
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="bg-white p-8 rounded-2xl shadow-xl w-96"
  >
    <motion.h2
      className="text-3xl font-extrabold text-gray-800 mb-6 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      Forgot Password
    </motion.h2>

    {error && (
      <motion.p
        className="text-red-500 text-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {error}
      </motion.p>
    )}

    <motion.input
      type="email"
      placeholder="Enter your email"
      {...register("email")}
      className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      whileFocus={{ scale: 1.02 }}
    />

    <motion.button
      type="submit"
      className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Send Reset Link
    </motion.button>
  </motion.form>
</div>
















  );
};

export default ForgotPassword;
