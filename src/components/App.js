import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/app.css';
import { useSelector, useDispatch } from 'react-redux';
import { Home, QuizPreview, TestBoard } from "../pages/index"

export default function App(props) {
  const quizReducer = useSelector((state) => state.quizReducer);
  const dispatch = useDispatch();
  const { quizStatus } = quizReducer;

  const Page404 = () => {
    return <h1>404</h1>
  };

  const PrivateRoute = ({ children }) => {
    console.log("============Navigate==========")
    if (quizStatus !== "Active") {
      return children;
    }
    return <Navigate to="/TestBoard" />
  }


  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
        <Route path="/TestBoard" element={<TestBoard />} />
        <Route path="/QuizPreview" element={<PrivateRoute> <QuizPreview /> </PrivateRoute>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}