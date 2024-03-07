
import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import axios from "axios";
import AnswerModel from "./AnswerModel";
import { useMediaQuery } from 'react-responsive';

export default function Answer() {
    const { darkMode } = useContext(DarkModeContext);
    const [postlist, setPostlist] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const openModal = (post) => {
        setSelectedPost(post);
        setModalOpen(true);
    };

    useEffect(() => {
        getPostsData();
    }, []);

    const getPostsData = async () => {
        const config = {
            headers: {
                projectId: "g4hvu8o4jh5h",
            },
        };

        try {
            const response = await axios.get(
                `https://academics.newtonschool.co/api/v1/quora/post?limit=20`,
                config
            );
            const newPosts = response.data.data;
            setPostlist((prevPosts) => [...prevPosts, ...newPosts]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section
            style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "8%",
                paddingTop:!isMobile ? "5%":"28%",
                gap: "1%",
                position: "relative",
                flexDirection:isMobile && "column"
            }}>
           {!isMobile && (<section
                style={{
                    color: darkMode ? "#d5d6d6" : "black",
                    width: "10%",cursor:"not-allowed"
                }}
                className="createspaceContainer" >
                <div>
                    <h3>Questions</h3>
                    <section className="sidebaradd">
                        <p style={{ backgroundColor: darkMode ? "#281918" : "#e9dcdb" }}>
                            Questions for you
                        </p>
                    </section>
                </div>
            </section>)} 
            <section  className="postContainer" style={{width:isMobile&&"92%" }}>
                    {postlist.map((post, index) => (
                        <div style={{
                            background: darkMode ? "#262626" : "#fff", color: darkMode ? "#8e8f8f" : "black",
                          }} key={index} className="postgrid">

                            <section >
                                <h3 style={{ color: darkMode ? "white" : "black" }} className="questionHeading">
                                    {post.title}
                                </h3>
                                <div className="flexjust">
                                    <section>
                                        <span className="flexjust">
                                            <button className="flexPro"  style={{ background: darkMode ? '#262626' : '#fff', border: darkMode ? '1px solid #474646' : '1px solid grey', color: darkMode ? '#b0b2b5' : 'black', borderRadius: "25px" ,cursor:"pointer"}} onClick={() => openModal(post)}><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="1.5" fill="none" fillRule="evenodd"><path d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z" className="icon_svg-stroke" stroke={darkMode ? "#b0b2b5 " : "#666"} strokeLinecap="round" strokeLinejoin="round"></path><path className="icon_svg-fill_as_stroke" fill={darkMode ? "#a0a2a5" : "#666"} d="m4.429 19.571 2.652-.884-1.768-1.768z"></path><path d="M14.5 19.5h5v-5m-10-10h-5v5" className="icon_svg-stroke" stroke={darkMode ? "#b0b2b5 " : "#666"} strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                                                Answer</button>
                                        </span>
                                    </section>
                                </div>

                            </section>
                        </div>
                    ))}
                    {modalOpen && <AnswerModel closeModal={() => setModalOpen(false)} post={selectedPost} />}
                
            </section>
        </section>
    );
}