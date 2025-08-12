// Chart4.jsx
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
  Legend,
  Cell,
  LabelList,
} from "recharts";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

// Colors from your Power BI chart
const COLOR_BUDGET = "#E28D5D";
const COLOR_REVENUE = "#3CA45C";

// Genre → Top Movie name mapping (from your Power BI data)
const topMoviesByGenre = {
  Adventure: "Avengers: Endgame",
  Action: "Avengers: Infinity War",
  Comedy: "The Hangover",
  Drama: "The Godfather",
  Thriller: "Se7en",
  Fantasy: "The Lord of the Rings: The Return of the King",
  Family: "Finding Nemo",
  Fiction: "Interstellar",
  Science: "Avatar",
  Animation: "Frozen",
  Romance: "Titanic",
  Crime: "The Dark Knight",
  Mystery: "Inception",
  Horror: "The Conjuring",
  War: "Saving Private Ryan",
  History: "Schindler's List",
  Music: "Bohemian Rhapsody",
  Western: "Django Unchained",
  Documentary: "Free Solo",
  Foreign: "Parasite",
};


// Your exact Power BI dataset
const chartData = [
  { genre: "Adventure", budget: 24.68, revenue: 75.21 },
  { genre: "Action", budget: 27.15, revenue: 72.41 },
  { genre: "Comedy", budget: 27.29, revenue: 72.71 },
  { genre: "Drama", budget: 30.07, revenue: 69.93 },
  { genre: "Thriller", budget: 29.98, revenue: 70.04 },
  { genre: "Fantasy", budget: 24.08, revenue: 75.91 },
  { genre: "Family", budget: 24.19, revenue: 75.21 },
  { genre: "Fiction", budget: 26.21, revenue: 73.79 },
  { genre: "Science", budget: 26.21, revenue: 73.79 },
  { genre: "Animation", budget: 23.84, revenue: 76.16 },
  { genre: "Romance", budget: 27.58, revenue: 72.42 },
  { genre: "Crime", budget: 31.28, revenue: 68.74 },
  { genre: "Mystery", budget: 28.36, revenue: 71.64 },
  { genre: "Horror", budget: 26.24, revenue: 73.76 },
  { genre: "War", budget: 33.57, revenue: 66.43 },
  { genre: "History", budget: 36.3, revenue: 63.7 },
  { genre: "Music", budget: 26.99, revenue: 73.01 },
  { genre: "Western", budget: 45.25, revenue: 54.75 },
  { genre: "Documentary", budget: 21.55, revenue: 78.45 },
  { genre: "Foreign", budget: 59.05, revenue: 40.95 },
].map(item => ({
  ...item,
  topMovie: topMoviesByGenre[item.genre] || "N/A"
}));

// Animated bar shape
const AnimatedBarRect = (props) => {
  const { x, y, width, height, fill } = props;
  return (
    <motion.rect
      x={x}
      y={y}
      height={height}
      rx={0}
      initial={{ width: 0 }}
      animate={{ width }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      fill={fill} // This fixes missing color
    />
  );
};

// Tooltip styling with Top Movie info
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const genre = payload[0].payload.genre;
    const topMovie = payload[0].payload.topMovie;
    return (
      <div
        style={{
          background: "#1e1e1e",
          padding: "8px 12px",
          borderRadius: "6px",
          color: "#fff",
        }}
      >
        <strong>{genre}</strong>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(2)}%
          </div>
        ))}
        <div style={{ marginTop: "4px", fontSize: "0.85rem", color: "#ccc" }}>
          🎬 <strong>Top Movie:</strong> {topMovie}
        </div>
      </div>
    );
  }
  return null;
};


export default function Chart4() {
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
        sx={{ color: "#E28D5D", fontWeight: 700 }}
      >
        Top-Grossing Movie by Genre
      </Typography>

      {/* Compact clickable view */}
      <Box
        onClick={handleOpen}
        sx={{
          mt: 2,
          width: "50%",
          maxWidth: 800,
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
          height="98%"
          mt={15}
          // ml={30}
          style={{ cursor: "pointer" }}
        >
          <BarChart
            style={{ cursor: "pointer" }}
            data={chartData}
            margin={{ top: 20, right: 30, bottom: 8, left: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              marginBottom={4}
              dataKey="genre"
              tick={{ fill: "#ccc", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickLine={false}
              interval={0}
              angle={-35}
              textAnchor="end"
            />
            <YAxis
              ticks={[0, 20, 40, 60, 80, 100]}
              tick={{ fill: "#ccc", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend
              wrapperStyle={{ color: "#ccc" }}
              formatter={(value) => (
                <span style={{ color: "#ccc" }}>{value}</span>
              )}
            /> */}
            {/* Compact view */}
            <Bar
              dataKey="budget"
              stackId="a"
              fill={COLOR_BUDGET}
              isAnimationActive={false}
              shape={<AnimatedBarRect />}
            >
              <LabelList
                dataKey="budget"
                position="center"
                formatter={(v) => `${v.toFixed(2)}%`}
                style={{ fill: "#fff", fontSize: 8 }}
              />
            </Bar>
            <Bar
              dataKey="revenue"
              stackId="a"
              fill={COLOR_REVENUE}
              isAnimationActive={false}
              shape={<AnimatedBarRect />}
            >
              <LabelList
                dataKey="revenue"
                position="center"
                formatter={(v) => `${v.toFixed(2)}%`}
                style={{ fill: "#fff", fontSize: 8 }}
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
          borderLeft: "4px solid #3CA45C", // gold accent from your palette
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
          sx={{
            fontSize: "1.3rem",
            mb: 2,
            fontWeight: 700,
            color: "#fff",
            // borderBottom: "1px solid rgba(255,255,255,0.1)",
            pb: 1,
          }}
        >
          Key Insights
        </Typography>
        <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "#ccc" }}>
          <li>
            🎬 <strong>Top Box Office Performers:</strong> Easily spot the
            highest revenue-generating movie within each genre.
          </li>
          <li>
            💰 <strong>Exceptional Outliers:</strong> Green bars highlight
            standout titles delivering revenue far beyond the average.
          </li>
          <li>
            🏆 <strong>Top Movie by Genre:</strong> Tooltip now reveals the
            exact movie name leading in each category.
          </li>
          <li>
            🎨 <strong>Consistent Visual Language:</strong> Color mapping
            mirrors the Power BI dashboard for a seamless analytical experience.
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
                mr: 20,
                // ml: 50,
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
              Top-Grossing Movie by Genre
            </Typography>
            <ResponsiveContainer
              width="90%"
              height="100%"
              key={open ? "full" : "compact"}
              style={{ cursor: "pointer" }}
            >
              <BarChart
                style={{ cursor: "pointer" }}
                data={chartData}
                margin={{ top: 20, right: 80, left: 40, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="genre"
                  tick={{ fill: "#ccc", fontSize: 14 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                  tickLine={false}
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  ticks={[0, 20, 40, 60, 80, 100]}
                  tick={{ fill: "#ccc", fontSize: 14 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100.0]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ color: "#ccc" }}
                  formatter={(value) => (
                    <span style={{ color: "#ccc" }}>{value}</span>
                  )}
                />
                {/* Fullscreen view */}
                <Bar
                  dataKey="budget"
                  name="Budget"
                  stackId="a"
                  fill={COLOR_BUDGET}
                  isAnimationActive={true} // No flicker
                >
                  <LabelList
                    dataKey="budget"
                    position="center"
                    formatter={(v) => `${v.toFixed(2)}%`}
                    style={{ fill: "#fff", fontSize: 12 }}
                  />
                </Bar>
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  stackId="a"
                  fill={COLOR_REVENUE}
                  isAnimationActive={false} // No flicker
                >
                  <LabelList
                    dataKey="revenue"
                    position="center"
                    formatter={(v) => `${v.toFixed(2)}%`}
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
