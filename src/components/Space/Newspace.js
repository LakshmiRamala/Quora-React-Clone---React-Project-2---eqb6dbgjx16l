import React, { useContext, useRef } from "react";
import "../Auth/Login.css";
import axios from "axios";
import { DarkModeContext } from "../utils/DarkModeContext";


export default function Newspace({ closeModal }) {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const titleRef = useRef();
    const contentRef = useRef();
    const nameRef=useRef();

    const createSpace = async (space) => {
        try {
            const token = sessionStorage.getItem("userToken");
            const config = {
                headers: {
                    projectId: "g4hvu8o4jh5h", 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };
            const res = await axios.post(
                "https://academics.newtonschool.co/api/v1/quora/channel/",
                {...space,appType:"quora"},
                config
            );
            console.log(res);
        } catch (err) {
            console.error("Error:", err);
            alert("Please change the name. It already exists!");
        } 
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const spaceDetails = {
            title: titleRef.current.value,
            content: contentRef.current.value,
            name:nameRef.current.value
        };
        await createSpace(spaceDetails);
        closeModal(true);
    };
    
    return (
        <div className="modal-container"  style={{         
            color: darkMode ? '#d5d6d6' : 'black',
            border: darkMode ? '1px solid #474646' : '1px solid grey',
        }}>
            <div className="Signup-container" style={{ height: "70%", width: "45%", background: darkMode ? "black" : '#fff', position: "relative" }}>
                <button className="close" onClick={() => closeModal(false)} style={{
                    background: darkMode ? "black" : '#fff', color: darkMode ? 'white' : 'black',
                }}>
                    X
                </button>
               <h2>Create a Space</h2>
               <p>Share your interests, curate content, host discussions, and more.</p>
                    <section style={{display:"flex",gap:"2%",flexDirection:"column"}}>
                        <label htmlFor="title" style={{ fontSize: '22px' }}>Name </label>
                        <br/>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter Name"
                            required
                            style={{ width: "90%", fontSize: "18px",borderRadius:"8px",color: darkMode ? '#d5d6d6' : 'black',background: darkMode ? "black" : '#fff' }}
                          ref={nameRef}
                          className={darkMode? "Darkinput seachHome":"input seachHome"}
                        />
                        <br />
                        <label htmlFor="title" style={{ fontSize: '22px' }}>Title </label>
                        <br/>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter Title"
                            required
                            style={{ width: "90%", fontSize: "18px",borderRadius:"8px",color: darkMode ? '#d5d6d6' : 'black',background: darkMode ? "black" : '#fff' }}
                          ref={titleRef}
                          className={darkMode? "Darkinput seachHome":"input seachHome"}
                        />
                        <br />
                        <label htmlFor="content" style={{ fontSize: '18px' }}>Brief description</label>
                        <br/>
                        <textarea
                            className="postcreate"
                            id="content"
                            style={{ background: darkMode ? "black" : '#fff', color: darkMode ? "white" : "black", border: "none", fontSize: "16px" }}
                            placeholder="Say something..."
                            required
                            ref={contentRef}
                        />
                    </section>
                <div>
                    <section style={{ position: "absolute", bottom: "2%", right: "2%", height: "10%" }}>
                        <button className="btn-login" onClick={handleSubmit} >
                           Create
                        </button>
                    </section>
                  
                </div>
            </div>
        </div>

    );
}