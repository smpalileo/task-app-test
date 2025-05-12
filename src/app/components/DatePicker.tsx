import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DatePickerComponent({
  value,
  handleAccept,
}: {
  value: string | null;
  handleAccept: ({ prop, value }: { prop: string; value: string }) => unknown;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date picker"
        closeOnSelect
        disablePast
        value={value != null ? dayjs(value) : null}
        onAccept={(value) =>
          handleAccept({
            prop: "deadline",
            value: dayjs(value).format("YYYY-MM-DD"),
          })
        }
      />
    </LocalizationProvider>
  );
}
