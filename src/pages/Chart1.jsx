// Chart1.jsx
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

/**
 * Color strategy (exact codes you requested)
 * Low  : #8dc0ec
 * Mid  : #FCB714
 * High : #2878BD
 *
 * Thresholds chosen to match your Power BI mapping:
 * - low <= 8.3
 * - mid > 8.3 && < 9.15
 * - high >= 9.15
 */

const COLOR_LOW = "#8dc0ec";
const COLOR_MID = "#FCB714";
const COLOR_HIGH = "#2878BD";

const thresholds = {
  lowMax: 8.3,
  highMin: 10,
};

// Sample top 15 (replace with your actual `top15` data if needed)
const top15 = [
  { title: "Dancer, Texas Pop. 81", averageVote: 10.0 },
  { title: "Little Big Top", averageVote: 10.0 },
  { title: "Me You and Five Bucks", averageVote: 10.0 },
  { title: "Stiff Upper Lips", averageVote: 10.0 },
  { title: "One Man's Hero", averageVote: 9.3 },
  { title: "The Shawshank Redemption", averageVote: 8.5 },
  { title: "There Goes My Baby", averageVote: 8.5 },
  { title: "The Godfather", averageVote: 8.4 },
  { title: "The Prisoner of Zenda", averageVote: 8.4 },
  { title: "Counting", averageVote: 8.3 },
  { title: "Fight Club", averageVote: 8.3 },
  { title: "Pulp Fiction", averageVote: 8.3 },
  { title: "Schindler's List", averageVote: 8.3 },
  { title: "Spirited Away", averageVote: 8.3 },
  { title: "The Godfather: Part II", averageVote: 8.3 },
];

// small util to pick color for a bar
function pickColor(v) {
  if (v >= thresholds.highMin) return COLOR_HIGH;
  if (v > thresholds.lowMax && v < thresholds.highMin) return COLOR_MID;
  return COLOR_LOW;
}

/**
 * Custom rectangle shape for Bar, animated with framer-motion.
 * Recharts calls this with x,y,width,height — we animate the width.
 */
const AnimatedBarRect = (props) => {
  const { x, y, width, height, fill } = props;

  // We want bar to animate from right to left, so position final rect
  // at x,y with final width. Initial width is 0 and rx is same x+width.
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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { title, averageVote } = payload[0].payload;
    let color = "#8dc0ec";
    if (averageVote >= 9.3) color = "#2878BD";
    else if (averageVote >= 8.4) color = "#FCB714";

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
// Legend payload: keep compact and minimal
// Legend payload: keep compact and minimal
const legendPayload = [
  {
    value: `High (≥ ${thresholds.highMin})`,
    type: "square",
    color: COLOR_HIGH,
  },
  {
    value: `Middle (${thresholds.lowMax}+ )`,
    type: "square",
    color: COLOR_MID,
  },
  { value: `Low (≤ ${thresholds.lowMax})`, type: "square", color: COLOR_LOW },
];

export default function Chart1() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Keep the order same as Power BI (highest at top) — Recharts vertical layout
  const data = [...top15]; // if your data is descending, use as-is; else sort
  // sort descending so highest rating at top visually
  data.sort((a, b) => b.averageVote - a.averageVote);

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
        Top 15 Rated Movies
      </Typography>

      {/* <Typography
        variant="body1"
        align="center"
        sx={{ maxWidth: 900, mb: 4, color: "#bfc7cc" }}
      >
         Highest audience-rated movies (audience vote average). Colors map to
        rating tiers for quick identification — consistent with the Power BI
        palette. }
      </Typography> */}

      {/* thumbnail / compact view that opens the full-screen dialog */}
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
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ cursor: "pointer" }}
        >
          <BarChart
            style={{ cursor: "pointer" }}
            data={data}
            layout="vertical"
            margin={{ top: 15, right: 40, left: 50, bottom: 8 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis
              type="number"
              domain={[5, 10]}
              ticks={[5, 6, 7, 8, 9, 10]}
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
              payload={legendPayload}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                color: "#ccc",
                fontSize: 14,
              }}
            />

            <Bar
              dataKey="averageVote"
              barSize={16}
              isAnimationActive={false} // we animate via custom shape
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
          ml: 10,
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
          variant="subtitle1"
          sx={{ fontSize: "1.2rem", fontWeight: 700, color: "#a3d1ff", mb: 1 }}
        >
          Key Insights 📊
        </Typography>

        <ul
          style={{
            margin: 0,
            paddingLeft: "1.2rem",
            color: "#d6dde0",
            lineHeight: 1.6,
          }}
        >
          <li>
            🎯 <strong>Elite Performers:</strong>{" "}
            <span style={{ color: "#2878BD" }}>4 movies</span> secured a
            flawless <strong>10.0 rating</strong>, setting the benchmark for
            cinematic excellence.
          </li>
          <li>
            ⭐ <strong>Dominant Tier:</strong> The majority of top-rated titles
            are in the
            <span style={{ color: "#FCB714" }}> medium range (8.4 – 9.29)</span>
            , indicating consistently high audience approval.
          </li>
          <li>
            📈 <strong>Score Distribution:</strong> Ratings are tightly
            clustered between
            <span style={{ color: "#8dc0ec" }}> 8.3 and 9.3</span>, suggesting a
            competitive field with minimal performance gaps.
          </li>
        </ul>
      </Box>

      {/* Fullscreen dialog — no scrolling, polished view */}
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
              flex: 1,
              display: "flex",
              flexDirection: "column",
              px: { xs: 2, md: 6 },
              py: { xs: 4, md: 6 },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 2,
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
              Top 15 Rated Movies
            </Typography>

            <Box sx={{ flex: 1, mt: 2, ml: 15 }}>
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
                    domain={[5, 10]}
                    ticks={[5, 6, 7, 8, 9, 10]}
                    tick={{
                      fill: "#d6dde0",
                      fontSize: 13,
                    }}
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
                    payload={legendPayload}
                    layout="horizontal"
                    // verticalAlign="botttom"
                    align="center"
                    wrapperStyle={{
                      color: "#ccc",
                      fontSize: 14,
                    }}
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
          </Box>
        </DialogContent>
      </Dialog>
      <Divider sx={{ width: "100%", my: 6, borderColor: "#444" }} />
      {/* Footer */}
      <Footer />
    </Box>
    
  );
}
