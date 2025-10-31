import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./toolkit/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import registerServiceWorker from "./registerServiceWorker.js";
import "react-big-calendar/lib/css/react-big-calendar.css"

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    <ToastContainer
      position="top-right" // 👈 better for mobile, avoids side cutoff
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="colored"
      style={{ width: "90%", maxWidth: "300px" }} // 👈 keeps it neat on mobile
    />
  </>
);

// Register service worker (keeps it out of initial render flow)
registerServiceWorker();