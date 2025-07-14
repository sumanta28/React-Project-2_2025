import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonByName, getPokemonCryUrl } from "../api/pokemonapi";
import { toast } from "sonner";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Chip,
  Divider,
  Button,
} from "@mui/material";

const PokemonDetail = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cryUrl, setCryUrl] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getPokemonByName(name)
      .then((data) => {
        setPokemon(data);
        setCryUrl(getPokemonCryUrl(name));
        toast.success(`${data.name.toUpperCase()} loaded!`);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch Pokémon");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [name]);

  if (isLoading || !pokemon) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  const currentId = pokemon.id;
  const prevId = currentId > 1 ? currentId - 1 : null;
  const nextId = currentId + 1;

  const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentId}.png`;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 4 }}>
        <CardMedia
          component="img"
          image={officialArtworkUrl}
          alt={pokemon.name}
          sx={{
            height: 240,
            objectFit: "contain",
            backgroundColor: "#f5f5f5",
            mx: "auto",
            mt: 2,
            width: "200px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            {pokemon.name.toUpperCase()}
          </Typography>

          {/* Cry Audio */}
          <Box sx={{ mt: 2 }}>
            <audio
              controls
              src={cryUrl}
              onError={() =>
                toast.warning("Cry not available for this Pokémon")
              }
              style={{ width: "100%" }}
            />
          </Box>

          {/* Stats */}
          <Divider sx={{ my: 2, borderColor: "black" }} />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "text.secondary" }}
          >
            Stats
          </Typography>
          <List dense>
            {pokemon.stats.map((stat, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={`${stat.stat.name.toUpperCase()}: ${stat.base_stat}`}
                />
              </ListItem>
            ))}
          </List>

          {/* Abilities */}
          <Divider sx={{ my: 2, borderColor: "black" }} />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "text.secondary" }}
          >
            Abilities
          </Typography>
          <List dense>
            {pokemon.abilities.map((ab, i) => (
              <ListItem key={i}>
                <ListItemText primary={ab.ability.name} />
              </ListItem>
            ))}
          </List>

          {/* Types */}
          <Divider sx={{ my: 2, borderColor: "black" }} />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "text.secondary" }}
          >
            Types
          </Typography>
          <Grid container spacing={1}>
            {pokemon.types.map((t, i) => (
              <Grid item key={i}>
                <Chip
                  label={t.type.name.toUpperCase()}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                    color: "#333",
                  }}
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box display="flex" justifyContent="center" gap={2} mt={4}>
            {prevId && (
              <Button
                variant="contained"
                onClick={() => navigate(`/pokemon/${prevId}`)}
              >
                Previous
              </Button>
            )}
            <Button
              variant="contained"
              onClick={() => navigate(`/pokemon/${nextId}`)}
            >
              Next
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PokemonDetail;
