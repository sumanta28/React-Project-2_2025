import React, { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokemonapi";
import PokemonCard from "../components/PokemonCard";
import PaginationCard from "../components/PaginationCard.jsx";
;
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Paper,
  TextField,
} from "@mui/material";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const LIMIT = 25;
  const totalPages = Math.ceil(totalCount / LIMIT);

  // Debounce effect (500ms)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timeout); // Cleanup on each keystroke
  }, [searchTerm]);

  // Fetch paginated Pokémon
  useEffect(() => {
    getPokemonList(LIMIT, page * LIMIT).then((data) => {
      setPokemons(data.results);
      setTotalCount(data.count);
    });
  }, [page]);

  // Fetch full list only once if needed
  const fetchAllPokemons = async () => {
    if (allPokemons.length === 0) {
      const data = await getPokemonList(1300, 0); // fetch all
      setAllPokemons(data.results);
    }
  };

  useEffect(() => {
    if (debouncedTerm.trim() !== "") {
      fetchAllPokemons();
    }
  }, [debouncedTerm]);

  // Filtered Pokémon
  const displayedPokemons =
    debouncedTerm.trim() === ""
      ? pokemons
      : allPokemons.filter((poke) =>
          poke.name.toLowerCase().includes(debouncedTerm.toLowerCase())
        );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #f1f8e9)",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={5} sx={{ p: 4, borderRadius: 4 }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              letterSpacing: 2,
              color: "primary.main",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
              textTransform: "uppercase",
            }}
          >
            Pokemondex
          </Typography>

          {/* Search Field */}
          <Box display="flex" justifyContent="center" mt={2} mb={4}>
            <TextField
              label="Search Pokémon"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: "300px" }}
            />
          </Box>

          {debouncedTerm && allPokemons.length === 0 ? (
            <Box display="flex" justifyContent="center" mt={5}>
              <CircularProgress size={60} color="secondary" />
            </Box>
          ) : displayedPokemons.length === 0 ? (
            <Typography align="center" color="text.secondary">
              No Pokémon found.
            </Typography>
          ) : (
            <>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <Grid container spacing={3} justifyContent="center">
                  {displayedPokemons.map((poke, i) => (
                    <Grid item key={i}>
                      <PokemonCard name={poke.name} />
                    </Grid>
                  ))}
                </Grid>

                {/* Only show pagination when not searching */}
                {debouncedTerm.trim() === "" && (
                  <Box mt={4}>
                    <PaginationCard
                      page={page}
                      setPage={setPage}
                      totalPages={totalPages}
                    />
                  </Box>
                )}
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
