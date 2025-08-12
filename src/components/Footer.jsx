import React from "react";
import { Typography, Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "transparent", // or a color if you want
        minHeight: "2vh", // 2% of viewport height
        display: "flex",
        alignItems: "center", // vertical center
        justifyContent: "center", // horizontal center
      }}
    >
      <Typography variant="caption" color="gray">
        Built by <strong>Nilima Mishra</strong> & <strong>Jasaswini Mohanty</strong> • Powered by{" "}
        <strong>React</strong>, <strong>MUI</strong> & <strong>Power BI</strong> • Dataset:{" "}
        <strong>MovieLens</strong>
      </Typography>
    </Box>
  );
}
