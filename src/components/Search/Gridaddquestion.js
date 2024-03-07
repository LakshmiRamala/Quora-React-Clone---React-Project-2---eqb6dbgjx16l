import React, { useContext, useState } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import Addpost from "../Home/Addpost";
import { useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function GridAddQuestion() {
    const { darkMode } = useContext(DarkModeContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const isMobile = useMediaQuery({ maxWidth: 768 });
  

    const openModal = () => {
        setModalOpen(true);
    }

    return (
        <section className="postContainer">
            <div style={{
                background: darkMode ? "#262626" : "#fff",
                color: darkMode ? "white" : "black",
                borderBottom: darkMode ? '1px solid #474646' : '1px solid grey',
                width:!isMobile?"50%":"90%",
                height: "100px",
                padding: "2px 16px",
                marginTop:!isMobile ?"8%":"150px"
            }} className="postgrid">
                <p style={{ fontSize: "18px" }}>{`We couldn't find any results for "${searchParams.get("q")}".`}</p>
                <button className="addbtn" onClick={openModal}>Add question</button>
            </div>
            {modalOpen && <Addpost closeModal={() => setModalOpen(false)} selecttype={true} />}
        </section>
    );
}
