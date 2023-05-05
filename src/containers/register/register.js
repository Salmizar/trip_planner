import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import "./register.css";
import Logo from "../../components/logo/logo";
import { Button } from "../../components/button/button.style";
import { Input } from "../../components/input/input.style";

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
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button onClick={register} theme='black'>Register</Button>
          <Button onClick={signInWithGoogle}>Register with Google</Button>
          <div>
            Already have an account? <Link to="/">Login</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;