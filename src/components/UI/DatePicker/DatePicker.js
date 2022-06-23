import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function NativePickers() {
  const dateHandler = (e) => {
    const date = e.target.value;
    const seconds = Date.parse(date) / 1000;
  };

  return (
    <Stack component="form" noValidate spacing={3}>
      <TextField
        id="datetime-local"
        label="Select Date & Time"
        type="datetime-local"
        defaultValue="2022-03-27T10:30"
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={dateHandler}
        style={{ marginLeft: "0.7rem", marginTop: "0.7rem" }}
      />
    </Stack>
  );
}
