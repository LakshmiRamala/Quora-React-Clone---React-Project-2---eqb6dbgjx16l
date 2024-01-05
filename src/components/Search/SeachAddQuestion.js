import React, { useContext } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import SearchIcon from '@mui/icons-material/Search';
export default function SearchAddQuestion(){
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    return (
        <section style={{ color: darkMode ? '#d5d6d6' : 'black',width:"10%"}} className="createspaceContainer">
            <div >
                <h3 style={{borderBottom: darkMode ? '1px solid #474646' : '1px solid grey'}}>By type</h3>
                <section className="sidebaradd">
                <p style={{backgroundColor:darkMode?"#281918":"#e9dcdb"}}>All types</p>
                <p>Questions</p>
                <p>Answers</p>
                <p>Posts</p>
                <p>Profiles</p>
                <p>Topics</p>
                <p>Spaces</p>
                </section>
            </div>
            <div>
                <h3 style={{borderBottom: darkMode ? '1px solid #474646' : '1px solid grey'}}>By Author</h3>
                <section className="sidebaradd">
                <p style={{backgroundColor:darkMode?"#281918":"#e9dcdb"}}>All People</p>
                <p>People you follow</p>
                <p style={{display:"flex"}}><SearchIcon/> Author</p>
                </section>
            </div>
            <div>
                <h3 style={{borderBottom: darkMode ? '1px solid #474646' : '1px solid grey'}}>By time</h3>
                <section className="sidebaradd">
                <p style={{backgroundColor:darkMode?"#281918":"#e9dcdb"}}>All time</p>
                <p>Past hour</p>
                <p>Past day</p>
                <p>Past week</p>
                <p>Past month</p>
                <p>Pasy year</p>
                </section>
            </div>
        </section>
    )
}