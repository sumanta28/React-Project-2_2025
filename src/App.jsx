import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import { Toaster } from "sonner";

const App = () => {
  return (
    <BrowserRouter>
    <Toaster richColors position="bottom-right" />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
