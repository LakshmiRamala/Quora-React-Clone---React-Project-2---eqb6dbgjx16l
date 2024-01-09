import React, { useContext, useState } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import Addpost from "../Home/Addpost";
import { useSearchParams } from "react-router-dom";

export default function GridAddQuestion() {
    const { darkMode } = useContext(DarkModeContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchParams] = useSearchParams();
  

    const openModal = () => {
        setModalOpen(true);
    }

    return (
        <section className="postContainer">
            <div style={{
                background: darkMode ? "#262626" : "#fff",
                color: darkMode ? "white" : "black",
                borderBottom: darkMode ? '1px solid #474646' : '1px solid grey',
                width:window.innerWidth>768?"50%":"90%",
                height: "100px",
                padding: "2px 16px",
                marginTop:window.innerWidth>768 ?"8%":"150px"
            }} className="postgrid">
                <p style={{ fontSize: "18px" }}>{`We couldn't find any results for "${searchParams.get("q")}".`}</p>
                <button className="addbtn" onClick={openModal}>Add question</button>
            </div>
            {modalOpen && <Addpost closeModal={() => setModalOpen(false)} selecttype={true} />}
        </section>
    );
}
