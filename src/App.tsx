import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="add-book" element={<AddBook />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
