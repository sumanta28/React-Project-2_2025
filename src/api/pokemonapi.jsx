import axios from 'axios';

export const getPokemonList = async (limit = 24, offset = 0) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  return res.data;
};

export const getPokemonByName = async (name) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return res.data;
};

export const getPokemonCryUrl = (name) => {
  return `https://play.pokemonshowdown.com/audio/cries/${name.toLowerCase()}.mp3`;
};
