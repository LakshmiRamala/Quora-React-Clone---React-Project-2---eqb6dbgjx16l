import React, { useRef, useEffect } from "react";
import google from "../../Assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase";
import axios from "axios";
import Signup from "./Signup";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const loginUser = async (user) => {
    const config = {
      headers: {
        projectId: "g4hvu8o4jh5h",
        "Content-Type": "application/json",
      }
    };
    try {
      const res = await axios.post(
        "https://academics.newtonschool.co/api/v1/user/login",
        { ...user, appType: "quora" },
        config
      );
      const token = res.data.token;
      console.log("userDetails",res);
      if (token) {
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem("userName", JSON.stringify(res.data.data.name));
        sessionStorage.setItem("userEmail", JSON.stringify(res.data.data.email));
        sessionStorage.setItem("user",JSON.stringify(res.data.data._id));
        navigate("/");
        window.location.reload(true);

      }
      
    } catch (err) {
      setMessage("Incorrect Email Id or Password");
      console.log("Error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    loginUser(userDetails);
  };

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/");
        sessionStorage.setItem("userToken",accessToken);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Google Auth Error:", errorCode, errorMessage);
        setMessage("Google Authentication Failed");
      });
  };
  const openModal = () => {
    setModalOpen(true);
  }

  useEffect(() => {
    document.title = "Quora | Login";
  }, []);
  return (
    <div className="login-container">
      <div className="login-content">
      <form onSubmit={handleSubmit}>
        <div className="quoteByQuara">
          <img
            src="https://s.yimg.com/fz/api/res/1.2/zQmgKfpsyGj3OLKEANNyzw--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/7a7935de-98b7-3619-86a4-123e8c442ac7/t_500x300"
            alt="logo"
          />
          <h4>A place to share knowledge and better understand the world</h4>
        </div>
        <div className="loginOptions">
          <div className="terms_policy">
            <p style={{fontSize:"15px"}}>
              By continuing you indicate that you agree to Quora's <span style={{color:"blue"}}>Terms of
              Service</span> and <span style={{color:"blue"}}>Privacy Policy.</span>
            </p>
            <div className="google_btn" onClick={handleGoogle}>
              <div className="google_logo">
                <img src={google} alt="google" />
              </div>
              <div className="google_text">
                <p style={{fontSize:"18px"}}>Continue with Google</p>
              </div>
            </div>
            <h4>
              Don't have an account?
              <span style={{color:"blue",cursor:"pointer"}} onClick={openModal}>
                Signup
            
              </span>
            </h4>
          </div>
          <div className="loginForm">
              <div
                className="form"
                style={{
                  paddingLeft: "10px",
                }}
              >
                <p className="border" style={{padding:"8px"}}>Login</p>
                <label className="login_label" htmlFor="email">
                  Email
                </label>
                <br />
                <input
                  className="login_input"
                  id="email"
                  type="email"
                  placeholder="Your email"
                  required
                  ref={emailRef}
                />
                <br />
                <label className="login_label" htmlFor="password">
                  Password
                </label>
                <br />
                <input
                  className="login_input"
                  id="password"
                  type="password"
                  placeholder="Your password"
                  required
                  ref={passwordRef}
                />
                <br />
                <b className="errormsg">{message}</b>
                <button type="submit" className="btn-login">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="login_policy">
            About • Careers • Terms • Privacy • Acceptable Use • Businesses • Press • Your Ad Choices • Grievance Officer
            </div>
            {modalOpen && (
        <Signup  closeModal={() => setModalOpen(false)} />
      )}
      </div>
     
    </div>
  );
}

export default Login;