import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../../data/login-firebase";
import "./reset.css";
import Logo from "../../components/logo/logo";
import { Button } from "../../components/button/button.style";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard/calendar");
  }, [user, loading, navigate]);
  return (
    <div>
      <Logo></Logo>
      <div className="reset">
        <div className="reset-container overflow-hidden shadow-lg">
          <input
            type="text"
            className="reset-textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <Button onClick={() => sendPasswordResetEmail(email)}>Send password reset email</Button>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reset;