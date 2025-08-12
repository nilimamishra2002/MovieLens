// Chart3.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const profitData = [
  { year: 2000, profit: 14 },
  { year: 2001, profit: 24 },
  { year: 2002, profit: 28 },
  { year: 2003, profit: 26 },
  { year: 2004, profit: 30 },
  { year: 2005, profit: 26 },
  { year: 2006, profit: 29 },
  { year: 2007, profit: 35 },
  { year: 2008, profit: 31 },
  { year: 2009, profit: 50 },
  { year: 2010, profit: 38 },
  { year: 2011, profit: 41 },
  { year: 2012, profit: 52 },
  { year: 2013, profit: 48 },
  { year: 2014, profit: 56 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { year, profit } = payload[0].payload;
    return (
      <div
        style={{
          background: "#1e1e1e",
          padding: "8px 12px",
          borderRadius: "6px",
          border: `1px solid #D4A017`,
          color: "#fff",
        }}
      >
        <div style={{ color: "#D4A017" }}>{`Year: ${year}`}</div>
        <div>{`Total Profit: ₹${profit}bn`}</div>
      </div>
    );
  }
  return null;
};

export default function Chart3() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        px: 3,
        py: 6,
        color: "#fff",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#FFD54F", fontWeight: 700 }}
      >
        Total Profit by Release Year (2000–2014)
      </Typography>

      {/* <Typography
        variant="body1"
        align="center"
        sx={{ maxWidth: 900, mb: 4, color: "#bfc7cc" }}
      >
        Annual total profit trends for movies (in billions), consistent with
        Power BI color palette and layout.
      </Typography> */}

      {/* Compact clickable chart */}
      <Box
        onClick={handleOpen}
        sx={{
          mt: 4,
          width: "40%",
          maxWidth: 900,
          height: 400,
          borderRadius: 2,
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(41, 40, 40, 0.5)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 6px 30px rgba(59, 59, 59, 0.6)",
          },
          background: "#121212",
          border: "1px solid rgba(103, 102, 102, 0.03)",
        }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ cursor: "pointer" }}
        >
          <LineChart
            style={{ cursor: "pointer" }}
            data={profitData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis
              dataKey="year"
              tick={{ fill: "#939393ff" }}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `₹${v}bn`}
              domain={[10, 60]}
              ticks={[10, 20, 30, 40, 50, 60]}
              tick={{ fill: "#939393ff" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              payload={[
                { value: "Total Profit", type: "line", color: "#D4A017" },
              ]}
              wrapperStyle={{ color: "#ccc", fontSize: 14 }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#D4A017"
              strokeWidth={3}
              dot={{ fill: "#D4A017", strokeWidth: 2 }}
              isAnimationActive={true}
            >
              <LabelList
                dataKey="profit"
                position="top"
                formatter={(v) => `₹${v}bn`}
                style={{ fill: "#f0f7fb", fontWeight: 700, fontSize: 12 }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Box
        sx={{
          ml: 2,
          background: "rgba(255, 255, 255, 0.04)",
          borderLeft: "4px solid #FCB714", // gold accent from your palette
          borderRadius: "6px",
          padding: "12px 16px",
          marginTop: 3,
          maxWidth: 1000,
          color: "#e6eef3",
          fontSize: "1rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "1.2rem", fontWeight: 700, mb: 1 }}
        >
          Key Insights
        </Typography>
        <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "#d6dde0" }}>
          <li>
            💹 <strong>Steady Growth:</strong> Total profit expanded from ₹14bn
            in 2000 to ₹56bn in 2014 — a<strong> 300%+ increase</strong> over
            the period.
          </li>
          <li>
            🚀 <strong>Peak Years:</strong> Notable surges in{" "}
            <strong>2009</strong> (₹50bn) and <strong>2012</strong> (₹52bn)
            highlight blockbuster-driven revenue jumps.
          </li>
          <li>
            📉 <strong>Market Dips:</strong> Declines in <strong>2005</strong>{" "}
            and <strong>2008</strong> suggest industry slowdowns or
            underperforming releases.
          </li>
        </ul>
      </Box>

      {/* Fullscreen dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        PaperProps={{
          sx: {
            background: "#0f0f0f",
            overflow: "hidden",
          },
        }}
      >
        <DialogContent sx={{ p: 0, height: "100vh", width: "100vw" }}>
          <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 40 }}>
            <IconButton
              onClick={handleClose}
              sx={{
                color: "#fff",
                background: "rgba(255,255,255,0.04)",
                "&:hover": { background: "rgba(255,255,255,0.06)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              px: { xs: 2, md: 6 },
              py: { xs: 4, md: 6 },
              height: "100%", // ensures container fills fullscreen
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                color: "#f9f9f9",
                textAlign: "center",
                fontWeight: 700,
                background: "rgba(255,255,255,0.03)",
                px: 3,
                py: 1,
                borderRadius: 1,
                alignSelf: "center",
                boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
              }}
            >
              Total Profit by Release Year (2000–2014)
            </Typography>

            <ResponsiveContainer
              width="80%"
              height="80%"
              style={{ cursor: "pointer" }}
            >
              <LineChart
                style={{ cursor: "pointer" }}
                data={profitData}
                margin={{ top: 20, right: 10, left: 300, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.04)"
                />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "#d6dde0" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => `₹${v}bn`}
                  domain={[10, 60]}
                  ticks={[10, 20, 30, 40, 50, 60]}
                  tick={{ fill: "#d6dde0" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  payload={[
                    { value: "Total Profit", type: "line", color: "#D4A017" },
                  ]}
                  wrapperStyle={{ color: "#ccc", fontSize: 14 }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#D4A017"
                  strokeWidth={3}
                  dot={{ fill: "#D4A017", strokeWidth: 2 }}
                  isAnimationActive={true}
                >
                  <LabelList
                    dataKey="profit"
                    position="top"
                    formatter={(v) => `₹${v}bn`}
                    style={{ fill: "#f0f7fb", fontWeight: 700, fontSize: 13 }}
                  />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </DialogContent>
      </Dialog>
      <Divider sx={{ width: "100%", my: 6, borderColor: "#444" }} />
            {/* Footer */}
            <Footer />
    </Box>
  );
}
