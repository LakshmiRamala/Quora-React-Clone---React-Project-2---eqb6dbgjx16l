import React, { useContext, useState, useEffect, useRef } from "react";
import { DarkModeContext } from "./DarkModeContext";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/UserSlice";

export default function Profile() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const name=JSON.parse(sessionStorage.getItem("userName"));
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handlelogout = () => {
    auth.signOut();
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userEmail");
    window.location.reload(true);
  
    navigate("/", { replace: true }); 
    window.location.reload(true);
    

  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="globeContainer">
     {user && <div id="ProfileIcon" onClick={toggleDropdown}>
      <Avatar src={user?.photo} alt="profile_img" />
      </div>}
     {name && <main id="ProfileIcon" onClick={toggleDropdown}>{name.charAt(0).toUpperCase()}</main>}
      {isOpen && (
        <div className="globeCard ProfileCard" ref={dropdownRef}
          style={{
            background: darkMode ? '#262626' : '#fff',
            color: darkMode ? '#d5d6d6' : 'black',
            border: darkMode ? '1px solid #474646' : '1px solid lightgrey',
            
          }}>
          <section>
          <div style={{padding:"0% 3%",paddingTop:"10%",borderBottom: darkMode ? '1px solid #474646' : '1px solid lightgrey'}}>
            
            {user &&<Avatar src={user?.photo} alt="profile_img" style={{width:"50px",height:"50px"}}/>}
            {name && <main id="ProfileIcon" onClick={toggleDropdown} style={{width:"50px",height:"50px"}}>{name.charAt(0).toUpperCase()}</main>}
           
          <div className="flexjust"><h3>{user ? user.username:name} </h3><span><KeyboardArrowRightIcon/></span></div>
          </div>
          <section style={{padding:"1% 3%",borderBottom: darkMode ? '1px solid #474646' : '1px solid lightgrey'}}>
            <p className="flexside"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M7 4.5h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-3l-3.5 4v-4H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Zm13 8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2v2l-2-2h-2" className="icon_svg-stroke" strokeWidth="1.5" stroke={darkMode ?"#d5d6d6" : "#666"} strokeLinecap="round" strokeLinejoin="round"></path><g className="icon_svg-fill_as_stroke" fill={darkMode ?"#d5d6d6" : "#666"}><circle cx="8" cy="10.5" r="1"></circle><circle cx="11" cy="10.5" r="1"></circle><circle cx="14" cy="10.5" r="1"></circle></g></g></svg>Messages</p>
            <p className="flexside"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 9.5 17 5v12L3 12.5v-3Zm4.853 4.56L9.5 19H7l-1.947-5.84 2.8.9ZM19.5 7.5l2-1-2 1Zm0 3.5H22h-2.5Zm0 3.5 2 1-2-1ZM8 10.4l6-1.9-6 1.9Z" className="icon_svg-stroke" stroke={darkMode ?"#d5d6d6" : "#666"} strokeWidth="1.5" fill="none" strokeLinejoin="round"></path></svg>Create Ad</p>
            <p className="flexside"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 4v16m3.75-13H9.625C8.175 7 7 8.12 7 9.5S8.175 12 9.625 12h3.75C14.825 12 16 13.12 16 14.5S14.825 17 13.375 17H7" className="icon_svg-stroke" stroke={darkMode ?"#d5d6d6" : "#666"} strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path></svg>Monetization</p>
            <p className="flexside"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h3v8H5v-8Zm5.5-8h3v16h-3V4ZM16 7h3v13h-3V7Z" className="icon_svg-stroke icon_svg-fill" strokeWidth="1.5" stroke={darkMode ?"#d5d6d6" : "#666"} fill="none" strokeLinecap="round" strokeLinejoin="round"></path></svg>Your content & stats</p>
            <p className="flexside"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" strokeWidth="1.5" stroke={darkMode ?"#d5d6d6" : "#666"} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"><path className="icon_svg-fill" d="m10.501 16-5.499 4L5 8h11v12z"></path><path d="M8 5.923V5h11v12l-.997-.725"></path></g></svg>Bookmarks</p>
            <p className="flexside"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.743 10.757h0a1.5 1.5 0 0 1 0 2.122l-5.728 5.727-2.756.638.635-2.76 5.727-5.727a1.5 1.5 0 0 1 2.122 0Zm-3.182 1.061 2.121 2.121M9 19H5V5h13v3M8 9h7m-7 3h5.5M8 15h2.5" className="icon_svg-stroke" strokeWidth="1.5" stroke={darkMode ?"#d5d6d6" : "#666"} fill="none" strokeLinecap="round" strokeLinejoin="round"></path></svg>Drafts</p>
            <p className="flexside"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="icon_svg-fill_as_stroke" fillRule="evenodd" clipRule="evenodd" d="M2 12.889h2.444a6.668 6.668 0 0 1 6.667 6.667V22h1.778v-2.444a6.668 6.668 0 0 1 6.667-6.667H22V11.11h-2.444a6.668 6.668 0 0 1-6.667-6.667V2H11.11v2.444a6.668 6.668 0 0 1-6.667 6.667H2v1.778Z" fill={darkMode ?"#d5d6d6" : "#666"}></path></svg>Try Quora+</p>
          </section>
          <section  style={{fontSize:"14px",padding:"1% 3%", borderBottom: darkMode ? '1px solid #474646' : '1px solid lightgrey',cursor:"pointer"}}>
            <p className="flexjust"><span>Dark Mode </span> <label className="switch">
                <input
                  type="checkbox"
                  onChange={toggleDarkMode}
                  checked={darkMode}
                />
                <span className="slider round"></span>
              </label></p>
            <p>Settings</p>
            <p>Languages</p>
            <p>Help</p>
            <p onClick={handlelogout}>Logout</p>
            </section>
            <section style={{fontSize:"13px", background: darkMode ? '#202020' : '#f7f7f8',
            color: darkMode ? '#8e9092' : '#939598',padding:"1% 3%",  border: darkMode ? '1px solid #474646' : '1px solid lightgrey',}} >
            About • Careers • Terms • Privacy • Acceptable Use • Businesses • Press • Your Ad Choices • Grievance Officer
            </section>
          </section>
        </div>
      )}
      {isOpen && (
        <div className="globeclose" onClick={closeDropdown} />
      )}
    </div>
  );
}

