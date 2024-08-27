import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {

  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = async (e) => {
  e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_FRONTEND_URL}/api/v1/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail",email);
      localStorage.setItem("token", json.token);
      console.log(localStorage.getItem("token"));
      navigate("/");
    }

  }
  return (
    <>
      <div className="container">
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"

            />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/createuser" className="m-3 btn btn-danger">SignUp</Link>
        </form>
      </div>
    </>
  )
}
