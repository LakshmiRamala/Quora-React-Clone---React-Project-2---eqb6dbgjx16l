import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

function Signup({closeModal}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const createUser = async (user) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          projectId: "g4hvu8o4jh5h"
        }     
   };

      const res = await axios.post(
        "https://academics.newtonschool.co/api/v1/user/signup",
        { ...user, appType: "quora" },
        config
      );
      const token = res.data.token;
      if (token) {
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem("userName", JSON.stringify(res.data.data.user.name));
        sessionStorage.setItem("userEmail", JSON.stringify(res.data.data.user.email));
              navigate("/");
      }
    } catch (err) {
      console.error("Error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("An error occurred during signup.");
      }
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    createUser(userDetails);
  };
  
  useEffect(() => {
    document.title = "Quora | SignUp";
  }, []);

  return (
    <div className="modal-container">
      <div className="Signup-container" style={{width:isMobile && "85%"}}>
      <button className="close" onClick={() => closeModal(false)}>
              X
            </button>
              <h3>Signup</h3>
             
              <label className="login_label" htmlFor="name">
                Name
              </label>
              <br />
              <input
                className="login_input"
                id="name"
                type="text"
                placeholder="Your Name"
                required
                ref={nameRef}
              />
              <br />
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
              <button className="btn-login" onClick={handleSubmit}>
                Signup
              </button>
            </div>
            </div>
         
  );
}

export default Signup;