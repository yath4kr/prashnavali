import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Navbar } from "./Components/Navbar";
import { Register } from "./Pages/Register";
import { SignIn } from "./Pages/SignIn";
import { Start } from "./Pages/Start";
import { Profile } from "./Pages/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/start" element={<Start />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
