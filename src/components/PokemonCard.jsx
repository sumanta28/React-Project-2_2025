import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

const PokemonCard = ({ name }) => {
  return (
    <Card
      sx={{
        width: 180,
        margin: 2,
        boxShadow: 3,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardActionArea component={Link} to={`/pokemon/${name}`}>
        <CardContent>
          <Typography variant="h6" align="center">
            {name.toUpperCase()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;
