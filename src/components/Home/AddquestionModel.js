import React, { useContext, useState } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Addpost from "./Addpost";
import { useMediaQuery } from "react-responsive";
export default function AddquestionModel() {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [modalOpen, setModalOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const openModal = () => {
        setModalOpen(true);
      }

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className="globeContainer">
            {!isMobile && (<button id={darkMode ? "addquestionDark" : "addquestion"} >
                Add question  <FontAwesomeIcon icon={faAngleDown} onClick={toggleDropdown} />
            </button>)}
            {isMobile&& (<button id="resaddquestion"  className="flexPro" onClick={toggleDropdown}>
               <AddCircleOutlineIcon sx={{ fontSize: 30 }}/><span style={{fontSize:"18px"}}> Add </span>
            </button>)}
            {isOpen && (<div className="addpostcard"
                style={{
                    background: darkMode ? ' #262626' : '#fff',
                    color: darkMode ? 'white' : 'black',
                    border: darkMode ? '1px solid #474646' : '1px solid grey',
                    width:isMobile && "200px"
                }}>
                <button className="flexPro" onClick={() => {
                    closeDropdown();
                            openModal();
                            
                        }}  style={{ background: darkMode ? '#262626' : '#fff', color: darkMode ? '#b0b2b5' : 'black', border: "none" }}><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9a2 2 0 0 1 2.828 0Z" className="icon_svg-stroke" stroke={darkMode ? "#b0b2b5" : "#666"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path className="icon_svg-fill_as_stroke" fill={darkMode ? "#a0a2a5 " : "#666"} d="m4.429 19.571 2.652-.884-1.768-1.768z"></path></g></svg>
                    Create post</button>
            </div>)}
            {isOpen && (
                <div className="globeclose"
                    onClick={closeDropdown}
                />
            )}
              {modalOpen && (
        <Addpost  closeModal={() => setModalOpen(false)} />
      )}
        </div>
    )
}
