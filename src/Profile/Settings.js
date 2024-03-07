import React, { useContext, useState } from "react";
import { DarkModeContext } from "../components/utils/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function Settings() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const email = JSON.parse(sessionStorage.getItem("userEmail"));
  const username = JSON.parse(sessionStorage.getItem("userName"));
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [country, setCountry] = useState(
    JSON.parse(sessionStorage.getItem("userCountry")) || ""
  );
  const [phone, setPhone] = useState(
    JSON.parse(sessionStorage.getItem("userPhone")) || ""
  );
  const [filled, setFilled] = useState(false);
  const navigate = useNavigate();

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login", { replace: true });
    window.location.reload(true);
  };

  const handleSubmit = () => {
    if (country || phone) {
      if (country) sessionStorage.setItem("userCountry", JSON.stringify(country));
      if (phone) sessionStorage.setItem("userPhone", JSON.stringify(phone));
      setFilled(true);
    }
  };

  return (
    <div style={{ color: darkMode ? "white" : "black", paddingTop:!isMobile? "5%":"120px", marginLeft:!isMobile? "25%": "5%", width: !isMobile ?"40%":"80%", }}>
      <div>
        <h3 style={{ borderBottom: darkMode ? '1px solid #474646' : '1px solid lightgrey' }}>Account Settings</h3>
        <div className="flexPro" style={{ borderBottom: darkMode ? '1px solid #474646' : '1px solid lightgrey', gap: "30%", height: "50px" }}>
          <label htmlFor="email" style={{width:"20%"}}>Email:</label>
          <input type="email" value={email} id="email" name="email" className={darkMode ? "profilesetting" : "darkProfilsettng"} readOnly />
        </div>
        <div className="flexPro" style={{ borderBottom: darkMode ? '1px solid #474646' : '1px solid lightgrey', gap: "30%", height: "50px" }}>
          <label htmlFor="user" style={{width:"20%"}}>Name:</label>
          <input type="text" value={username} id="user" name="user" className={darkMode ? "profilesetting" : "darkProfilsettng"} readOnly />
        </div>
        <div className="flexPro" style={{ borderBottom: darkMode ? '1px solid #474646' : '1px solid lightgrey', gap: "30%", height: "50px" }}>
          <label htmlFor="country" style={{width:"20%"}}>Country:</label>
          <input
            type="text"
            value={country}
            id="country"
            name="country"
            className={darkMode ? "profilesetting" : "darkProfilsettng"}
            onChange={handleCountry}
            placeholder="Enter your country"
          />
        </div>
        <div className="flexPro" style={{ borderBottom: darkMode ? '1px solid #474646' : '1px solid lightgrey', gap: "30%", height: "50px" }}>
          <label htmlFor="phone" style={{width:"20%"}}>Phone:</label>
          <input
            type="text"
            value={phone}
            id="phone"
            name="phone"
            className={darkMode ? "profilesetting" : "darkProfilsettng"}
            onChange={handlePhone}
            placeholder="Enter your phone number"
            maxLength={10}
          />
        </div>
        <div className="flexPro" style={{ justifyContent: "flex-start", gap: "10%" }}>
          <h4 onClick={handleLogout}>Logout</h4>
          <button className="btn-login" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
