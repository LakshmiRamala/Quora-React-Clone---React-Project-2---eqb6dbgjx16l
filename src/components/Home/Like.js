import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import axios from "axios";

export default function Like({ post }) {
  const { darkMode } = useContext(DarkModeContext);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [likedPosts, setLikedPosts] = useState(
    JSON.parse(localStorage.getItem("likedPosts")) || []
  );
  const isPostLiked = likedPosts.includes(post._id);

  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  const likethepost = async () => {
    const token = sessionStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        projectID: "g4hvu8o4jh5h",
      },
    };
    try {
      await axios.post(
        `https://academics.newtonschool.co/api/v1/quora/like/${post._id}`,
        null,
        config
      );
      setLikedPosts([...likedPosts, post._id]);
      setLikeCount(likeCount + 1);
    } catch (err) {
      console.log(`Error:`, err);
    }
  };

  const dislikePost = async () => {
    const token = sessionStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'projectID': "g4hvu8o4jh5h",
      },
    };
    try {
      await axios.delete(
        `https://academics.newtonschool.co/api/v1/quora/like/${post._id}`,
        config
      );
      const updatedLikedPosts = likedPosts.filter((id) => id !== post._id);
      setLikedPosts(updatedLikedPosts);
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts)); 
      setLikeCount(likeCount - 1);
    } catch (err) {
      console.log(`Error:`, err);
    }
  };

  const handleLike = async () => {
    if (!isPostLiked) {
      await likethepost();
    } else {
      await dislikePost();
    }
  };
  
  const handleDislike = async () => {
    if (isPostLiked) {
      await dislikePost();
    }
  };
  

  return (
    <div style={{ display: "flex" }}>
      <button
        style={{
          background: darkMode ? "#313131" : "#fff",
          color: isPostLiked ? "blue" : darkMode ? "#b0b2b5" : "black",
          borderRadius: "25px",
          border: "none",
        }}
        className="flexPro"
        onClick={handleLike}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4 3 15h6v5h6v-5h6z"
            className="icon_svg-stroke icon_svg-fill"
            strokeWidth="1.5"
            stroke={darkMode ? "#b0b2b5" : "#666"}
            fill="none"
            strokeLinejoin="round"
          ></path>
        </svg>
        Upvote. {likeCount}
      </button>
      <button
        style={{
          background: darkMode ? "#313131" : "#fff",
          color: darkMode ? "#b0b2b5" : "black",
          border: "none",
          borderLeft: darkMode ? "1px solid #474646" : "1px solid lightgrey",
          borderRadius: "25px",
        }}
        onClick={handleDislike}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m12 20 9-11h-6V4H9v5H3z"
            className="icon_svg-stroke icon_svg-fill"
            stroke={darkMode ? "#b0b2b5" : "#666"}
            fill={"none"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  );
}

