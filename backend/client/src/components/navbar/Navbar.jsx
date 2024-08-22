import { Link ,useNavigate} from 'react-router-dom';
import './Navbar.scss';
import Badge from "react-bootstrap/Badge"
import { useState } from 'react';
import Modal from "../../Modal.jsx"
import Cart from "../../pages/Cart.jsx"
import {useCart} from "../ContextReducer.jsx"

export default function Navbar() {
  const [cartView,setCartView]=useState(false);
  const navigate=useNavigate();
  let data=useCart();
  const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate("/login");
  }

  return (

    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Get Food</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav d-flex me-auto">
              <li className="nav-item">
                <Link className="fs-5 nav-link active text-white" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("token") ?
                 <li className="nav-item">
                   <Link to="/myorders" className="fs-5 nav-link active text-white" aria-current="page" >My Orders</Link>
                 </li>
                : ""
              }
            </ul>
            {!localStorage.getItem("token") ?
              <div>
                <Link className="btn text-success bg-white me-3" to="/login">Login</Link>
                <Link className="btn text-success bg-white me-2" to="/createuser">SignUp</Link>
              </div>
              :
              <div>
              <div className='btn text-success bg-white me-3' onClick={()=>setCartView(true)}>
                My Cart{" "}
                <Badge pill bg="danger">{data.length}</Badge>
              </div>
              {cartView ? <Modal onClose={()=>setCartView(false)}><Cart /></Modal>:null}
              <div className='btn text-danger bg-white me-3' onClick={handleLogout}>
                Logout
                </div>
                </div>
          }

          </div>
        </div>
      </nav>
    </div>

  )
}
