import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdOutlinePersonAdd, MdOutlineMail, MdClose } from "react-icons/md";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

const AddParticipant = forwardRef(({ meetingData, setMeetingData }, ref) => {
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    // setUsers((prev) => [
    //   ...prev,
    //   { id: Date.now(), name: data.name, email: data.email },
    // ]);
    setMeetingData((prev) => ({
      ...prev,
      participants: [...prev.participants, { id: Date.now(), ...data }],
    }));
    reset();
  };
  useImperativeHandle(ref, () => ({
    validate: async () => {
      return await trigger();
    },
  }));

  const handleRemove = (id) => {
    let updatedPartcipants = meetingData.participants.filter(
      (user) => user.id !== id
    );
    setMeetingData((prev) => ({
      ...prev,
      participants: updatedPartcipants,
    }));
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Invite Participants
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-4 items-start"
        >
          {/* Name Input */}
          <div className="w-full md:flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 h-12 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
              <MdOutlinePersonAdd className="text-gray-500 mr-2 text-lg" />
              <input
                {...register("name")}
                type="text"
                placeholder="Enter name"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
            <p className="text-red-500 text-sm h-5 mt-1">
              {errors.name?.message}
            </p>
          </div>

          {/* Email Input */}
          <div className="w-full md:flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 h-12 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
              <MdOutlineMail className="text-gray-500 mr-2 text-lg" />
              <input
                {...register("email")}
                type="email"
                placeholder="Enter email"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
            <p className="text-red-500 text-sm h-5 mt-1">
              {errors.email?.message}
            </p>
          </div>

          {/* Add Button - Fixed alignment */}
          <div className="w-full md:w-auto mt-2 md:mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-3 h-12 rounded-lg hover:bg-blue-700 w-full md:w-auto transition-colors flex items-center justify-center gap-1"
            >
              <MdOutlinePersonAdd className="text-lg" />
              <span>Add Participant</span>
            </button>
          </div>
        </form>

        {/* Participants List */}
        <div className="mt-8">
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            Added Participants ({users.length})
          </h4>

          {meetingData.participants.length === 0 ? (
            <div className="text-center py-10 bg-blue-50 rounded-lg">
              <div className="text-4xl text-gray-400 mb-3">👥</div>
              <p className="text-gray-600">No participants added yet</p>
              <p className="text-gray-500 text-sm mt-1">
                Add participants using the form above
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {meetingData.participants.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 flex items-center gap-2 truncate">
                      <MdOutlinePersonAdd className="text-gray-600 flex-shrink-0" />
                      <span className="truncate">{user.name}</span>
                    </p>
                    <p className="text-gray-500 flex items-center gap-2 text-sm mt-1 truncate">
                      <MdOutlineMail className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(user.id)}
                    className="text-red-500 hover:text-red-700 font-semibold p-2 ml-2 rounded-full hover:bg-red-50 transition-colors"
                    aria-label="Remove participant"
                  >
                    <MdClose className="text-xl" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default AddParticipant;
