import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from '@mui/material';
import React from 'react';

const formatter = new Intl.NumberFormat('en-BD', {
  style: 'currency',
  currency: 'BDT',
  maximumFractionDigits: 2,
});

const BootCampCard = ({ bootCamp }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={<Typography variant="h6">{bootCamp.name}</Typography>}
      />
      <CardContent>
        <Typography variant="caption">{bootCamp.description}</Typography>
        <Typography variant="h6" gutterBottom>
          {formatter.format(bootCamp.price)}
        </Typography>
        <Rating
          name="half-rating"
          defaultValue={bootCamp.rating}
          size="small"
          readOnly
          precision={0.5}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" color="primary">
          Book Now
        </Button>
        <Button variant="contained" size="small" color="secondary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default BootCampCard;
