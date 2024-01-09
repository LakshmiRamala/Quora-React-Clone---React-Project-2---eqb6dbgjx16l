import React, { useContext, useRef } from "react";
import "../Auth/Login.css";
import { useState } from "react";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DarkModeContext } from "../utils/DarkModeContext";
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

export default function Addpost({closeModal,postDetails}) {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [loading, setLoading] = useState(false);
    const [openquestion, setOpenquestion] = useState(false);
    const [createpost, setCreatepost] = useState(true);
    const  [title,setTitle]=useState(postDetails.title);
    const [content,setContent] = useState(postDetails.content||"");
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileimage,setfileimage]= useState(null);
    const name = JSON.parse(sessionStorage.getItem("userName"));
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth(); 
    sessionStorage.setItem("postDetails",JSON.stringify(postDetails));
    const createPost = async (post) => {
        setLoading(true);
        if(isLoggedIn){
        try {
            const token = sessionStorage.getItem("userToken");
            const formData = new FormData();
            formData.append('title', post.title);
            formData.append('content', post.content);
            if(selectedImage){
                formData.append('images', selectedImage);
            }
            
            const config = {
                headers: {
                    projectId:"g4hvu8o4jh5h",
                    Authorization:`Bearer ${token}`,
                },
            };
    
            const res = await axios.patch(
                `https://academics.newtonschool.co/api/v1/quora/post/${postDetails._id}`,
                formData,
                config
            );
            window.location.reload(true);
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }}else{
            navigate("/login")
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postDetails = {
            title,
            content,
            
        };
       
        await createPost(postDetails);
        closeModal(true);
    };
    

    const handleCreatepost = () => {
        setOpenquestion(false);
        setCreatepost(true);
    }
    const handleQuestion = () => {
        setOpenquestion(true);
        setCreatepost(false);
    }
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(imageFile);
        }
    };
    const handleIconClick = () => {
        fileInputRef.current.click();
    };
    return (
        <div className="modal-container"  style={{          
            color: darkMode ? 'white' : 'black',
            border: darkMode ? '1px solid #474646' : '1px solid grey',
        }}>
            <div className="Signup-container" style={{ height: "70%", width: "45%", background: darkMode ? "black" : '#fff', position: "relative" }}>
                <button className="close" onClick={() => closeModal(false)} style={{
                    background: darkMode ? "black" : '#fff', color: darkMode ? 'white' : 'black',
                }}>
                    X
                </button>
                <p className="flexPro border" style={{ gap: "40%", }}>
                    <span className={openquestion && "clickquestion"} onClick={handleQuestion} style={{ cursor: "pointer" }} >Add question</span>
                    <span className={createpost && "clickquestion"} onClick={handleCreatepost} style={{ cursor: "pointer" }}>Create Post</span>
                </p>
                {
                    openquestion && (
                        <div >
                            <section className="tipscontainer" style={{ backgroundColor: darkMode ? "#282d41" : "#ebf0ff" }}>
                                <h3>Tips on getting good answers quickly</h3>
                                <ul>
                                    <li>Make sure your question has not been asked already</li>
                                    <li>Keep your question short and to the point</li>
                                    <li>Double-check grammar and spelling</li>
                                </ul>
                            </section>
                        </div>
                    )
                }
                <section style={{ display: "flex", alignItems: "center", gap: "2", color: darkMode ? "#8e8f8f" : "black", }}>
                {!name && <AccountCircleIcon className="Profile" sx={{fontSize: 40}} />} 
                    {name && <main id="ProfileIcon" style={{ width: "20px", height: "20px" }}>{name.charAt(0).toUpperCase()}</main>}
                    <h4 style={{ color: darkMode && "#b1b3b6" }}>{ name} </h4>
                </section>
                {openquestion && <section >
                    <textarea className="textarea border" style={{ background: darkMode ? "black" : '#fff', color: darkMode ? "white" : "black" }} placeholder={`Start your question with ${"What"},${"How"},${"Why"},etc.`} />
                </section>}
                {createpost && (
                    <section>
                        <label htmlFor="title" style={{ fontSize: '22px' }}>Title: </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter Title"
                            required
                            style={{ width: "90%", fontSize:"18px",color:darkMode? "white":"black" }}
                         value={title}

                         onChange={(e)=>setTitle(e.target.value)}
                          className={darkMode? "Darkinput seachHome":"input seachHome"}
                        />
                        <br />
                        <label htmlFor="content" style={{ fontSize: '18px' }}>Content: </label>
                        <textarea
                            className="postcreate"
                            id="content"
                            style={{ background: darkMode ? "black" : '#fff', color: darkMode ? "white" : "black", border: "none", fontSize: "16px" }}
                            placeholder="Say something..."
                            required
                            onChange={(e)=>setContent(e.target.value)}
                            value={content}
                          
                        />
                        {selectedImage && <div className="flexPro" ><img src={selectedImage} alt="Selected" width="300px" height="260px" style={{ position: "relative" }} /> <button className="closeImage" onClick={() => setSelectedImage(null)} style={{
                            background: darkMode ? "black" : '#fff', color: darkMode ? 'white' : 'black',
                        }}>
                            X
                        </button></div>}
                    </section>
                )}
                <div>
                    <section style={{ position: "absolute", bottom: "2%", right: "2%", height: "10%" }}>
                        <button className="btn-login" onClick={handleSubmit} >
                            Post
                        </button>
                        {openquestion && <button className="btn-login" style={{ background: darkMode ? "black" : '#fff', color: "grey" }} onClick={() => closeModal(false)}>
                            Cancel
                        </button>}
                    </section>
                    {createpost && <section style={{ position: "absolute", bottom: "5%" }}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            value={fileimage}
                            ref={fileInputRef}
                        />
                        <label htmlFor="fileInput" onClick={handleIconClick}>
                            <CollectionsOutlinedIcon />
                        </label>
                    </section>}
                </div>
            </div>
        </div>

    );
}