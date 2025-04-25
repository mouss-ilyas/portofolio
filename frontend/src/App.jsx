import "./App.css";
import i from "./images/logo.png";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Projects from "./project/project";
import Home from "./home/home";
import LearnTools from "./learnTools/learnTools";
import Contact from "./Contact/Contact";
import AdminDashbord from "./AdminDashbord/AdminDashbord"
import Login from "./login/login";
import Footer from "./footer";

function App() {
  
  return (
    <Router> 
    <div>
      <nav className="d-flex flex-column flex-sm-row justify-content-between m-2">
        <div className="mb-3 text-center mb-sm-0 me-sm-4">
          <img src={i} alt="Logo" />
        </div>
        <ul className="d-flex flex-column flex-sm-row justify-content-around m-0 p-0 ">
          <li className="mx-2">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-2">
            <Link to="/projects">Projects</Link>
          </li>
          <li className="mx-2">
            <Link to="/learnTools">Learn & Tools</Link>
          </li>
          <li className="mx-2">
            <Link to="/contact">Contact Me</Link>
          </li>
        </ul>
      </nav>

      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects islogin={false} />} />
        <Route path="/learnTools" element={<LearnTools />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AdminDashbord/*" element={<AdminDashbord />} />
      </Routes>

      <div className="loginbutton mb-2">
        <Link to="/login">login to admin space</Link>
      </div>
      <Footer/>
    </div>
  </Router>
  );
}

export default App;
