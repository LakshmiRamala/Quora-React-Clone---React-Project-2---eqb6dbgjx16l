import React, { useContext, useEffect, useState } from "react";
import CreateSpace from "../Home/CreateSpace";
import Addquestion from "../Home/Addquestion";
import { DarkModeContext } from "../utils/DarkModeContext";
import axios from "axios";

export default function Follow() {
  const { darkMode } = useContext(DarkModeContext);
  const [followList, setFollowList] = useState({});
  const [spaces, setSpaces] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const getSpace = async (id) => {
    try {
      const token = sessionStorage.getItem("userToken");
      const config = {
        headers: {
          projectId: "g4hvu8o4jh5h",
        },
      };
      const res = await axios.get(
        `https://academics.newtonschool.co/api/v1/quora/channel/${id}`,
        config
      );

      const spaceData = res.data.data;
      const spaceExists = spaces.some((space) => space.id === spaceData.id);

      if (!spaceExists) {
        setSpaces((prevSpaces) => [...prevSpaces, spaceData]);
      }
    } catch (err) {
      console.error(`Error fetching space for ID ${id}:`, err);
    }
  };

  useEffect(() => {
    const storedFollowList = JSON.parse(localStorage.getItem(`${user}_follow`)) || {};
    setFollowList(storedFollowList);
  }, [user]);

  useEffect(() => {
    if (Object.keys(followList).length > 0) {
      Object.keys(followList).forEach((id) => {
        getSpace(id);
      });
    }
  }, [followList]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginLeft: window.innerWidth > 768 ? "15%" : "3%", width: window.innerWidth > 768 ? "70%" : "100%", paddingTop: "2%", gap: "1%", position: "relative" }}>
      {window.innerWidth > 768 && (<CreateSpace />)}
      <span style={{ flexDirection: "column", width: window.innerWidth > 768 ? "80%" : "94%", marginTop: window.innerWidth > 768 ? "5%" : "30%", color: darkMode ? "white" : "black" }}>
        {!Object.keys(followList).length && (
          <div className="flexPro" style={{ flexDirection: "column" }}>
            <img className="q-image qu-mb--tiny" src="//qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.all_caught_up_feed_lightmode.png-26-1b95f406729630f5.png" width="30%" alt="Empty State" />
            <h3>You're all caught up</h3>
            <p>Follow more Spaces to discover new stories in your feed. You can also visit <a href="/space" style={{ color: "blue", textDecoration: "none" }}> Spaces. </a></p>
          </div>
        )}
        {Object.keys(followList).length > 0 && (
          <section style={{ flexDirection: "column", width: "100%" }}>
            <Addquestion />
            <div className="postContainer" style={{ width: window.innerWidth <= 768 && "90%", }}>
              {spaces.map((space, index) => (
                <div style={{
                  background: darkMode ? "#262626" : "#fff", color: darkMode ? "#8e8f8f" : "black",
                  width: window.innerWidth <= 768 && "100%",
                }} key={index} className="postgrid" >
                  <section>
                    <div className="autorContainer" >
                      {space.owner && space.owner.profileImage && (
                        <img
                          src={space.owner.profileImage}
                          alt={space.owner.name}
                          className="authorImage"
                        />
                      )}
                      <section>
                        <span style={{ color: darkMode ? "white" : "black", fontWeight: 800 }}>
                          {space.owner?.name}
                        </span>
                        <br />
                        <span style={{ fontSize: "14px" }}>
                          Lives in Assam, India (1997–present)
                        </span>
                      </section>
                    </div>
                  
                    {space.images && space.images.map((imageURL, imageIndex) => (
                      <img key={imageIndex} src={imageURL} alt={`Image ${imageIndex}`} style={{ padding: "5%" }} width="90%" />
                    ))}
                    <h3 style={{ color: darkMode ? "white" : "black" }} className="questionHeading">
                      {space.name}
                    </h3>
                    <p style={{ color: darkMode ? "#cacbcb" : "black" }}>{space.description}</p>
                  </section>
                </div>
              ))}
            </div>

          </section>
        )}
      </span>
    </div>
  );
}
