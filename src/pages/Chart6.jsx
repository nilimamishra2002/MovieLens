// Chart6.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

// Color codes from your Power BI chart
const COLOR_LOW = "#FF4D4D";
const COLOR_MED = "#FFD93B";
const COLOR_HIGH = "#4CAF50";

// Exact Power BI dataset
const chartData = [
  { genre: "Documentary", roi: 271 },
  { genre: "Animation", roi: 240 },
  { genre: "Family", roi: 220 },
  { genre: "Adventure", roi: 215 },
  { genre: "Fantasy", roi: 205 },
  { genre: "Music", roi: 204 },
  { genre: "Horror", roi: 199 },
  { genre: "Fiction", roi: 195 },
  { genre: "Science", roi: 195 },
  { genre: "Romance", roi: 195 },
  { genre: "Comedy", roi: 182 },
  { genre: "Action", roi: 174 },
  { genre: "Thriller", roi: 155 },
  { genre: "Mystery", roi: 155 },
  { genre: "Drama", roi: 152 },
  { genre: "War", roi: 141 },
  { genre: "Crime", roi: 138 },
  { genre: "History", roi: 92 },
  { genre: "Western", roi: 71 },
  { genre: "Foreign", roi: -45 },
];

// Animated bar shape for fullscreen view
const AnimatedBarRect = (props) => {
  const { x, y, width, height, fill } = props;
  return (
    <motion.rect
      x={x}
      y={y}
      height={height}
      rx={2}
      initial={{ width: 0 }}
      animate={{ width }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      fill={fill}
    />
  );
};

// Tooltip styling
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#1e1e1e",
          padding: "8px 12px",
          borderRadius: "6px",
          color: "#fff",
        }}
      >
        <strong>{payload[0].payload.genre}</strong>
        <div style={{ color: payload[0].color }}>ROI: {payload[0].value}</div>
      </div>
    );
  }
  return null;
};

// ROI to color logic
const getBarColor = (roi) => {
  const value = Number(roi); // ensure numeric
  if (value < 0) return COLOR_LOW; // red first
  if (value < 150) return COLOR_MED; // yellow
  return COLOR_HIGH; // green
};

export default function Chart6() {
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
        sx={{ color: COLOR_HIGH, fontWeight: 700 }}
      >
        Genre ROI Analysis
      </Typography>

      {/* Compact clickable chart */}
      <Box
        onClick={handleOpen}
        sx={{
          mt: 2,
          width: "50%",
          maxWidth: 900,
          height: 400,
          borderRadius: 2,
          // overflow: "hidden",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 6px 30px rgba(59, 59, 59, 0.6)",
          },
          background: "#121212",
          border: "1px solid rgba(255,255,255,0.03)",
        }}
      >
        <ResponsiveContainer width="100%" height="100%" style={{ cursor: "pointer" }}>
          <BarChart
          style={{ cursor: "pointer" }}
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 30, bottom: 20, left: 50 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              type="number"
              ticks={[-100, -50, 0, 50, 100, 150, 200, 250, 300]}
              tick={{ fill: "#ccc", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="genre"
              tick={{ fill: "#ccc", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="roi" barSize={20} isAnimationActive={true}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.roi)} />
              ))}
              <LabelList
                dataKey="roi"
                position="right"
                formatter={(v) => `${v}`}
                style={{ fill: "#fff", fontSize: 12 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Key Insights Box */}
      <Box
        sx={{
          mt: 5,
          ml: 5,
          background: "rgba(255, 255, 255, 0.04)",
          borderLeft: "4px solid #4CAF50", // High ROI green accent
          borderRadius: "6px",
          padding: "12px 16px",
          width: "60%",
          color: "#e6eef3",
          fontSize: "1rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#fff",
            pb: 1,
          }}
        >
          Key Insights
        </Typography>
        <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "#ccc" }}>
          <li>
            📊 <strong>ROI (Return on Investment)</strong> measures
            profitability and is calculated as{" "}
            <strong>(Revenue − Cost) ÷ Cost × 100%</strong>, showing the
            percentage gain or loss relative to investment.
          </li>
          <li>
            🟢{" "}
            <span style={{ color: "#4CAF50", fontWeight: 600 }}>High ROI</span>{" "}
            tier highlights projects delivering exceptional returns, far
            exceeding their costs.
          </li>
          <li>
            🟡{" "}
            <span style={{ color: "#FFD93B", fontWeight: 600 }}>
              Medium ROI
            </span>{" "}
            tier represents projects with solid but moderate profitability.
          </li>
          <li>
            🔴{" "}
            <span style={{ color: "#FF4D4D", fontWeight: 600 }}>
              Low/Negative ROI
            </span>{" "}
            indicates underperforming projects, including those that failed to
            recover initial investments.
          </li>
          <li>
            🎯 The consistent <strong>Power BI color palette</strong> ensures
            visual alignment with your existing dashboards for seamless
            cross-platform analysis.
          </li>
        </ul>
      </Box>

      {/* Fullscreen dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        PaperProps={{
          sx: { background: "#0f0f0f", overflow: "hidden" },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 40 }}>
            <IconButton
              onClick={handleClose}
              sx={{
                color: "#fff",
                background: "rgba(255,255,255,0.04)",
                "&:hover": { background: "rgba(255,255,255,0.06)" },
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              ml: 20,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              px: { xs: 1, md: 4 },
              py: { xs: 2, md: 4 },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mr: 15,
                mb: 5,
                color: "#e6eef3",
                textAlign: "center",
                fontWeight: 700,
                background: "rgba(255,255,255,0.03)",
                width: "fit-content",
                px: 3,
                py: 1,
                borderRadius: 1,
                alignSelf: "center",
                boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
              }}
            >
              Genre ROI Analysis
            </Typography>
            <ResponsiveContainer width="90%" height="100%" style={{ cursor: "pointer" }}>
              <BarChart
              style={{ cursor: "pointer" }}
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 80, bottom: 20, left: 120 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  type="number"
                  ticks={[-100, -50, 0, 50, 100, 150, 200, 250, 300]}
                  tick={{ fill: "#ccc", fontSize: 14 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="genre"
                  tick={{ fill: "#ccc", fontSize: 14 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="roi" barSize={20} isAnimationActive={true}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.roi)} />
                  ))}
                  <LabelList
                    dataKey="roi"
                    position="right"
                    formatter={(v) => `${v}`}
                    style={{ fill: "#fff", fontSize: 12 }}
                  />
                </Bar>
              </BarChart>
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
