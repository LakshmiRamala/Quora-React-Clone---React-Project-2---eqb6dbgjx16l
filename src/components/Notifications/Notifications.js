import React, { useContext } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import { useMediaQuery } from "react-responsive";
export default function Notifications() {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    return (
        <section style={{ display: "flex", justifyContent: "center", marginLeft: "15%", width: "70%", paddingTop: "2%", gap: "1%", position: "relative" }}>

           {!isMobile && <div style={{ marginTop: "5%", color: darkMode ? 'white' : 'black',cursor:"not-allowed" }}>
                <h3 style={{ borderBottom: darkMode ? '1px solid #474646' : '1px solid grey' }}>Filters</h3>
                <section className="sidebaradd">
                    <p style={{ backgroundColor: darkMode ? "#281918" : "#e9dcdb" }}>All Notifications</p>
                    <section style={{ cursor: "not-allowed" }}>
                        <p>Stories</p>
                        <p>Questions</p>
                        <p>Spaces</p>
                        <p>People updates</p>
                        <p>Comments and mentions</p>
                        <p>Upvotes</p>
                        <p>Your content</p>
                        <p>Your profile</p>
                        <p>Announcements</p>
                        <p>Earnings</p>
                        <p>Subscriptions</p>
                    </section>
                </section>
            </div>}
            <span style={{ flexDirection: "column", width: "80%", marginTop: !isMobile?"5%":"200px", color: darkMode ? "white" : "black" }}>

                <div className="flexPro" style={{ flexDirection: "column" }}>
                    <img class="q-image qu-mb--tiny" src="//qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.no_notification_lightmode.png-26-9e0ef76620dd73d3.png" width="30%" />
                    <h3>No New Notifications</h3>
                    <p>Notifications you received in the last 30 days will show up here.</p>
                </div>
            </span>
        </section>
    )
}