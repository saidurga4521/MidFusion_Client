import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MeetingInfo = forwardRef(({ meetingData, setMeetingData }, ref) => {
  const schema = z
    .object({
      title: z.string().min(3, "Meeting title must be at least 3 characters"),
      description: z.string().optional(),
      startDate: z.date({ required_error: "Start date is required" }),
      endDate: z.date({ required_error: "End date is required" }),
    })
    .refine((data) => data.endDate > data.startDate, {
      path: ["endDate"],
      message: "End date must be after start date",
    });

  const {
    register,
    control,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: meetingData.info.title,
      description: meetingData.info.description,
      startDate: meetingData.info.startDate || null,
      endDate: meetingData.info.endDate || null,
    },
  });

  const formData = watch();
  useEffect(() => {
    if (JSON.stringify(meetingData.info) !== JSON.stringify(formData)) {
      setMeetingData((prev) => ({
        ...prev,
        info: formData,
      }));
    }
  }, [formData, meetingData.info, setMeetingData]);
  useImperativeHandle(ref, () => ({
    validate: async () => {
      return await trigger();
    },
  }));

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Create Meeting
        </h2>
        <p className="text-gray-600">
          Fill in the details to schedule your meeting
        </p>
      </div>

      <form className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meeting Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title")}
            placeholder="Enter meeting title"
            className={`w-full border ${errors.title ? "border-red-300" : "border-gray-300"} rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition placeholder-gray-400`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
            <span className="text-gray-500 font-normal ml-1">(optional)</span>
          </label>
          <textarea
            {...register("description")}
            value={meetingData.info.description}
            placeholder="Enter meeting description"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition placeholder-gray-400"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date & Time <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`relative ${errors.startDate ? "border-red-300" : "border-gray-300"} border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500`}
                  >
                    <DatePicker
                      selected={field.value ?? null}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText="Select start date & time"
                      className="w-full px-4 py-3 text-gray-700 bg-transparent outline-none rounded-lg"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.startDate.message}
              </p>
            )}
          </div>

          {/* End Date */}
          <div>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date & Time <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`relative ${errors.endDate ? "border-red-300" : "border-gray-300"} border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500`}
                  >
                    <DatePicker
                      selected={field.value ?? null}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText="Select end date & time"
                      className="w-full px-4 py-3 text-gray-700 bg-transparent outline-none rounded-lg"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.endDate.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
});

export default MeetingInfo;
