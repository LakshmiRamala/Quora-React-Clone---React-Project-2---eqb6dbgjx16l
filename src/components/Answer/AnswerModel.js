import React, { useContext, useRef } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import axios from "axios";
export default function AnswerModel({ closeModal,post}){
    const { darkMode } = useContext(DarkModeContext);
    const name = JSON.parse(sessionStorage.getItem("userName"));
    const commentRef = useRef();
    const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
    const commentThePost = async (comment) => {
        if (isLoggedIn) {
        const token = sessionStorage.getItem("userToken");
        
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "g4hvu8o4jh5h",
            "Content-Type": "application/json"
          },
        };
        try {
          await axios.post(
            `https://academics.newtonschool.co/api/v1/quora/comment/${post._id}`,
            { content: comment.comment, appType: "quora" },
            config
          );
          window.location.reload();
        } catch (err) {
          console.log(`Error:`, err);
        }
      }else{
        navigate("/login", { state: "/answer" });
      }
      };
      const handleComment = () => {
        const commentDetails = {
          comment: commentRef.current.value,
        };
        commentThePost(commentDetails);
      };
    return (
        <div className="modal-container" style={{
            color: darkMode ? 'white' : 'black',
            border: darkMode ? '1px solid #474646' : '1px solid grey',
        }}>
            <div className="Signup-container" style={{ height: "70%", width:window.innerWidth>768 ? "45%":"80%", background: darkMode ? "black" : '#fff', position: "relative" }}>
                <button className="close" onClick={() => closeModal(false)} style={{
                    background: darkMode ? "black" : '#fff', color: darkMode ? 'white' : 'black',
                }}>
                    X
                </button>
                
           
            <section style={{ display: "flex", alignItems: "center", gap: "2",  color: darkMode ? "#8e8f8f" : "black", }}>
                    
                    {!name && <AccountCircleIcon className="Profile" sx={{fontSize: 30}} />} 
                        {name && <main id="ProfileIcon" style={{ width: "20px", height: "20px" }}>{name.charAt(0).toUpperCase()}</main>}
                        <h4 style={{ color: darkMode && "#b1b3b6" }}>{ name} </h4>
                    </section>
                    <section>
                        <label htmlFor="title" style={{ fontSize: '22px' }}>Title: </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter Title"
                            required
                            style={{ width: "90%", fontSize: "18px" }}
                            value={post.title}
                            className={darkMode ? "Darkinput seachHome" : "input seachHome"}
                        />
                        <br />
                        <label htmlFor="content" style={{ fontSize: '18px' }}>Content: </label>
                        <textarea
                            className="postcreate"
                            id="content"
                            style={{ background: darkMode ? "black" : '#fff', color: darkMode ? "white" : "black", border: "none", fontSize: "16px" }}
                            placeholder="Say something..."
                            required
                            ref={commentRef}
                        />
                        </section>
                        <section style={{ position: "absolute", bottom: "2%", right: "2%", height: "10%" }}>
                        <button className="btn-login" onClick={handleComment} >
                            Post
                        </button>
                        </section>
                        </div>
        </div>
    )
}