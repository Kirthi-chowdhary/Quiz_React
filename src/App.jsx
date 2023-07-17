import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Layout from "./components/Layout/Layout"
import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/Quiz";
import Score from "./components/Score/Score";
import { useState, useEffect } from "react";

function App() {

  
  return (
    <Layout>
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/score" element={<Score/>}/>
      </Routes>
    </Router>
    </Layout>
  );
}

export default App;
