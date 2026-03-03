import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function CustomDateTimePicker({ value, setValue }) {
  return (
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Shedule Interview Date & Time"
        value={value}
        onChange={(newValue) => setValue(newValue)}
          slotProps={{
          textField: {
            fullWidth: true
          },
        }}
      />
    </LocalizationProvider>
  );
}