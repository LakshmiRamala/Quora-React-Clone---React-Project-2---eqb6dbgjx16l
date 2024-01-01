import React, { useContext } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import burger from "../../Assets/Burger.gif";
import bookmyshow from '../../Assets/bookmyshow.gif';
export default function Advertisement(){
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    return (
        <div className="advertisementContainer" style={{ background: darkMode ? "#202020" : "#fff"}}>
            <section style={{padding:"2%"}} >
            <img src={bookmyshow} width="100%" alt="bookmyshow"/>
           <img src={burger} width="100%" alt="burger"/>
           </section>
           <p style={{borderTop: darkMode ? '1px solid #474646' : '1px solid lightgrey',textAlign:"center",color: darkMode ? '#8e9092' : '#939598',padding:'1%',fontSize:'14px',background: darkMode ? "#262626" : "#fff"}}>Advertisement</p>
        </div>
    )
}