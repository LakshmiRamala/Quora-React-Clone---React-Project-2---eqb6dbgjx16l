import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import "./Space.css"
import Newspace from "./Newspace";
import images from "../../Assets/images.jpg";
import { useNavigate } from "react-router-dom";

export default function Space() {
    const userId = JSON.parse(sessionStorage.getItem("user"));
    const [modalOpen, setModalOpen] = useState(false);
    const { darkMode } = useContext(DarkModeContext);
    const [postlist, setPostlist] = useState([]);
    const [show, setShow] = useState(true);
    const spaceContainerRef = useRef(null);
    const navigate = useNavigate();

    const openModal = () => {
        setModalOpen(true);
    };

    const getSpace = async () => {
        try {
            const token = sessionStorage.getItem("userToken");
            const config = {
                headers: {
                    projectId: "g4hvu8o4jh5h",
                },
            };
            const res = await axios.get(
                `https://academics.newtonschool.co/api/v1/quora/channel?limit=200`,
                config
            );
            setPostlist(res.data.data);

        } catch (err) {
            console.error("Error:", err);
        }
    };

    useEffect(() => {
        getSpace();
    }, []);

    const handleDiscoverClick = () => {
        setShow(true);
        if (spaceContainerRef.current) {
            spaceContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [space, setSpace] = useState(() => {
        const storedSpace = localStorage.getItem("createatespace");
        return storedSpace ? JSON.parse(storedSpace) : [];
    });

    const handleNavigate = (postId) => {
        navigate(`/space/${postId}`);
    };



    return (
        <div style={{ display: "flex", justifyContent: "center", marginLeft: window.innerWidth > 768 ? "15%" : "3%", position: "relative", }}>
            <div style={{ flexDirection: "column", width: "100%", marginTop: window.innerWidth > 768 ? "5%" : "120px" }}>
                <section className={darkMode ? "MainDark AddquestinHome" : "Main AddquestinHome"} style={{ color: darkMode ? "#d1d6d6" : "black", height: "auto", width: window.innerWidth <= 768 && "80%" }} id="spaceimage">
                    <section>
                        <h3>Welcome to Spaces!</h3>
                        <span>Follow Spaces to explore your interests on Quora.</span>
                        <section className="flexPro" style={{ justifyContent: "flex-start" }}>
                            <div className="addQuestion" onClick={openModal}>
                                <AddCircleOutlineIcon /> Create a Space
                            </div>
                            <div className="addQuestion" onClick={handleDiscoverClick}>
                                <ExploreOutlinedIcon /> Discover Spaces
                            </div>
                        </section>
                    </section>
                    {Array.isArray(space) &&
                        space.map((post, index) => {
                            if (post.owner === userId) {
                                return (
                                    <span key={index} className="flexjust" style={{ justifyContent: "flex-start", gap: "1%" }} >
                                        <img src={images} alt="image" width="30px" onClick={() => handleNavigate(post._id)} /><p>{post.name}</p>
                                        <div className="flexPro" style={{ border: darkMode ? '1px solid #474646' : '1px solid grey', color: darkMode ? '#d5d6d6' : 'black', borderRadius: "4px", padding: "4px" }}><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3.5c.779 1.167 1.779 2 3 2.5s2.555.333 4-.5v9a7.856 7.856 0 0 1-2.5 3.5c-1.167.945-2.667 1.778-4.5 2.5-1.833-.722-3.333-1.555-4.5-2.5A7.856 7.856 0 0 1 5 14.5v-9c1.549.8 2.882.967 4 .5 1.118-.467 2.118-1.3 3-2.5Zm-7 9.781 14-7.525M7 17.441 18.655 11" class="icon_svg-stroke icon_svg-fill" stroke={darkMode ? "#b0b2b5 " : "#666"} strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                            ADMIN</div>
                                    </span>
                                );
                            }
                            return null;
                        })}
                </section>
                <section style={{ color: darkMode ? "#d1d6d6" : "black" }} ref={spaceContainerRef}>
                    <h1>Discover Spaces</h1>
                    <p>Spaces you might like</p>
                    {show && <div className="space-container">
                        {postlist && postlist
                            .slice()
                            .reverse().map((post, index) => (
                                <div key={index} style={{ background: darkMode ? "#262626" : "#fff", border: darkMode ? "1px solid #474646" : "1px solid lightgrey" }} className="space-grid" onClick={() => handleNavigate(post._id)}>
                                    <section className="imagebackground"  >
                                        <div className="imageContainer">
                                            <img src={post.image} alt={post.name} className="space-image" />
                                        </div>
                                    </section>
                                    <h4>{post.name}</h4>
                                    <p>{post.description}</p>
                                </div>
                            ))}
                    </div>}
                </section>
            </div>
            {window.innerWidth > 768 && <section className="advertisementContainer invitesection" style={{ background: darkMode ? "#262626" : "#fff", color: darkMode ? "#b0b2b5" : "#848485", position: "relative", marginTop: "7%" }}>
                <h4 style={{ borderBottom: darkMode ? "1px solid #474646" : "1px solid lightgrey" }}>Pending Invites</h4>
                <div className="flexPro" style={{ flexDirection: "column" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g class="icon_svg-stroke" stroke={darkMode ? "#b0b2b5 " : "#666"} strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinejoin="round">
                            <path d="M4.5 6.5h15v12h-15z"></path>
                            <path strokeLinecap="round" d="M4.5 7.5 12 14l7.5-6.5"></path>
                        </g>
                    </svg>
                    <span>No invites</span>
                </div>
            </section>}
            {modalOpen && <Newspace closeModal={() => setModalOpen(false)} />}
        </div>
    )
}
