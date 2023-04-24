import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import "./register.css";
import Logo from "../logo/logo";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) return alert("Please enter name");
    if (!email) return alert("Please enter an email");
    if (!password) return alert("Please enter a password");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard/calendar");
  }, [user, loading, navigate]);
  return (
    <div>
      <Logo></Logo>
      <div className="register">
        <div className="register-container overflow-hidden shadow-lg">
          <input
            type="text"
            className="register-textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="register-textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="register-textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="register-btn" onClick={register}>
            Register
          </button>
          <button
            className="register-btn register-google"
            onClick={signInWithGoogle}
          >
            Register with Google
          </button>
          <div>
            Already have an account? <Link to="/">Login</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;