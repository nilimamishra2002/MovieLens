// Home.jsx
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Tooltip,
  Divider,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import InsightsIcon from "@mui/icons-material/Insights";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SpeedIcon from "@mui/icons-material/Speed";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Footer from "../components/Footer";
// import InfoIcon from "@mui/icons-material/InfoOutlined";

const kpiData = [
  { label: "Total Movies", value: "4,810" },
  { label: "Total Votes", value: "25.6M" },
  { label: "Avg. Rating", value: "8.2/10" },
  { label: "Years Covered", value: "1936 – 2016" },
];

const insights = [
  {
    title: "Top 10 Audience Favorites",
    desc: "Spotlight on the highest-rated movies, ranked by audience votes.",
    icon: <InsightsIcon fontSize="large" sx={{ color: "#70d8ff" }} />,
    path: "/chart1",
    tag: "Ratings",
  },
  {
    title: "Genre Voting Insights",
    desc: "Uncover how audience votes differ across genres.",
    icon: <BarChartIcon fontSize="large" sx={{ color: "#94f094" }} />,
    path: "/chart2",
    tag: "Genre-wise",
  },
  {
    title: "Annual Profit Trends",
    desc: "Track year-by-year growth patterns in movie profitability.",
    icon: <TimelineIcon fontSize="large" sx={{ color: "#ffcf70" }} />,
    path: "/chart3",
    tag: "Profit",
  },
  {
    title: "Budget vs Popularity",
    desc: "Analyze how movie budgets influence vote counts.",
    icon: <AssessmentIcon fontSize="large" sx={{ color: "#db70ff" }} />,
    path: "/chart4",
    tag: "Budget",
  },
  {
    title: "High-Return Efficiency",
    desc: "See which films deliver the highest profit per minute of runtime.",
    icon: <SpeedIcon fontSize="large" sx={{ color: "#FFD700" }} />,
    path: "/chart5",
    tag: "Efficiency",
  },
  {
    title: "Genre ROI Analysis",
    desc: "Compare return-on-investment across genres from top gainers to losses.",
    icon: <TrendingUpIcon fontSize="large" sx={{ color: "#4CAF50" }} />,
    path: "/chart6",
    tag: "ROI",
  },
];


export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Box textAlign="center" py={5}>
        <Typography variant="h4" fontWeight={600} color="#a3d1ff">
          🎬 MovieLens Analytics Dashboard
        </Typography>
        <Typography mt={1} variant="subtitle1" color="gray">
          Explore deep, actionable insights powered by professional Power BI
          visualizations
        </Typography>

        {/* KPI Section */}
        <Box
          mt={4}
          display="flex"
          justifyContent="center"
          gap={4}
          flexWrap="wrap"
        >
          {kpiData.map((kpi) => (
            <Card
              key={kpi.label}
              sx={{
                minWidth: 200,
                p: 2,
                backgroundColor: "#1a1a1a",
                color: "#fff",
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {kpi.label}
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {kpi.value}
              </Typography>
            </Card>
          ))}
        </Box>

        {/* Insight Cards */}
        <Box
          mt={5}
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={4}
        >
          {insights.map((insight) => (
            <Card
              key={insight.title}
              sx={{
                width: 350,
                height: 240, // fixed height for consistency
                p: 3,
                backgroundColor: "#1e1e1e",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // ensures bottom alignment
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 0 20px #454545ff",
                },
              }}
            >
              {/* Top content */}
              <Box>
                <Box mb={2}>{insight.icon}</Box>
                <Typography variant="h6" fontWeight={600}>
                  {insight.title}
                </Typography>
                <Typography variant="body2" color="gray" mt={1}>
                  {insight.desc}
                </Typography>
              </Box>

              {/* Button fixed at bottom */}
              <Box mt="auto">
                <Chip
                  label={insight.tag}
                  variant="outlined"
                  color="info"
                  sx={{ mb: 1 }}
                />
                <CardActions sx={{ p: 0, pt: 2, justifyContent: "center" }}>
                  <Button
                    component={Link}
                    to={insight.path}
                    variant="contained"
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      borderRadius: "14px",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      width: "50%",
                      "&:hover": {
                        backgroundColor: "#1565c0",
                      },
                    }}
                  >
                    VIEW INSIGHT
                  </Button>
                </CardActions>
              </Box>
            </Card>
          ))}
        </Box>

        {/* Dataset Comparison Section */}
        <Box mt={8} textAlign="center">
          <Typography variant="h5" fontWeight={600} color="#a3d1ff" mb={2}>
            📊 Dataset Comparison: Raw vs Cleaned
          </Typography>
          <Typography color="gray" maxWidth={600} mx="auto">
            View how the original MovieLens dataset was cleaned and processed to
            remove nulls, duplicates, and irrelevant entries for better
            analytics.
          </Typography>
          <Box
            mt={3}
            display="flex"
            justifyContent="center"
            gap={4}
            flexWrap="wrap"
          >
            <Button
              component={Link}
              to="/raw-dataset"
              variant="contained"
              color="warning"
            >
              View Comparison
            </Button>
            {/* <Button
              component={Link}
              to="/cleaned-dataset"
              variant="contained"
              color="success"
            >
              View Cleaned Dataset
            </Button> */}
          </Box>
        </Box>

        <Divider sx={{ my: 6, borderColor: "#444" }} />

        {/* Footer */}
        <Footer />
      </Box>
    </motion.div>
  );
}
