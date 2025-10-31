import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
const NotificationToast = ({ title, message, time }) => (
  <div className="flex flex-col">
    <span className="font-semibold text-blue-600">{title}</span>
    <span className="text-gray-800">{message}</span>
    <span className="text-xs text-gray-500 mt-1">{time}</span>
  </div>
);

export const useToast = () => {
  const showNotification = (data) => {
    toast(
      <NotificationToast
        title="🔔 New Notification"
        message={data.message}
        time={new Date().toLocaleTimeString()}
      />,
      {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "rounded-lg shadow-lg bg-white border-l-4 border-blue-500",
        bodyClassName: "text-sm",
      }
    );
  };

  return { showNotification };
};
