import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../data/login-firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css";
import Logo from "../../components/logo/logo";
import { Button } from "../../components/button/button.style";
import { Input } from "../../components/input/input.style";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard/calendar");
  }, [user, loading, navigate]);
  return (
    <div>
      <Logo></Logo>
      <div className="login">
        <div className="login-container overflow-hidden shadow-lg">
          <Input
            type="text"
            name="userName"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button name="loginBtn" theme='black' onClick={() => logInWithEmailAndPassword(email, password)}>Login</Button>
          <Button onClick={signInWithGoogle}>Login with Google</Button>
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;