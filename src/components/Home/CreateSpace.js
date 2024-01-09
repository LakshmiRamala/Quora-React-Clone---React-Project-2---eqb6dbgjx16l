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
import images from "../../Assets/images.jpg";

export default function CreateSpace() {
  const { darkMode } = useContext(DarkModeContext);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const storedSpace = localStorage.getItem("createatespace");
  const initialSpace = storedSpace ? JSON.parse(storedSpace) : [];

  const [space, setSpace] = useState(initialSpace);
  

  const userId = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="createspaceContainer" style={{ color: darkMode ? '#d5d6d6' : 'black' }}>
      <button
        className="createspacebtn"
        style={{ backgroundColor: darkMode ? "#1b1b1b" : "#eceded", color: darkMode ? '#acaeb1' : 'black' }}
        onClick={openModal}
      >
        <span style={{ backgroundColor: darkMode ? "#262626" : "#eceded" }}>+ </span> Create Space
      </button>
      <section className="catogory" style={{ color: darkMode ? '#acaeb1' : 'black', borderBottom: darkMode ? "1px solid #474646" : "1px solid lightgrey" }}>
        {Array.isArray(space)  &&
          space.map((post, index) => {
            if (post.owner === userId) {
              return (
                <span key={index} className="flexPro" style={{ gap: "10px" }}>
                 <img src={images} alt="image" width="30px"/><p>{post.name}</p>
                </span>
              );
            }
            return null;
          })}
        <span className="flexPro" style={{ gap: "10px",  cursor: "not-allowed" }}>
          <img src={scienceofeveryday} width="30px" alt="Science of Everyday Life" />
          <p>Science of Everyday Life</p>
        </span>

                <span className="flexPro" style={{gap:"10px",cursor: "not-allowed" }}><img src={smartphones} alt="smartphones" width="30px"/><p>Smartphones</p></span>
                <span className="flexPro" style={{gap:"10px",cursor: "not-allowed" }}><img src={politics} alt="politics" width="30px"/><p>Politics</p></span>
                <span className="flexPro" style={{gap:"10px",cursor: "not-allowed" }}><img src={psychology} alt="psychology" width="30px"/><p>Psychology</p></span>
                <span className="flexPro" style={{gap:"10px",cursor: "not-allowed" }}><img src={history} alt="history" width="30px"/><p>History</p></span>
                <span className="flexPro" style={{gap:"10px",cursor: "not-allowed" }}><img src={books}  alt="books" width="30px"/><p>Books</p></span>
                <span className="flexPro" style={{gap:"10px",cursor: "not-allowed" }}><img src={highereducation} alt="education" width="30px"/><p>Higher Education</p></span>
                <span className="flexPro" style={{gap:"10px",cursor: "not-allowed" }}><img src={technology} alt="technology" width="30px"/><p>Technology</p></span>
            </section>
            <section style={{fontSize:"16px",
            color: darkMode ? '#8e9092' : '#939598',padding:"1% 3%",cursor: "not-allowed" }} >
            About • Careers • Terms • Privacy • Acceptable Use • Businesses • Press • Your Ad Choices • Grievance Officer

            </section>
            {modalOpen && <Newspace  closeModal={() => setModalOpen(false)}/>}
          
        </div>
    )
}