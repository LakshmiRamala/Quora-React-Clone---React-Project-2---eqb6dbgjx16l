import React, { useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import Signup from "./Signup";
import { useAuth } from "./AuthProvider";
import { useMediaQuery } from "react-responsive";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { state } = useLocation();
  const { setIsLoggedIn } = useAuth();
  const isMobile = useMediaQuery({ maxWidth: 768 });

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
      if (token) {
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem("userName", JSON.stringify(res.data.data.name));
        sessionStorage.setItem("userEmail", JSON.stringify(res.data.data.email));
        sessionStorage.setItem("user",JSON.stringify(res.data.data._id));
        setIsLoggedIn(true);
        if (state) {
          navigate(state.prevPath);
        } else {
          navigate("/");
        }


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

  const openModal = () => {
    setModalOpen(true);
  }

  useEffect(() => {
    document.title = "Quora | Login";
  }, []);
  return (
    <div className="login-container">
      <div className="login-content" style={{width:isMobile && "90%",marginTop:isMobile && "20%"}}>
      <form onSubmit={handleSubmit}>
        <div className="quoteByQuara" style={{display:isMobile&& "flex",flexDirection:isMobile && "column",alignItems:isMobile && "center"}}>
          <img
            src="https://s.yimg.com/fz/api/res/1.2/zQmgKfpsyGj3OLKEANNyzw--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/7a7935de-98b7-3619-86a4-123e8c442ac7/t_500x300"
            alt="logo"
          />
          <h4>A place to share knowledge and better understand the world</h4>
        </div>
        <div className="loginOptions" style={{display:isMobile&& "flex",flexDirection:isMobile && "column"}}>
          <div className="terms_policy">
            <p style={{fontSize:"15px",cursor:"not-allowed"}}>
              By continuing you indicate that you agree to Quora's <span style={{color:"blue"}}>Terms of
              Service</span> and <span style={{color:"blue"}}>Privacy Policy.</span>
            </p>
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
        <div className="login_policy" style={{cursor:"not-allowed"}}>
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