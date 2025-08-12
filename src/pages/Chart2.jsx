// Chart2.jsx
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

// Exact color codes from Power BI (same as Chart1)
const COLOR_LOW = "#8dc0ec";
const COLOR_MID = "#FCB714";
const COLOR_HIGH = "#2878BD";

// Thresholds (adjusted for these votes)
const thresholds = {
  lowMax: 6.0,
  highMin: 6.7,
};

// Chart2 data
const genres = [
  { title: "History", averageVote: 6.7 },
  { title: "War", averageVote: 6.7 },
  { title: "Drama", averageVote: 6.4 },
  { title: "Music", averageVote: 6.4 },
  { title: "Foreign", averageVote: 6.4 },
  { title: "Animation", averageVote: 6.3 },
  { title: "Crime", averageVote: 6.3 },
  { title: "Documentary", averageVote: 6.2 },
  { title: "Romance", averageVote: 6.2 },
  { title: "Mystery", averageVote: 6.2 },
  { title: "Western", averageVote: 6.2 },
  { title: "Adventure", averageVote: 6.1 },
  { title: "Fantasy", averageVote: 6.0 },
  { title: "Family", averageVote: 6.0 },
  { title: "Fiction", averageVote: 6.0 },
  { title: "Science", averageVote: 6.0 },
  { title: "Thriller", averageVote: 6.0 },
  { title: "Action", averageVote: 6.0 },
  { title: "Comedy", averageVote: 5.9 },
  { title: "Movie", averageVote: 5.7 },
  { title: "TV", averageVote: 5.7 },
  { title: "Horror", averageVote: 5.6 },
];

// Color picker based on thresholds
function pickColor(v) {
  if (v >= thresholds.highMin) return COLOR_HIGH;
  if (v > thresholds.lowMax && v < thresholds.highMin) return COLOR_MID;
  return COLOR_LOW;
}

// Animated bar rectangle
const AnimatedBarRect = (props) => {
  const { x, y, width, height, fill } = props;
  return (
    <motion.rect
      x={x}
      y={y}
      height={height}
      rx={4}
      initial={{ width: 0 }}
      animate={{ width }}
      transition={{ duration: 2, ease: "easeOut" }}
      style={{ transformOrigin: "left center" }}
      fill={fill}
    />
  );
};

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { title, averageVote } = payload[0].payload;
    let color = pickColor(averageVote);
    return (
      <div
        style={{
          background: "#1e1e1e",
          padding: "8px 12px",
          borderRadius: "6px",
          border: `1px solid ${color}`,
          color: "#fff",
        }}
      >
        <div style={{ color }}>{title}</div>
        <div>Average Vote: {averageVote}</div>
      </div>
    );
  }
  return null;
};

export default function Chart2() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Sort data high to low
  const data = [...genres].sort((a, b) => b.averageVote - a.averageVote);

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
        sx={{ color: "#a3d1ff", fontWeight: 700 }}
      >
        How Movie Genres Stack Up by Votes
      </Typography>

      {/* Compact clickable chart */}
      <Box
        onClick={handleOpen}
        sx={{
          mt: 2,
          ml: 2,
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
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ cursor: "pointer" }}
        >
          <BarChart
            style={{ cursor: "pointer" }}
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 40, left: 50, bottom: 8 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis
              type="number"
              domain={[5, 7]}
              ticks={[5, 6, 7]}
              tick={{ fill: "#939393ff" }}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickLine={false}
            />
            <YAxis
              dataKey="title"
              type="category"
              width={110}
              tick={{ fill: "#939393ff", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              payload={[
                { value: "High (>= 6.7)", type: "square", color: COLOR_HIGH },
                {
                  value: "Medium (6.1 - 6.69)",
                  type: "square",
                  color: COLOR_MID,
                },
                { value: "Low (< 6.1)", type: "square", color: COLOR_LOW },
              ]}
              wrapperStyle={{ color: "#ccc", fontSize: 14 }}
            />
            <Bar
              dataKey="averageVote"
              barSize={16}
              isAnimationActive={false}
              shape={<AnimatedBarRect />}
            >
              <LabelList
                dataKey="averageVote"
                position="right"
                formatter={(v) => v.toFixed(1)}
                style={{ fill: "#e6eef3", fontWeight: 700, fontSize: 12 }}
              />
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={pickColor(entry.averageVote)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Key Insights Box */}
      <Box
        sx={{
          mt: 3,
          ml: 5,
          background: "rgba(255, 255, 255, 0.04)",
          borderLeft: "4px solid #2878BD", // gold accent from your palette
          borderRadius: "6px",
          padding: "12px 16px",
          marginTop: 3,
          //  maxWidth: 1000,
          width: "60%",
          color: "#e6eef3",
          fontSize: "1rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "1.3rem", color: "#a3d1ff", fontWeight: 700 }}
        >
          Key Insights
        </Typography>

        <ul
          style={{
            margin: 0,
            paddingLeft: "1rem",
            color: "#d6dde0",
            lineHeight: 2,
          }}
        >
          <li>
            📊 <strong>Genre Leaders:</strong> <strong>History</strong> and{" "}
            <strong>War</strong> secure the highest average ratings (
            <span style={{ color: "#4CAF50" }}>6.7</span>), showcasing strong
            audience appreciation.
          </li>
          <li>
            ⚖️ <strong>Consistent Performance:</strong> Majority of genres fall
            within the
            <strong> 6.0–6.4</strong> range, indicating stable audience
            sentiment across categories.
          </li>
          <li>
            📉 <strong>Underperformers:</strong> <strong>Movie</strong>,{" "}
            <strong>TV</strong>, and
            <strong> Horror</strong> score below{" "}
            <span style={{ color: "#FF4D4D" }}>5.8</span>, likely due to niche
            targeting or mixed reception.
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
        <DialogContent
          sx={{
            p: 0,
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Close button */}
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

          {/* Chart area */}
          <Box
            sx={{
              ml: 20,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              px: { xs: 1, md: 1 },
              py: { xs: 2, md: 2 },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                mr: 20,
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
              How Movie Genres Stack Up by Votes
            </Typography>

            <ResponsiveContainer
              width="90%"
              height="100%"
              style={{ cursor: "pointer" }}
            >
              <BarChart
                style={{ cursor: "pointer" }}
                data={data}
                layout="vertical"
                margin={{ top: 10, right: 40, left: 140, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="rgba(255,255,255,0.04)"
                />
                <XAxis
                  type="number"
                  domain={[5, 7]}
                  ticks={[5, 6, 7]}
                  tick={{ fill: "#d6dde0", fontSize: 13 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                  tickLine={false}
                  label={{
                    // value: "Average Vote",
                    position: "bottom",
                    fill: "#cbd6da",
                    dy: 12,
                  }}
                />
                <YAxis
                  dataKey="title"
                  type="category"
                  width={140}
                  tick={{ fill: "#d6dde0", fontSize: 14 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  payload={[
                    {
                      value: "High (>= 6.7)",
                      type: "square",
                      color: COLOR_HIGH,
                    },
                    {
                      value: "Medium (6.1 - 6.69)",
                      type: "square",
                      color: COLOR_MID,
                    },
                    { value: "Low (< 6.1)", type: "square", color: COLOR_LOW },
                  ]}
                  wrapperStyle={{ color: "#ccc", fontSize: 14 }}
                />
                <Bar
                  dataKey="averageVote"
                  barSize={20}
                  isAnimationActive={false}
                  shape={<AnimatedBarRect />}
                >
                  <LabelList
                    dataKey="averageVote"
                    position="right"
                    formatter={(v) => v.toFixed(1)}
                    style={{ fill: "#f0f7fb", fontWeight: 700, fontSize: 13 }}
                  />
                  {data.map((entry, idx) => (
                    <Cell
                      key={`cell-full-${idx}`}
                      fill={pickColor(entry.averageVote)}
                    />
                  ))}
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
