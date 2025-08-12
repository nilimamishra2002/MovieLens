// Chart5.jsx
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

// Power BI colors
const COLOR_LOW = "#FFD700";
const COLOR_MED = "#4A90E2";
const COLOR_HIGH = "#999999";

// Thresholds for color mapping
const thresholds = {
  lowMin: 9.5, // >= = low color (gold)
  midMin: 8.5, // >= and < lowMin = blue
};

// Exact dataset from Power BI
const chartData = [
  { title: "Avatar", profit: 15.7 },
  { title: "Minions", profit: 11.9 },
  { title: "Frozen", profit: 11.0 },
  { title: "Jurassic World", profit: 11.0 },
  { title: "Furious 7", profit: 9.6 },
  { title: "The Secret Life of Pets", profit: 9.2 },
  { title: "Despicable Me 2", profit: 9.1 },
  { title: "The Avengers", profit: 9.1 },
  { title: "Ice Age: Continental Drift", profit: 8.9 },
  { title: "Titanic", profit: 8.5 },
  { title: "Ice Age: Dawn of the Dinosaurs", profit: 8.5 },
  { title: "Finding Nemo", profit: 8.5 },
  { title: "Toy Story 3", profit: 8.4 },
  { title: "The Lion King", profit: 8.4 },
  { title: "Shrek 2", profit: 8.3 },
  { title: "Avengers: Age of Ultron", profit: 8.0 },
  { title: "Iron Man 3", profit: 7.8 },
  { title: "Alice in Wonderland", profit: 7.6 },
  { title: "The Jungle Book", profit: 7.5 },
  { title: "Inside Out", profit: 7.3 },
];

// Precompute rank based on profit (descending order)
const rankedData = chartData.map((item, index, arr) => ({
  ...item,
  rank:
    arr
      .map((x) => x.profit)
      .sort((a, b) => b - a)
      .indexOf(item.profit) + 1,
}));

// Animated bar shape
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
    const movie = payload[0].payload;
    return (
      <div
        style={{
          background: "#1e1e1e",
          padding: "8px 12px",
          borderRadius: "6px",
          color: "#fff",
        }}
      >
        <strong>{movie.title}</strong>
        <div style={{ color: payload[0].color }}>
          Profit per Minute: ${movie.profit.toFixed(1)}M
        </div>
        <div style={{ color: "#ccc", marginTop: "4px" }}>
          Rank by Efficiency: #{movie.rank}
        </div>
      </div>
    );
  }
  return null;
};

export default function Chart5() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to get bar color
  const getColor = (value) => {
    if (value >= thresholds.lowMin) return COLOR_LOW;
    if (value >= thresholds.midMin) return COLOR_MED;
    return COLOR_HIGH;
  };

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
        sx={{ color: COLOR_LOW, fontWeight: 700 }}
      >
        High-Return Efficiency: Profit per Minute
      </Typography>

      {/* Compact clickable view */}
      <Box
        onClick={handleOpen}
        sx={{
          mt: 2,
          ml: 2,
          width: "50%",
          maxWidth: 900,
          height: 400,
          borderRadius: 2,
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
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ cursor: "pointer" }}
        >
          <BarChart
            style={{ cursor: "pointer" }}
            data={rankedData}
            layout="vertical"
            margin={{ top: 20, right: 40, bottom: 20, left: 30 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              type="number"
              tick={{ fill: "#ccc", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickLine={false}
              tickFormatter={(v) => `${v}M`}
            />
            <YAxis
              type="category"
              dataKey="title"
              tick={{ fill: "#ccc", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={130}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="profit"
              shape={<AnimatedBarRect />}
              isAnimationActive={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.profit)} />
              ))}
              <LabelList
                dataKey="profit"
                position="right"
                formatter={(v) => `${v.toFixed(1)}M`}
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
          ml: 2,
          background: "rgba(255, 255, 255, 0.04)",
          borderLeft: "4px solid #FFD700", // Accent using the 'low' color
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
            fontSize: "1rem",
            fontWeight: 700,
            color: "#fff",
            pb: 1,
          }}
        >
          Key Insights
        </Typography>
        <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "#ccc" }}>
          <li>
            🏆 <strong>Avatar</strong> tops the list with a profit-per-minute of{" "}
            <strong>$15.7M</strong>, setting the benchmark for efficiency.
          </li>
          <li>
            🎯 <strong>Animated blockbusters</strong> such as{" "}
            <strong>Minions</strong> and <strong>Frozen</strong> consistently
            rank in the top tier of profitability.
          </li>
          <li>
            📊 <strong>Mid-range performers</strong> still deliver strong
            profits, even without record-breaking revenues.
          </li>
          <li>
            ⚠️ <strong>Lower-ranked films</strong> may indicate higher
            production costs or weaker box office returns relative to runtime.
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
              py: { xs: 2, md: 3 },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                mr: 17,
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
              High-Return Efficiency: Profit per Minute
            </Typography>

            <ResponsiveContainer
              width="90%"
              height="100%"
              style={{ cursor: "pointer" }}
            >
              <BarChart
                style={{ cursor: "pointer" }}
                data={rankedData}
                layout="vertical"
                margin={{ top: 20, right: 80, bottom: 20, left: 160 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  type="number"
                  tick={{ fill: "#ccc", fontSize: 14 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}M`}
                />
                <YAxis
                  type="category"
                  dataKey="title"
                  tick={{ fill: "#ccc", fontSize: 14 }}
                  axisLine={false}
                  tickLine={false}
                  width={150}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="profit">
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-full-${index}`}
                      fill={getColor(entry.profit)}
                    />
                  ))}
                  <LabelList
                    dataKey="profit"
                    position="right"
                    formatter={(v) => `${v.toFixed(1)}M`}
                    style={{ fill: "#fff", fontSize: 14 }}
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
