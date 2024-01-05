import React, { useContext, useEffect, useRef, useState } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/UserSlice";
import { Avatar } from "@mui/material";
import axios from "axios";

export default function Comment({ post }) {
  const { darkMode } = useContext(DarkModeContext);
  const user = useSelector(selectUser);
  const name = JSON.parse(sessionStorage.getItem("userName"));
  const commentRef = useRef();
  const [commentDetails, setCommentDetails] = useState([]);
  const authorId = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    getPostComments();
  }, [name, post._id]); 

  const commentThePost = async (comment) => {
    const token = sessionStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        projectID: "g4hvu8o4jh5h",
        "Content-Type": "application/json"
      },
    };
    try {
      await axios.post(
        `https://academics.newtonschool.co/api/v1/quora/comment/${post._id}`,
        { content: comment.comment, appType: "quora" },
        config
      );
      window.location.reload();
    } catch (err) {
      console.log(`Error:`, err);
    }
  };

  const getPostComments = async () => {
    const token = sessionStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        projectID: "g4hvu8o4jh5h",
      },
    };
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/quora/post/${post._id}/comments`,
        config
      );

      setCommentDetails(response.data.data || []);
      console.log("post data", response.data.data);
    } catch (err) {
      console.log(`Error:`, err);
    }
  };

  const deleteComment = async (commentId) => {
    const token = sessionStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        projectID: "g4hvu8o4jh5h",
      },
    };
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/quora/comment/${commentId}`,
        config
      );
      console.log("Deleted comment:", response.data.data);
      getPostComments(); 
    } catch (err) {
      console.log(`Error:`, err);
    }
  };

  const handleComment = () => {
    const commentDetails = {
      comment: commentRef.current.value,
    };
    commentThePost(commentDetails);
  };

  return (
    <div style={{ marginTop: "1%" }}>
      <section className="flexPro" style={{ gap: "12px" }}>
        {user && (
          <Avatar src={user?.photo} alt="profile_img" style={{ width: "40px", height: "40px" }} />
        )}
        {name && (
          <main id="ProfileIcon" style={{ width: "40px", height: "40px" }}>
            {name.charAt(0).toUpperCase()}
          </main>
        )}

        <input
          type="text"
          placeholder="Add a comment..."
          style={{ width: "64%" }}
          className={darkMode ? "Darkinput seachHome" : "input seachHome"}
          ref={commentRef}
          required
        />
        <button className="addCommentbtn" onClick={handleComment}>
          Add comment
        </button>
      </section>
      {commentDetails.map((comment, index) => (
        <section
          key={index}
          style={{
            background: darkMode ? "#262626" : "#fff",
            color: darkMode ? "white" : "black",
            borderBottom: "1px solid #393839"
          }}
          className="flexjust"
        >
          <div>
            <p>{comment.content}</p>
            {comment.children && comment.children.map((reply, idx) => (
              <section key={idx} style={{ marginLeft:"20%" }}>
                <p>{reply.content}</p>
              </section>
            ))}
          </div>
          {authorId === comment.author && (
            <button
              className="addCommentbtn"
              onClick={() => {
                  deleteComment(comment._id);              
              }}
            >
              Delete
            </button>
          )}
        </section>
      ))}
    </div>
  );
}
