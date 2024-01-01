import React, { useContext } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/UserSlice";
import { Avatar } from "@mui/material";
export default function Comment(){
    const { darkMode } = useContext(DarkModeContext);
    const user = useSelector(selectUser);
    const name=JSON.parse(sessionStorage.getItem("userName"));
    
    return (
        <div style={{marginTop:"1%"}}>
            <section className="flexPro" style={{gap:"12px"}}>
            {user && <Avatar src={user?.photo} alt="profile_img" style={{width:"40px",height:"40px"}} />}
            {name && <main id="ProfileIcon"style={{width:"40px",height:"40px"}}>{name.charAt(0).toUpperCase()}</main>}

            <input type="text" placeholder="Add a comment..." style={{width:"64%"}} className={darkMode? "Darkinput seachHome":"input seachHome"}/>
            <button className="addCommentbtn">Add comment</button>
            </section>
        </div>
    )
}