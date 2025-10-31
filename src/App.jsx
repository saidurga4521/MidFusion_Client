import Navbar from "./components/Navbar.jsx";
import WithAuth from "./hoc/WithAuth.jsx";
import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import MeetingsInfoPage from "./pages/MeetingInfoPage.jsx";
import MyErrorBoundary from "./components/error-boundary/ErrorBoundary.jsx";
import NetworkWatcher from "./components/error-boundary/NetwrokWatcher.jsx";
import PageNotFound from "./components/error-boundary/PageNotFound.jsx";
import ServerError from "./components/error-boundary/ServerError.jsx";

import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

import { useNotification } from "./hooks/useNotification.js";
import MagicLogin from "./components/MagicLogin.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";

// Lazy Loading
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Invitations = lazy(() => import("./pages/Invitations.jsx"));
const Landingpage = lazy(() => import("./pages/Landingpage.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const OtpVerificationPage = lazy(
  () => import("./pages/OtpVerificarionPage.jsx")
);
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const MeetingForm = lazy(() => import("./pages/MeetingForm.jsx"));
const ProfileSettingsPage = lazy(
  () => import("./pages/ProfileSettingsPage.jsx")
);
const SettingsPage = lazy(() => import("./pages/SettingsPage.jsx"));

function ProtectedLayout() {
  return (
    <WithAuth>
      <Navbar />
      <Outlet />
    </WithAuth>
  );
}

function App() {
  const [serverDown, setServerDown] = useState(false);
  const { subscribeToPush } = useNotification();

  useEffect(() => {
    fetch("http://localhost:8000")
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
      })
      .catch(() => setServerDown(true));
  }, []);

  useEffect(() => {
    // Auto-subscribe on mount
    subscribeToPush();
  }, []);

  if (serverDown) {
    return <ServerError />;
  }

  if (import.meta.env.MODE === "development") {
    console.log("[SW]: forces a clean slate every time you restart Vite. ");
    import("./unregister.sw.js").then(
      ({ unregisterServiceWorker }) => {
        unregisterServiceWorker();
      }
    );
  }

  return (
    <MyErrorBoundary>
      {/* <NetworkWatcher> */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <span className="w-10 h-10 rounded-full border-4 border-indigo-600 border-l-transparent animate-spin"></span>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<OtpVerificationPage />} />
          <Route path="/magicLogin" element={<MagicLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/500" element={<ServerError />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/invitations" element={<Invitations />} />
            <Route path="/create-meeting" element={<MeetingForm />} />
            <Route path="/profileSettings" element={<ProfileSettingsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
        

            <Route path="/meeting/:id" element={<MeetingsInfoPage />} />
            <Route path="/subscription-success" element={<SuccessPage />} />
          </Route>

        </Routes>
      </Suspense>
      {/* </NetworkWatcher> */}
    </MyErrorBoundary>
  );
}

export default App;
