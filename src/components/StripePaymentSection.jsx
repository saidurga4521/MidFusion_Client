import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

const ManageSubscriptionButton = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/stripe/create-portal-session");
      if (res.data.url) {
        window.open(res.data.url, '_blank')
      }
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="px-4 py-2 bg-indigo-600 text-white rounded"
    >
      {loading ? "Redirecting..." : "See My Plans"}
    </button>
  );
};


const StripePaymentSection = () => {
  const { user } = useSelector((store) => store.authSlice);

  const handleUpgrade = async () => {
    const { data } = await axios.post(
      "/api/stripe/create-checkout-session",
      {},
      { withCredentials: true }
    );

    console.log('data', data);

    // Open Stripe Checkout in a new window
    const stripeWindow = window.open(data.url, '_blank', 'width=600,height=700');

    // Optional: Focus on the new window
    if (stripeWindow) {
      stripeWindow.focus();
    }

    // Optional: Add a fallback in case popups are blocked
    if (!stripeWindow || stripeWindow.closed || typeof stripeWindow.closed == 'undefined') {
      // Fallback to same tab if popup is blocked
      window.location.href = data.url;
    }
  };

  return (
    <div className="p-4">
      <h1>Hello {user?.name}</h1>
      <p>
        Plan: <strong>{user?.subscription?.plan}</strong>
      </p>
      {user?.subscription?.plan === "premium" && (
        <p>
          Active until:{" "}
          {user.subscription.currentPeriodEnd ? new Date(user.subscription.currentPeriodEnd).toLocaleDateString() : 'N/A'}
        </p>
      )}

      <div className='flex gap-6 my-4'>
        {user?.subscription?.plan === "free" && (
          <button
            onClick={handleUpgrade}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Upgrade to Premium
          </button>
        )}

        {user?.subscription?.plan === "premium" && (
          <ManageSubscriptionButton />
        )}
      </div>


    </div>

  );
};

export default StripePaymentSection;
