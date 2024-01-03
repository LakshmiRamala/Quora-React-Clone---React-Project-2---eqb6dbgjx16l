import React, { useContext, useState } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import books from "../../Assets/books.jpg";
import highereducation from "../../Assets/highereducation.jpg";
import history from "../../Assets/history.webp";
import politics from "../../Assets/politics.webp";
import psychology from "../../Assets/Psychology.jpg";
import scienceofeveryday from "../../Assets/scienceofeveryday.jpg";
import smartphones from "../../Assets/smartphones.jpg";
import technology from "../../Assets/technology.jpg";
import Newspace from "../Space/Newspace";
export default function CreateSpace(){
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
     
      }
    return (
        <div style={{
            color: darkMode ? '#d5d6d6' : 'black' }} className="createspaceContainer">
          <button style={{backgroundColor:darkMode? " #1b1b1b":"#eceded",color:darkMode ? '#acaeb1' : 'black'}} className="createspacebtn" onClick={openModal}>
            <span style={{backgroundColor:darkMode? " #262626 ":"#eceded"}}>+ </span> Create Space</button>
            <section style={{color: darkMode ? '#acaeb1' : 'black' ,borderBottom: darkMode ? "1px solid #474646" : "1px solid lightgrey",}} className="catogory">
                <span className="flexPro" style={{gap:"10px"}}><img src={scienceofeveryday} width="30px" /><p>Science of Everyday Life</p></span>
                <span className="flexPro" style={{gap:"10px"}}><img src={smartphones} width="30px"/><p>Smartphones</p></span>
                <span className="flexPro" style={{gap:"10px"}}><img src={politics} width="30px"/><p>Politics</p></span>
                <span className="flexPro" style={{gap:"10px"}}><img src={psychology} width="30px"/><p>Psychology</p></span>
                <span className="flexPro" style={{gap:"10px"}}><img src={history} width="30px"/><p>History</p></span>
                <span className="flexPro" style={{gap:"10px"}}><img src={books} width="30px"/><p>Books</p></span>
                <span className="flexPro" style={{gap:"10px"}}><img src={highereducation} width="30px"/><p>Higher Education</p></span>
                <span className="flexPro" style={{gap:"10px"}}><img src={technology} width="30px"/><p>Technology</p></span>
            </section>
            <section style={{fontSize:"16px",
            color: darkMode ? '#8e9092' : '#939598',padding:"1% 3%"}} >
            About • Careers • Terms • Privacy • Acceptable Use • Businesses • Press • Your Ad Choices • Grievance Officer

            </section>
            {modalOpen && <Newspace  closeModal={() => setModalOpen(false)}/>}
        </div>
    )
}