import React, { useEffect, useState } from "react";
import { getUserData } from "../services/authentication";
import { useNavigate } from "react-router-dom";
import { setAuthenticated, setUser } from "../toolkit/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../hooks/useSocket";

const WithAuth = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { authenticated, user } = useSelector((store) => store.authSlice);

  // Only initialize socket after user exists
  const userId = user?.id;

  useSocket(userId, (notification) => {
    console.log("Notification Sent", notification);
  });


  useEffect(() => {
    let isMounted = true; // ✅ prevent state updates if component unmounts

    const checkAuth = async () => {
      try {
        const user = await getUserData();
        if (isMounted && user) {
          dispatch(setAuthenticated(user.data.success));
     
          dispatch(
            setUser({
              email: user.data.data.email,
              id: user.data.data.id,
              name: user.data.data.name,
              avatar: user.data.data.avatar,
              subscription: user.data.data.subscription,
            })
          );
        } else {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        console.error(err);

        if (isMounted) {
          navigate("/login", { replace: true });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <span className="w-10 h-10 rounded-full border-4 border-indigo-600 border-l-transparent animate-spin"></span>
      </div>
    );
  }

  if (!authenticated) return null; // redirect in useEffect, so no flicker

  return <>{children}</>;
};

export default WithAuth;
