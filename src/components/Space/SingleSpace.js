import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DarkModeContext } from "../utils/DarkModeContext";
import axios from "axios";
import spaceImage from "../../Assets/spaceimage.webp";
import { useAuth } from "../Auth/AuthProvider";

export default function SingleSpace() {
  const { darkMode } = useContext(DarkModeContext);
  const [space, setSpace] = useState(null);
  const { id } = useParams();
  const [followList, setFollowList] = useState({});
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const storedFollowList = JSON.parse(localStorage.getItem(`${user}_follow`)) || {};
    setFollowList(storedFollowList);
  }, [user]);

  const handleFollow = (post) => {
    if (isLoggedIn) {
      const updatedFollowList = { ...followList };
      if (updatedFollowList[post._id]) {
        delete updatedFollowList[post._id]; 
      } else {
        updatedFollowList[post._id] = true; 
      }
      setFollowList(updatedFollowList);
      const action = updatedFollowList[post._id] ? "followed" : "unfollowed";
      alert(`You ${action} ${post.name}`);

      localStorage.setItem(`${user}_follow`, JSON.stringify(updatedFollowList));
    } else {
      navigate("/login", { state: { prevPath: `/space/${id}` } });
    }
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
        `https://academics.newtonschool.co/api/v1/quora/channel/${id}`,
        config
      );
      setSpace(res.data.data);
    } catch (err) {
      console.error("Error fetching space:", err);
    }
  };

  useEffect(() => {
    getSpace();
  }, [id]);

  return (
    <section style={{ color: darkMode ? "white" : "black" }}>
      <div className="channel-container">
        {space && (
          <div className="imageSpace">
            <img src={spaceImage} alt="space" />
            <div className="authorimagespace">
              <img src={space.image} alt={space.name} />
              <h1 id="space-name">{space.name}</h1>
            </div>
            <button
              id={followList[space._id] ? "space-following" : "space-follow"}
              onClick={() => handleFollow(space)}
            >
              {followList[space._id] ? "Unfollow" : "Follow"}
            </button>
          </div>
        )}
      </div>
      <div className="flexPro">
        {space && (
          <div
            style={{
              background: darkMode ? "#262626" : "#fff",
              color: darkMode ? "#8e8f8f" : "black",
            }}
            className="spacepost"
          >
            <section>
              <div>
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
              <h3 style={{ color: darkMode ? "white" : "black" }} className="questionHeading">
                {space.name}
              </h3>
              <p style={{ color: darkMode ? "#cacbcb" : "black" }}>{space.description}</p>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}

