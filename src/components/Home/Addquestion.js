import React, { useContext, useState } from "react";
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import { grey } from "@mui/material/colors";
import { DarkModeContext } from "../utils/DarkModeContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Addpost from "./Addpost";
import Editpost from "./Editpost";
import { useNavigate } from "react-router-dom";
export default function Addquestion() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const name = JSON.parse(sessionStorage.getItem("userName"));
  const [modalOpen, setModalOpen] = useState(false);
  const [openpost, setPost] = useState(false);
  const [postDetails, setPostDetails] = useState(null);
  const navigate=useNavigate();
  const openModal = () => {
    setModalOpen(true);
    setPost(false);
  }
  const handleOpenpost = () => {
    setPost(true);
    setModalOpen(false);
    const fetchedPostDetails = JSON.parse(sessionStorage.getItem("postDetails"));
    setPostDetails(fetchedPostDetails);
  }
  const handleanswer=()=>{
    navigate("/answer");
    window.location.reload();

  }

  return (
    <div className={darkMode ? "MainDark AddquestinHome" : "Main AddquestinHome"} style={{ gap: "8px", cursor: "pointer",width:window.innerWidth<=768 && "84%" }} >
      <section className="flexPro" style={{ gap: "12px" , background: darkMode ? "#262626" : "#fff", color: darkMode ? "#8e8f8f" : "black",}} onClick={openModal}>
      {!name && <AccountCircleIcon className="Profile" sx={{fontSize: 40}} />} 
        {name && <main id="ProfileIcon" style={{ width: "40px", height: "40px" }}>{name.charAt(0).toUpperCase()}</main>}
        <input type="text" placeholder="What do you want to ask or share?" style={{ width: "90%" }} className={darkMode ? "Darkinput seachHome" : "input seachHome"} />
      </section>
      <section className="flexjust">
        <button className="flexPro buttonPre border-right" onClick={openModal} style={{ background: darkMode ? '#262626' : '#fff', borderRight: darkMode ? '1px solid #474646' : '1px solid grey', color: darkMode ? '#b0b2b5' : 'black' }}><LiveHelpOutlinedIcon fontSize="small" sx={{ color: darkMode ? "#b0b2b5" : grey[800] }} /> Ask</button>
        <button className="flexPro buttonPre border-right" style={{ background: darkMode ? '#262626' : '#fff', borderRight: darkMode ? '1px solid #474646' : '1px solid grey', color: darkMode ? '#b0b2b5' : 'black'}} onClick={handleanswer}><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="1.5" fill="none" fillRule="evenodd"><path d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z" className="icon_svg-stroke" stroke={darkMode ? "#b0b2b5 " : "#666"} strokeLinecap="round" strokeLinejoin="round"></path><path className="icon_svg-fill_as_stroke" fill={darkMode ? "#a0a2a5" : "#666"} d="m4.429 19.571 2.652-.884-1.768-1.768z"></path><path d="M14.5 19.5h5v-5m-10-10h-5v5" className="icon_svg-stroke" stroke={darkMode ? "#b0b2b5 " : "#666"} strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
          Answer</button>
        <button className="flexPro buttonPre" onClick={handleOpenpost} style={{ background: darkMode ? '#262626' : '#fff', color: darkMode ? '#b0b2b5' : 'black' }}><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9a2 2 0 0 1 2.828 0Z" className="icon_svg-stroke" stroke={darkMode ? "#b0b2b5" : "#666"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path className="icon_svg-fill_as_stroke" fill={darkMode ? "#a0a2a5 " : "#666"} d="m4.429 19.571 2.652-.884-1.768-1.768z"></path></g></svg>
          Post</button>
      </section>


      {modalOpen && <Addpost closeModal={() => setModalOpen(false)} selecttype={true} />}
      {openpost && postDetails && <Editpost postDetails={postDetails} closeModal={() => setPost(false)} />}
      {openpost && !postDetails && <Addpost closeModal={() => setPost(false)} />}
    </div>

  )
}
