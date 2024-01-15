import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

export default function Like({ post }) {
  const { darkMode } = useContext(DarkModeContext);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const name = JSON.parse(sessionStorage.getItem("userName"));
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const storedLikedList = JSON.parse(localStorage.getItem(`${name}`)) || [];
    setLikedPosts(storedLikedList);
    const storedDislikeList = JSON.parse(localStorage.getItem(`${name}dislike`)) || [];
    setDislikedPosts(storedDislikeList);
  }, [name, likeCount]);

  const likeThePost = async () => {
    if (isLoggedIn) {
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
        setLikeCount(likeCount + 1);
        setLikedPosts([...likedPosts, post._id]);
        localStorage.setItem(`${name}`, JSON.stringify([...likedPosts, post._id]));
      } catch (err) {
        console.log(`Error:`, err);
      }
    } else {
      navigate("/login");
    }
  };

  const dislikePost = async (dislikeValue) => {
    if (isLoggedIn) {
    const token = sessionStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        projectID: "g4hvu8o4jh5h",
      },
    };
    try {
      await axios.delete(
        `https://academics.newtonschool.co/api/v1/quora/like/${post._id}`,
        config
      );
      setLikeCount(likeCount - 1);
      const updatedLikedPosts = likedPosts.filter((id) => id !== post._id);
      setLikedPosts(updatedLikedPosts);
      localStorage.setItem(`${name}`, JSON.stringify(updatedLikedPosts));
      if (dislikeValue) {
        const updatedDislikedPosts = [...dislikedPosts, post._id];
        setDislikedPosts(updatedDislikedPosts);
        localStorage.setItem(`${name}dislike`, JSON.stringify(updatedDislikedPosts));
      }
    } catch (err) {
      console.log(`Error:`, err);
    }
  } else {
    navigate("/login");
  }
  };

  const handleLike = async () => {
    if (likedPosts.includes(post._id)) {
      dislikePost();
    } else {
      likeThePost();
      if (dislikedPosts.includes(post._id)) {
        const updatedDislikedPosts = dislikedPosts.filter((id) => id !== post._id);
        setDislikedPosts(updatedDislikedPosts);
        localStorage.setItem(`${name}dislike`, JSON.stringify(updatedDislikedPosts));
      }
    }
  };

  const handleDislike = async () => {
    if (isLoggedIn) {
      if (dislikedPosts.includes(post._id)) {
        dislikePost();
      } else {
        dislikePost(true);
        setDislikedPosts([...dislikedPosts, post._id]);
        localStorage.setItem(
          `${name}dislike`,
          JSON.stringify([...dislikedPosts, post._id])
        );
      }
    } else {
      navigate("/login");
    }
  };
  

  return (
    <div style={{ display: "flex" }}>
      <button
        style={{
          background: darkMode ? "#313131" : "#fff",
          color: likedPosts.includes(post._id) ? "#4c94fd" : darkMode ? "#b0b2b5" : "black",
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
            stroke={likedPosts.includes(post._id) ? "#4c94fd" : darkMode ? "#b0b2b5" : "#666"}
            fill={likedPosts.includes(post._id) ? "#4c94fd" : "none"}
            strokeLinejoin="round"
          ></path>
        </svg>
        Upvote. {likeCount}
      </button>
      <button
        style={{
          background: darkMode ? "#313131" : "#fff",
          color: dislikedPosts.includes(post._id) ? "red" : darkMode ? "#b0b2b5" : "black",
          border: "none",
          borderLeft: darkMode ? "1px solid #474646" : "1px solid lightgrey",
          borderRadius: "25px",
        }}
        onClick={handleDislike}
      >
        <svg width="24"
height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path
d="m12 20 9-11h-6V4H9v5H3z"
className="icon_svg-stroke icon_svg-fill"
stroke={dislikedPosts.includes(post._id) ? "red" : darkMode ? "#b0b2b5" : "#666"}
fill={dislikedPosts.includes(post._id) ? "red" : "none"}
strokeWidth="1.5"
strokeLinejoin="round"
></path>
</svg>
</button>
</div>
);
}

