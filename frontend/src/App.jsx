import "./App.css";
import Keyboard from "./components/Keyboard.jsx";
import TestView from "./pages/TestView.jsx";
import Layout from "./components/Layout.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {


  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<TestView/>} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
