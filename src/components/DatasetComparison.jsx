import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material";
import rawDatasetImg from "../assets/raw_dataset.png"; // Replace with your screenshot
import cleanedDatasetImg from "../assets/cleaned_dataset.png"; // Replace with your screenshot

function DatasetComparison() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Raw vs Processed Dataset
      </Typography>

      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        A key transformation in this project involved unpivoting the <strong>Genres</strong> column. In the raw dataset,
        genres were stored as clustered strings, making analysis inflexible. In the cleaned dataset used for
        visualization, genres were split and unpivoted into individual rows, enabling genre-wise aggregation and
        clarity in visual storytelling.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Raw Dataset (Clustered Genres)
              </Typography>
              <Box
                component="img"
                src={rawDatasetImg}
                alt="Raw Dataset"
                sx={{ width: "100%", borderRadius: 2, boxShadow: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Processed Dataset (Unpivoted Genres)
              </Typography>
              <Box
                component="img"
                src={cleanedDatasetImg}
                alt="Cleaned Dataset"
                sx={{ width: "100%", borderRadius: 2, boxShadow: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="body2" align="center" sx={{ mt: 4, color: "gray" }}>
        This preprocessing step enabled visualizations like "Genre-wise Average Rating" and "Revenue by Genre" to
        be meaningful and accurate.
      </Typography>
    </Container>
  );
}

export default DatasetComparison;