import "./App.css";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import TestView from "./pages/TestView/TestView.jsx";
import Layout from "./components/Layout/Layout.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {


  return (
    <BrowserRouter>
      {/* <section>
        <h1>Bogo Type</h1>
        <TestView />
        <Keyboard pressedKey={pressedKey} />
      </section> */}
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
