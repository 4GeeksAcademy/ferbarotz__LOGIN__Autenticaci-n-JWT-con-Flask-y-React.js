import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./Form";

const App = () => {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true, // activa el nuevo comportamiento para evitar el warning
      }}
    >
      <Routes>
        <Route path="/" element={<Form />} />
        {/* Aquí otras rutas si tienes */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;