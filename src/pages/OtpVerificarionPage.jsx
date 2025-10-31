import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendOtp, verifyOTP } from "../services/authentication";
import OtpInput from "../components/OtpInput";

const OtpVerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data passed from previous page
  const { data } = location.state || {};

  const handleVerify = (otp) => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    verifyotp(otp);
  };
  async function verifyotp(otp) {
    try {
      const res = await verifyOTP({ ...data, otp });
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message || "Please enter correct OTP");
    }
  }
  const fn = useCallback(async () => {
    try {
      const res = await sendOtp({ ...data });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Failed sending OTP");
    }
  }, [data]);
  useEffect(() => {
    fn();
  }, [fn]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-center text-white">
          OTP Verification
        </h2>
        <p className="text-center text-gray-300 mt-2">
          Enter the 6-digit OTP sent to <br />
          <span className="font-semibold text-white">
            {data.email || "your email"}
          </span>
        </p>
        <OtpInput size={6} onSubmit={(otp) => handleVerify(otp)} />

        {/* <form onSubmit={handleVerify} className="mt-6 space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/, ''))}
            maxLength={6}
            className="w-full text-center tracking-widest text-2xl px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FF4C61] outline-none"
            placeholder="Enter OTP"
          />

          <button
            type="submit"
            className="w-full bg-[#FF4C61] text-white py-3 rounded-lg font-semibold hover:bg-[#e94457] transition-all duration-300 shadow-lg"
          >
            Verify OTP
          </button>
        </form> */}

        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <button
            type="button"
            className="hover:text-[#FF4C61] transition"
            onClick={fn}
          >
            Resend OTP
          </button>
          <button
            type="button"
            className="hover:text-[#FF4C61] transition"
            onClick={() => navigate(-1)}
          >
            Change Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
