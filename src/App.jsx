import './App.css'
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
 
  return (
   
   <Router>
    <Routes >
    <Route exact path="/" element={<Home />}/>
    <Route path="/login" element={<Login/>}/>
    </Routes>
   </Router>
   
  );
}

export default App;
 