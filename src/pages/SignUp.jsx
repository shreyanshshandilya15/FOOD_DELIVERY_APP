import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

    const navigate=useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
                try{
                    const response = await fetch("http://localhost:4000/api/v1/createuser", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name: name, email: email, password: password, location: location })
                    });
                    const json = await response.JSON;
                    console.log(json);
                    navigate("/");
                }
              catch(err){
                console.log(err);
              }
                    
    }
 
    return (
        <>
            <div className="container">
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
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
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
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
                    <Link to="/login" className="m-3 btn btn-danger">Already a User?</Link>
                </form>
            </div>
        </>
    )
}

