import React, {useState} from "react";
import DatePicker from "react-modern-calendar-datepicker";
// import { Calendar } from "react-modern-calendar-datepicker";
const DatePickerComponent = () => {
  const [selectedDay, setSelectedDay] = useState();
  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref}
      placeholder="I'm a custom input"
      value={selectedDay ? `✅: ${selectedDay.day}` : ""}
      style={{
        textAlign: "center",
        padding: "0.2rem",
        fontSize: "14px",
        // border: "1px solid #9c88ff",
        border: "none",
        borderRadius: "100px",
        // boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",
        color: "#86d9ca",
        outline: "none",
      }}
      className="my-custom-input-class"
    />
  );
  return (
    <DatePicker
      value={selectedDay}
      onChange={setSelectedDay}
      renderInput={renderCustomInput}
      shouldHighlightWeekends
    />
  );
};

export default DatePickerComponent;
