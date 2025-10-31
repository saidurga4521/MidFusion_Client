import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/meeting/calendar", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Raw API Response:", response);

        if (response.success && Array.isArray(response.data)) {
          const formatted = response.data.map((event) => {
            console.log("Raw event before formatting:", event);

            return {
              title: event.title || event.name || "Untitled Event",
              start: new Date(event.start), 
              end: new Date(event.end),     
            };
          });

          console.log("Formatted events for calendar:", formatted);
          setEvents(formatted);
        } else {
          console.error("Calendar API Error:", response.message || "Unknown error");
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div style={{ height: "600px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarComponent;
