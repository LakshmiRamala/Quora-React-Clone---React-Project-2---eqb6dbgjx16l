import React, { useContext, useState } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
import Editpost from "./Editpost";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
export default function PostEdit({ postDetails }) {
    const { darkMode } = useContext(DarkModeContext);
    const name = JSON.parse(sessionStorage.getItem("userName"));
    const [isOpen, setIsOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    

    const deletePost = async () => {
        if(isLoggedIn){
        try {
            const token = sessionStorage.getItem("userToken");
            const config = {
                headers: {
                    projectId: "g4hvu8o4jh5h",
                    Authorization: `Bearer ${token}`
                }
            };
    
            const res = await axios.delete(
                `https://academics.newtonschool.co/api/v1/quora/post/${postDetails._id}`,
                config
            );
            window.location.reload(true);
            console.log(res); 
        } catch (err) {
            console.log(err);
        }}else{
            navigate("/login");
        }
    };
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const closeDropdown = () => {
        setIsOpen(false);
    };
    const handleDelete = () => {
        deletePost(postDetails._id);
    };
    const handleEdit=()=>{
        setModalOpen(true);
    }
    return (
        <div className="menuoptions">
            {postDetails.author.name === name && (
                <button
                    style={{ background: darkMode ? "#262626" : "#fff", color: darkMode ? "#b0b2b5" : "black", border: "none", }}
                    className="flexPro" onClick={toggleDropdown}>
                    <MoreHorizIcon />
                </button>
            )}
            {isOpen && (
                <div className="MoreCard"
                    style={{
                        background: darkMode ? ' #262626' : '#fff',
                        color: darkMode ? 'white' : 'black',
                        border: darkMode ? '1px solid #474646' : '1px solid grey',
                    }}>
                    <div>
                        <button className="flexPro" style={{ background: darkMode ? '#262626' : '#fff', color: darkMode ? '#b0b2b5' : 'black', border: "none", fontSize: "18px" }} 
                        onClick={handleEdit}><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9a2 2 0 0 1 2.828 0Z" className="icon_svg-stroke" stroke={darkMode ? "#b0b2b5" : "#666"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path className="icon_svg-fill_as_stroke" fill={darkMode ? "#a0a2a5 " : "#666"} d="m4.429 19.571 2.652-.884-1.768-1.768z"></path></g></svg>
                            Edit</button>
                        <button className="flexPro" style={{ background: darkMode ? '#262626' : '#fff', color: "red", border: "none", fontSize: "18px" }} onClick={handleDelete}>
                            <DeleteOutlineIcon /> Delete
                        </button>
                    </div>
                </div>
            )}
           
            {isOpen && (
                <div className="globeclose"
                    onClick={closeDropdown}
                />
            )}
             {modalOpen && <Editpost postDetails={postDetails} key={postDetails._id} closeModal={() => setModalOpen(false)} />}
        </div>
    )
}