import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: "white", // Placeholder text color
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // Default outline color
            },
            "&:hover fieldset": {
              borderColor: "white", // Outline color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "white", // Outline color when focused
            },
          },
          "& .MuiInputLabel-root": {
            color: "white", // Label color
          },
        },
      },
    },
  },
});

export default theme;
