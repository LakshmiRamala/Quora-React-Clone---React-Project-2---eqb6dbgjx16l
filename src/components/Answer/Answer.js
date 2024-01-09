
import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import axios from "axios";
import AnswerModel from "./AnswerModel";

export default function Answer() {
    const { darkMode } = useContext(DarkModeContext);
    const [postlist, setPostlist] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

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
                paddingTop:window.innerWidth>768 ? "5%":"28%",
                gap: "1%",
                position: "relative",
                flexDirection:window.innerWidth<=768 && "column"
            }}>
           {window.innerWidth>768 && (<section
                style={{
                    color: darkMode ? "#d5d6d6" : "black",
                    width: "10%",
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
            <section  className="postContainer" style={{width:window.innerWidth<=768&&"92%" }}>
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
                                            <button className="flexPro buttonnew" style={{ background: darkMode ? '#262626' : '#fff', color: darkMode ? '#b0b2b5' : 'black' ,}}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g class="icon_svg-stroke" stroke={darkMode ? "#b0b2b5 " : "#666"} strokWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round"><path d="M14.5 19c0-5.663-3.337-9-9-9m14 9c0-8.81-5.19-14-14-14"></path><circle cx="7.5" cy="17" r="2" className="icon_svg-fill"></circle></g></svg>
                                                Follow
                                            </button>
                                            <button className="flexPro buttonnew" style={{ background: darkMode ? '#262626' : '#fff', color: darkMode ? '#b0b2b5' : 'black' ,}}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g class="icon_svg-stroke" stroke={darkMode ? "#b0b2b5 " : "#666"} strokeWidth="1.5" fill="none" fillRule="evenodd"><path d="M20 20.5a5 5 0 0 0-10 0m5-7.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" className="icon_svg-fill"></path><path d="m6 10 2.5 3L6 16m-3-2.976h5.495" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                                                Request
                                            </button>
                                        </span>
                                    </section>
                                   {window.innerWidth>768 && <section>
                                        <button className="buttonnew" style={{ background: darkMode ? '#262626' : '#fff', color: darkMode ? '#b0b2b5' : 'black' }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><circle className="icon_svg-fill_as_stroke" fill={darkMode ? "#b0b2b5 " : "#666"} cx="12" cy="8" r="1"></circle><path d="M12 11.5v5M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9Z" className="icon_svg-stroke" stroke={darkMode ? "#b0b2b5 " : "#666"} strokeWidth="1.5" strokeLinecap="round"></path></g></svg>
                                        </button>
                                        <button className="buttonnew" style={{ background: darkMode ? '#262626' : '#fff', color: darkMode ? '#b0b2b5' : 'black' }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z" className="icon_svg-stroke icon_svg-fill" stroke={darkMode ? "#b0b2b5 " : "#666"} strokeWidth="1.5" fill="none"></path></svg>
                                        </button>
                                        <button className="buttonnew" style={{ background: darkMode ? '#262626' : '#fff', color: darkMode ? '#b0b2b5' : 'black' }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" stroke={darkMode ? "#b0b2b5 " : "#666"} fill="none" strokeWidth="1.5" strokeLinejoin="round"></path></svg>
                                        </button>
                                        <button className="buttonnew" style={{ background: darkMode ? '#262626' : '#fff', color: darkMode ? '#b0b2b5' : 'black' }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 11.25a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Zm-7 0a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Zm14 0a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Z" className="icon_svg-stroke" fill={darkMode ? "#b0b2b5 " : "#666"} stroke={darkMode ? "#b0b2b5 " : "#666"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        </button>
                                    </section>}
                                </div>

                            </section>
                        </div>
                    ))}
                    {modalOpen && <AnswerModel closeModal={() => setModalOpen(false)} post={selectedPost} />}
                
            </section>
        </section>
    );
}