import { useEffect } from "react";

export default function Modal({ open, onClose, children, save }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-5 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <div className="flex flex-row-reverse" onClick={() => onClose()}>
          X
        </div>
        {/* Body */}
        <div className="mb-4">{children}</div>
        <div className="flex justify-between">
          <button
            className="flex  items-center gap-2 border-2 border-red-300 text-red-500 hover:bg-red-500 hover:text-white transition px-3 py-2 rounded-lg shadow"
            onClick={() => onClose}
          >
            Cancel
          </button>
          <button
            className="flex items-center gap-2 border-2 border-green-300 text-green-500 hover:bg-green-400 hover:text-white transition px-3 py-2 rounded-lg shadow"
            onClick={save}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
