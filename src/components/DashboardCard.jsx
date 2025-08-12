import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ title, description, image, route }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, m: 2, boxShadow: 6, transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        <Button onClick={() => navigate(route)} sx={{ mt: 1 }}>View Details</Button>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
