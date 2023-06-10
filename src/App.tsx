import { Route, Routes } from "react-router-dom";
// import "./App.css";
import "./sass/index.scss";
import Home from "./pages/home";
import Quiz from "./pages/quizz";

function App() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
