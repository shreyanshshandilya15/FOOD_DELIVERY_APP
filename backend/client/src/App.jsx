import './App.css'
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './pages/SignUp.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import MyOrder from './pages/MyOrder.jsx'

function App() {
 
  return (
   <CartProvider>
   <Router>
    <Routes >
    <Route exact path="/" element={<Home />}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/createuser" element={<SignUp/>}/>
    <Route path="/myorders" element={<MyOrder />}/>
    </Routes>
   </Router>
   </CartProvider>
  );
}

export default App;
