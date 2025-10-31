import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { magicLink } from "../services/authentication";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

const MagicLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await magicLink({ email: data.email });
      if (!res) {
        toast.error("Meeting link was not sent");
        return;
      }
      console.log("the response", res.data);
      toast.success("Meeting link sent successfully");
      reset();
    } catch (error) {
      console.log({ error: error.message });
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Magic Link Login
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <label className="text-gray-700 font-medium">Email:</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 text-sm sm:text-base p-3 rounded-md">
            <p>
              Enter your email to receive a magic link. Once you click the link
              from your inbox, you’ll be logged in automatically without needing
              a password.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Magic Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MagicLogin;
