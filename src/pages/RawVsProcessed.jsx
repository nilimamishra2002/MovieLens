import React from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Footer from "../components/Footer";

const rawData = [
  {
    index: 0,
    budget: "2.37E+08",
    genres: "Action Adventure Fantasy Science Fiction",
    homepage: "http://www.avatarmovie.com/",
    id: 19995,
    keywords: "culture clash future space war",
    original_language: "en",
    original_title: "Avatar",
    overview: "In the 22nd century...",
    popularity: 150.4376,
    production_companies: '["name": "Twentieth Century Fox Film Corporation"]',
    release_date: "2009-12-10",
    revenue: "2.79E+09",
    runtime: 162,
    spoken_languages: '["iso_639_1": "en"]',
    status: "Released",
    tagline: "Enter the World of Pandora.",
    title: "Avatar",
    vote_average: 7.2,
    vote_count: 11800,
    cast: "Sam Worthington",
    crew: '["name": "James Cameron"]',
    director: "James Cameron",
  },
  {
    index: 1,
    budget: "3E+08",
    genres: "Adventure",
    homepage: "http://disney.go.com/disneypictures/pirates/",
    id: 285,
    keywords: "ocean drug",
    original_language: "en",
    original_title: "Pirates of the Caribbean: At World's End",
    overview:
      "Captain Barbossa, Will Turner and Elizabeth Swann must sail off the edge of the map...",
    popularity: 139.0826,
    production_companies: '["name": "Walt Disney Pictures"]',
    release_date: "2007-05-19",
    revenue: "9.61E+08",
    runtime: 169,
    spoken_languages: '["iso_639_1": "en"]',
    status: "Released",
    tagline: "At the end of the world, the adventure begins.",
    title: "Pirates of the Caribbean: At World's End",
    vote_average: 6.9,
    vote_count: 4500,
    cast: "Johnny Depp",
    crew: '["name": "Gore Verbinski"]',
    director: "Gore Verbinski",
  },
  {
    index: 2,
    budget: "2.45E+08",
    genres: "Action Adventure",
    homepage: "http://www.sonypictures.com/movies/spectre/",
    id: 206647,
    keywords: "spy based",
    original_language: "en",
    original_title: "Spectre",
    overview:
      "A cryptic message from Bond’s past sends him on a trail to uncover a sinister organization...",
    popularity: 107.3768,
    production_companies: '["name": "Columbia Pictures"]',
    release_date: "2015-10-26",
    revenue: "8.81E+08",
    runtime: 148,
    spoken_languages: '["iso_639_1": "en"]',
    status: "Released",
    tagline: "A Plan No One Escapes",
    title: "Spectre",
    vote_average: 6.3,
    vote_count: 4466,
    cast: "Daniel Craig",
    crew: '["name": "Sam Mendes"]',
    director: "Sam Mendes",
  },
  {
    index: 3,
    budget: "2.5E+08",
    genres: "Action Crime",
    homepage: "http://www.thedarkknightrises.com/",
    id: 49026,
    keywords: "dc comics",
    original_language: "en",
    original_title: "The Dark Knight Rises",
    overview:
      "Following the death of District Attorney Harvey Dent, Batman assumes responsibility...",
    popularity: 112.313,
    production_companies: '["name": "Legendary Pictures"]',
    release_date: "2012-07-16",
    revenue: "1.08E+09",
    runtime: 165,
    spoken_languages: '["iso_639_1": "en"]',
    status: "Released",
    tagline: "The Legend Ends",
    title: "The Dark Knight Rises",
    vote_average: 7.6,
    vote_count: 9106,
    cast: "Christian Bale",
    crew: '["name": "Christopher Nolan"]',
    director: "Christopher Nolan",
  },
  {
    index: 4,
    budget: "2.6E+08",
    genres: "Action Adventure",
    homepage: "http://movies.disney.com/john-carter",
    id: 49529,
    keywords: "based on novel",
    original_language: "en",
    original_title: "John Carter",
    overview: "Lost in our world, found in another.",
    popularity: 43.927,
    production_companies: '["name": "Walt Disney Pictures"]',
    release_date: "2012-03-07",
    revenue: "2.84E+08",
    runtime: 132,
    spoken_languages: '["iso_639_1": "en"]',
    status: "Released",
    tagline: "Lost in our world, found in another.",
    title: "John Carter",
    vote_average: 6.1,
    vote_count: 2124,
    cast: "Taylor Kitsch",
    crew: '["name": "Andrew Stanton"]',
    director: "Andrew Stanton",
  },
  {
    index: 5,
    budget: "2.58E+08",
    genres: "Fantasy Action",
    homepage: "http://www.sonypictures.com/movies/spiderman3/",
    id: 559,
    keywords: "dual identity",
    original_language: "en",
    original_title: "Spider-Man 3",
    overview:
      "The seemingly invincible Spider-Man goes up against an all-new crop of villains...",
    popularity: 115.6998,
    production_companies: '["name": "Marvel Enterprises"]',
    release_date: "2007-05-01",
    revenue: "8.91E+08",
    runtime: 139,
    spoken_languages: '["iso_639_1": "en"]',
    status: "Released",
    tagline: "The battle within.",
    title: "Spider-Man 3",
    vote_average: 5.9,
    vote_count: 3576,
    cast: "Tobey Maguire",
    crew: '["name": "Sam Raimi"]',
    director: "Sam Raimi",
  },
  {
    index: 6,
    budget: "2.6E+08",
    genres: "Animation",
    homepage: "http://disney.go.com/disneypictures/tangled/",
    id: 38757,
    keywords: "hostage",
    original_language: "en",
    original_title: "Tangled",
    overview:
      "When the kingdom's most wanted—and most charming—bandit Flynn Rider hides out...",
    popularity: 48.68197,
    production_companies: '["name": "Walt Disney Pictures"]',
    release_date: "2010-11-24",
    revenue: "5.92E+08",
    runtime: 100,
    spoken_languages: '["iso_639_1": "en"]',
    status: "Released",
    tagline: "They're taking adventure to new lengths.",
    title: "Tangled",
    vote_average: 7.4,
    vote_count: 3330,
    cast: "Zachary Levi",
    crew: '["name": "Byron Howard"]',
    director: "Byron Howard",
  },
  {
    index: 7,
    budget: "2.8E+08",
    genres: "Action Adventure",
    homepage: "http://marvel.com/avengers_movie",
    id: 99861,
    keywords: "marvel comic",
    original_language: "en",
    original_title: "Avengers: Age of Ultron",
    overview:
      "When Tony Stark tries to jumpstart a dormant peacekeeping program...",
    popularity: 134.2792,
    production_companies: '["name": "Marvel Studios"]',
    release_date: "2015-04-22",
    revenue: "1.41E+09",
    runtime: 141,
    spoken_languages: '["iso_639_1": "en"]',
    status: "Released",
    tagline: "A New Age Has Come.",
    title: "Avengers: Age of Ultron",
    vote_average: 7.3,
    vote_count: 6767,
    cast: "Robert Downey Jr.",
    crew: '["name": "Joss Whedon"]',
    director: "Joss Whedon",
  },
  {
    index: 8,
    budget: "2.5E+08",
    genres: "Adventure",
    homepage: "http://harrypotter.warnerbros.com/",
    id: 767,
    keywords: "witch magic",
    original_language: "en",
    original_title: "Harry Potter and the Half-Blood Prince",
    overview: "As Harry begins his sixth year at Hogwarts...",
    popularity: 98.88564,
    production_companies: '["name": "Warner Bros. Pictures"]',
    release_date: "2009-07-07",
    revenue: "9.34E+08",
    runtime: 153,
    spoken_languages: '["iso_639_1": "en"]',
    status: "Released",
    tagline: "Dark Secrets Revealed",
    title: "Harry Potter and the Half-Blood Prince",
    vote_average: 7.4,
    vote_count: 5293,
    cast: "Daniel Radcliffe",
    crew: '["name": "David Yates"]',
    director: "David Yates",
  },
  {
    index: 9,
    budget: "2.5E+08",
    genres: "Action Adventure",
    homepage: "http://www.batmanvsupermandawnofjustice.com/",
    id: 209112,
    keywords: "dc comics",
    original_language: "en",
    original_title: "Batman v Superman: Dawn of Justice",
    overview:
      "Fearing the actions of Superman, Batman takes on the Man of Steel...",
    popularity: 155.7905,
    production_companies: '["name": "DC Comics"]',
    release_date: "2016-03-23",
    revenue: "8.73E+08",
    runtime: 151,
    spoken_languages: '["iso_639_1": "en"]',
    status: "Released",
    tagline: "Justice or Revenge",
    title: "Batman v Superman: Dawn of Justice",
    vote_average: 5.7,
    vote_count: 7004,
    cast: "Ben Affleck",
    crew: '["name": "Zack Snyder"]',
    director: "Zack Snyder",
  },
];

const cleanedData = [
  {
    title: "Avatar",
    release_date: "2009-12-10",
    budget: 237000000,
    revenue: 2787965087,
    profit: 2550965087,
    runtime: 162,
    genres: "Action, Adventure, Fantasy, Science Fiction",
    // original_language: "en",
    vote_average: 7.2,
    vote_count: 11800,
    popularity: 150.437577,
  },
   {
    title: "Pirates of the Caribbean: At World's End",
    release_date: "2007-05-19",
    budget: 300000000,
    revenue: 961000000,
    profit: 661000000,
    runtime: 169,
    genres: "Adventure",
    vote_average: 6.9,
    vote_count: 4500,
    popularity: 139.0826,
  },
  {
    title: "Spectre",
    release_date: "2015-10-26",
    budget: 245000000,
    revenue: 881000000,
    profit: 636000000,
    runtime: 148,
    genres: "Action, Adventure",
    vote_average: 6.3,
    vote_count: 4466,
    popularity: 107.3768,
  },
  {
    title: "The Dark Knight Rises",
    release_date: "2012-07-16",
    budget: 250000000,
    revenue: 1080000000,
    profit: 835000000,
    runtime: 165,
    genres: "Action, Crime",
    vote_average: 7.6,
    vote_count: 9106,
    popularity: 112.313,
  },
  {
    title: "John Carter",
    release_date: "2012-03-07",
    budget: 260000000,
    revenue: 284000000,
    profit: 24139100,
    runtime: 132,
    genres: "Action, Adventure",
    vote_average: 6.1,
    vote_count: 2124,
    popularity: 43.927,
  },
  {
    title: "Spider-Man 3",
    release_date: "2007-05-01",
    budget: 258000000,
    revenue: 891000000,
    profit: 633000000,
    runtime: 139,
    genres: "Fantasy, Action",
    vote_average: 5.9,
    vote_count: 3576,
    popularity: 115.6998,
  },
  {
    title: "Tangled",
    release_date: "2010-11-24",
    budget: 260000000,
    revenue: 592000000,
    profit: 332000000,
    runtime: 100,
    genres: "Animation",
    vote_average: 7.4,
    vote_count: 3330,
    popularity: 48.68197,
  },
  {
    title: "Avengers: Age of Ultron",
    release_date: "2015-04-22",
    budget: 280000000,
    revenue: 1410000000,
    profit: 1132000000,
    runtime: 141,
    genres: "Action, Adventure",
    vote_average: 7.3,
    vote_count: 6767,
    popularity: 134.2792,
  },
  {
    title: "Harry Potter and the Half-Blood Prince",
    release_date: "2009-07-07",
    budget: 250000000,
    revenue: 934000000,
    profit: 684000000,
    runtime: 153,
    genres: "Adventure",
    vote_average: 7.4,
    vote_count: 5293,
    popularity: 98.88564,
  },
  {
    title: "Batman v Superman: Dawn of Justice",
    release_date: "2016-03-23",
    budget: 250000000,
    revenue: 873000000,
    profit: 623000000,
    runtime: 151,
    genres: "Action, Adventure",
    vote_average: 5.7,
    vote_count: 7004,
    popularity: 155.7905,
  }
];

// function DownloadButton({ label, url }) {
//   return (
//     <Button
//       variant="contained"
//       color="primary"
//       startIcon={<CloudDownloadIcon />}
//       sx={{ mt: 2 }}
//       href={url}
//       target="_blank"
//     >
//       {label}
//     </Button>
//   );
// }

export default function RawVsProcessed() {
  const [tab, setTab] = React.useState(0);
  const handleTabChange = (_, newValue) => setTab(newValue);

  const renderTable = (columns, rows) => (
    <TableContainer component={Paper} sx={{ backgroundColor: "#121212" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col, idx) => (
              <TableCell key={idx} sx={{ color: "white", fontWeight: 600 }}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col, idx) => (
                <TableCell key={idx} sx={{ color: "white" }}>
                  {row[col]?.toString().slice(0, 50)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ bgcolor: "#000", minHeight: "100vh", p: 4 }}>
      <Typography variant="h4" color="white" gutterBottom>
        Raw vs Cleaned Dataset Comparison
      </Typography>
      <Typography variant="body1" color="gray" mb={4}>
        This section showcases the transformation of the original dataset into a
        cleaned, analysis-ready format. The raw dataset includes clustered
        genres and redundant metadata, while the cleaned version presents
        simplified, comma-separated genres and normalized data structure —
        better suited for Power BI analytics and filtering.
      </Typography>

      <Tabs
        value={tab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Raw Dataset" sx={{ color: tab === 0 ? "white" : "gray" }} />
        <Tab
          label="Cleaned Dataset"
          sx={{ color: tab === 1 ? "white" : "gray" }}
        />
      </Tabs>

      <Box mt={3} >
        {tab === 0 && (
          <>
            {renderTable(Object.keys(rawData[0]), rawData)}
            {/* <DownloadButton
              label="Download Raw Dataset"
              url="https://your-cloud-link/raw-dataset.xlsx"
            /> */}
          </>
        )}
        {tab === 1 && (
          <>
            {renderTable(Object.keys(cleanedData[0]), cleanedData)}
            {/* <DownloadButton
              label="Download Cleaned Dataset"
              url="https://your-cloud-link/cleaned-dataset.xlsx"
            /> */}
          </>
        )}
      </Box>

       <Divider sx={{ width: "100%", my: 6, borderColor: "#444" }} />
                        {/* Footer */}
                        <Footer />
    </Box>
  );
}
