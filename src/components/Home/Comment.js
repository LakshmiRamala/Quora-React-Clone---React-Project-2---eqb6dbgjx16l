import React, { useContext, useEffect, useRef, useState } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import { useAuth } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Comment({ post }) {
  const { darkMode } = useContext(DarkModeContext);
  const name = JSON.parse(sessionStorage.getItem("userName"));
  const commentRef = useRef();
  const [commentDetails, setCommentDetails] = useState([]);
  const authorId = JSON.parse(sessionStorage.getItem("user"));
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getPostComments();
  }, [name, post._id]);

  const commentThePost = async (comment) => {
    if (isLoggedIn) {
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
    } else {
      navigate("/login");
    }
  };

  const getPostComments = async () => {
    const token = sessionStorage.getItem("userToken");
    const config = {
      headers: {
        projectID: "g4hvu8o4jh5h",
      },
    };
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/quora/post/${post._id}/comments`,
        config
      );

      setCommentDetails(response.data.data || []);
    } catch (err) {
      console.log(`Error:`, err);
    }

  };

  const deleteComment = async (commentId) => {
    if (isLoggedIn) {
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
        getPostComments();
      } catch (err) {
        console.log(`Error:`, err);
      }
    } else {
      navigate("/login")
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
      <section className="flexPro" style={{ gap: "12px", background: darkMode ? "#262626" : "#fff", color: darkMode ? "#8e8f8f" : "black", }}>
        {!name && <AccountCircleIcon className="Profile" sx={{ fontSize: 40 }} />}
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
          {window.innerWidth > 768 ? "Add comment" : "Add"}
        </button>
      </section>
      {commentDetails.map((comment, index) => (
        <section
          key={index}
          style={{
            background: darkMode ? "#262626" : "#fff",
            color: darkMode ? "white" : "black",
            borderBottom: darkMode ? "1px solid #393839" : "1px solid #dee0e1"
          }}
          className="flexjust"
        >
          <div>

            <section style={{ display: "flex", alignItems: "center" }}>
              <div style={{color: darkMode ? "#8e8f8f" : "black",}}>
                {name &&authorId === comment.author ?  (
                  <main id="ProfileIcon" style={{ width: "40px", height: "40px" }}>
                    {name.charAt(0).toUpperCase()}
                  </main>):( <AccountCircleIcon className="Profile" sx={{ fontSize: 30 }}/>)}
              </div>
              <p>{comment.content}</p>
            </section>
            {comment.children && comment.children.map((reply, idx) => (
              <section key={idx} style={{ marginLeft: "20%", display: "flex", alignItems: "center" }}>
                <div style={{color: darkMode ? "#8e8f8f" : "black",}}>
                {name &&authorId === comment.author ?  (
                  <main id="ProfileIcon" style={{ width: "40px", height: "40px" }}>
                    {name.charAt(0).toUpperCase()}
                  </main>):( <AccountCircleIcon className="Profile" sx={{ fontSize: 30 }}/>)}
                </div>
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
