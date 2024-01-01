import React, { useContext, useState } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import { grey } from "@mui/material/colors";
import { DarkModeContext } from "./DarkModeContext";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function CustomDropdown() {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className="globeContainer">
            <LanguageIcon
                fontSize="large"
                sx={{ color: grey[500], cursor: 'pointer' }}
                onClick={toggleDropdown} />

            {isOpen && (
                <div className="globeCard"
                    style={{
                        background: darkMode ? ' #262626' : '#fff',
                        color: darkMode ? 'white' : 'black',
                        border: darkMode ? '1px solid #474646' : '1px solid grey',
                    }}>
                    <div>
                        <p style={{ borderBottom: darkMode ? '1px solid #474646' : '1px solid grey',padding:"1% 6%"}}>Languages</p>
                        <section style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom: darkMode ? '1px solid #474646' : '1px solid grey',paddingRight:"10px"}}>
                          <div style={{display:"flex",gap:"5px",alignItems:"center", color: darkMode ? '#c0c1c1' : 'black',}} >
                        <main id="ProfileIcon" style={{backgroundColor:"#4b93ec",fontSize:"12px"}}>EN</main>
                        <p>English</p>
                        </div>
                        <CheckCircleOutlineIcon color="primary"/>
                        </section>
                        <section style={{fontSize:"14px",paddingLeft:"10px", color: darkMode ? '#c0c1c1' : 'black',}}>
                            <p>Add Language</p>
                            <p>See all languages</p>
                        </section>
                    </div>
                </div>
            )}
            {isOpen && (
                <div className="globeclose"
                    onClick={closeDropdown}
                />
            )}
        </div>
    );
}
