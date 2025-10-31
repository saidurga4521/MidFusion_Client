import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const ConfirmationModel = ({
  showDeclineModal,
  setShowDeclineModal,
  idx,
  handleDecline,
}) => {
  return (
    <div>
      <AnimatePresence>
        {showDeclineModal && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeclineModal(false)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg relative w-80"
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Icon */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowDeclineModal(false)}
              >
                <IoClose size={22} />
              </button>

              <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
              <p className="text-gray-600 mb-6">
                Do you really want to decline this invitation?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  onClick={() => setShowDeclineModal(false)}
                >
                  No
                </button>
                <button
                  onClick={() => {
                    handleDecline(idx);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Yes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfirmationModel;
