import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import axios from "axios";
import Comment from "../Home/Comment";
import Like from "../Home/Like";
import PostEdit from "../Home/PostEdit";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Advertisement from "../Home/Advertisement";
import { useAuth } from "../Auth/AuthProvider";
import AnswerModel from "../Answer/AnswerModel";


export default function FindQuestion() {
  const { id } = useParams();
  const location = useLocation();
  const { darkMode } = useContext(DarkModeContext);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [followList, setFollowList] = useState([]);
  const [comment, setComment] = useState([]);
  const [index, setIndex] = useState(-1);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const storedFollowList = JSON.parse(localStorage.getItem("followList")) || [];
    setFollowList(storedFollowList);
    const storedCommentlist = JSON.parse(localStorage.getItem("comment")) || [];
    setComment(storedCommentlist);
    getPostData();
  }, [id, location]);

  const getPostData = async () => {
    const config = {
      headers: {
        projectId: "g4hvu8o4jh5h",
      },
    };

    try {
      setLoading(true);
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/quora/post/${id}`,
        config
      );
      const postData = response.data.data;
      setPost(postData);
      setIndex(0);

      const initialFollowState = [false];
      setFollowList(initialFollowState);

      const initialCommentList = [false];
      setComment(initialCommentList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = () => {
    if (isLoggedIn()) {
      const updatedFollowList = [...followList];
      updatedFollowList[0] = !updatedFollowList[0];
      setFollowList(updatedFollowList);
      localStorage.setItem("followList", JSON.stringify(updatedFollowList));
    } else {
      navigate("/login", { state: { prevPath: `/search/${id}` } })
    }
  };

  const handleComment = () => {
    const updatedComment = [...comment];
    updatedComment[0] = !updatedComment[0];
    setComment(updatedComment);
    localStorage.setItem("comment", JSON.stringify(updatedComment));
  };
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  return (
    <section style={{ display: "flex", justifyContent: "center", marginLeft:window.innerWidth>768? "15%":"3%", gap: "1%", position: "relative" }}>
      <span style={{ flexDirection: "column", width: "100%",}}>
        <div className="advertisementContainer" style={{ background: darkMode ? "#262626" : "#fff", height:window.innerWidth>768 ? "18%":"140px", width: "90%", padding: "2%", color: darkMode ? "white" : "black", }}>
          {post && index !== -1 && post.title && <h1>{post.title}</h1>}
          <div className="flexjust">
            <section>
              <span className="flexjust">
                <button className="flexPro" style={{ background: darkMode ? '#262626' : '#fff', border: darkMode ? '1px solid #474646' : '1px solid grey', color: darkMode ? '#b0b2b5' : 'black', borderRadius: "25px", cursor: "pointer" }} onClick={() => openModal(post)}><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="1.5" fill="none" fillRule="evenodd"><path d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z" className="icon_svg-stroke" stroke={darkMode ? "#b0b2b5 " : "#666"} strokeLinecap="round" strokeLinejoin="round"></path><path className="icon_svg-fill_as_stroke" fill={darkMode ? "#a0a2a5" : "#666"} d="m4.429 19.571 2.652-.884-1.768-1.768z"></path><path d="M14.5 19.5h5v-5m-10-10h-5v5" className="icon_svg-stroke" stroke={darkMode ? "#b0b2b5 " : "#666"} strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                  Answer</button>
                <button className="flexPro buttonnew" style={{ background: darkMode ? '#262626' : '#fff', color: darkMode ? '#b0b2b5' : 'black', }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g class="icon_svg-stroke" stroke={darkMode ? "#b0b2b5 " : "#666"} strokWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round"><path d="M14.5 19c0-5.663-3.337-9-9-9m14 9c0-8.81-5.19-14-14-14"></path><circle cx="7.5" cy="17" r="2" className="icon_svg-fill"></circle></g></svg>
                  Follow
                </button>
                <button className="flexPro buttonnew" style={{ background: darkMode ? '#262626' : '#fff', color: darkMode ? '#b0b2b5' : 'black',}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g class="icon_svg-stroke" stroke={darkMode ? "#b0b2b5 " : "#666"} strokeWidth="1.5" fill="none" fillRule="evenodd"><path d="M20 20.5a5 5 0 0 0-10 0m5-7.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" className="icon_svg-fill"></path><path d="m6 10 2.5 3L6 16m-3-2.976h5.495" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                  Request
                </button>
              </span>
            </section>
          {window.innerWidth>768 &&  <section >
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

        </div>
        <div className="postContainer" style={{ width: "94%",marginTop:window.innerWidth<=768 && "50px" }}>
          {post && index !== -1 && (
            <div
              style={{
                background: darkMode ? "#262626" : "#fff",
                color: darkMode ? "#8e8f8f" : "black",
                marginTop: "20%",
              }}
              className="postgrid"
            >
              <section >
                <div className="autorContainer">
                  {post.author && post.author.profileImage && (
                    <img src={post.author.profileImage} alt={post.author.name} className="authorImage" />)}
                  <section>
                    <span style={{ color: darkMode ? "white" : "black", fontWeight: 800, }} >
                      {post.author.name}
                    </span>
                    <span
                      onClick={() => handleFollow(index)}
                      style={{
                        color: followList[index] ? "grey" : "#488bec", fontWeight: 600, fontSize: "14px", paddingLeft: "8px", cursor: "pointer"
                      }}>
                      {followList[index] ? "Following" : "Follow"}
                    </span>
                    <br />
                    <span style={{ fontSize: "14px" }}>
                      Lives in Assam, India (1997–present)
                    </span>
                  </section>
                </div>
                <h3 style={{ color: darkMode ? "white" : "black" }} className="questionHeading">{post.title}</h3>
                <p style={{ color: darkMode ? "#cacbcb" : "black" }}>{post.content}</p>
                <div style={{ display: "flex", position: "relative" }}>
                  <div style={{ display: "flex" }}>
                    <section style={{
                      display: "flex", borderRadius: "25px", background: darkMode ? "#313131" : "#fff", color: darkMode ? "#b0b2b5" : "black",
                      border: darkMode ? "1px solid #474646" : "1px solid lightgrey",
                    }} className="likedislike">
                      <Like key={post._id} post={post} />

                    </section>
                    <section>
                      <button style={{
                        background: darkMode ? "#262626" : "#fff", color: darkMode ? "#b0b2b5" : "black", border: "none", padding: "2px"
                        , marginLeft: "10%"
                      }} className="flexPro" onClick={() => handleComment(index)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z" className="icon_svg-stroke icon_svg-fill" stroke={darkMode ? "#b0b2b5" : "#666"} strokeWidth="1.5" fill="none"></path></svg>
                        {post.commentCount}
                      </button>
                    </section>
                    <section>
                      <button style={{
                        background: darkMode ? "#262626" : "#fff", color: darkMode ? "#b0b2b5" : "black", border: "none", padding: "2px", marginLeft: "10px"
                      }} className="flexPro" ><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" stroke={darkMode ? "#b0b2b5" : "#666"} strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round"><path d="M19.748 10a8.003 8.003 0 0 0-15.496.002m.001 4.003a8.003 8.003 0 0 0 15.494 0"></path><path d="m2.5 7.697 1.197 3.289 3.289-1.197m14.5 6.5L20.289 13 17 14.197"></path></g></svg></button>
                    </section>
                  </div>
                  <section>
                    <PostEdit key={post._id} postDetails={post} />
                  </section>
                </div>

              </section>
              {comment[index] && <Comment key={post._id} post={post} />}
              {modalOpen && <AnswerModel closeModal={() => setModalOpen(false)} post={selectedPost} />}
            </div>
          )}
        </div>
      </span>

      {window.innerWidth>768 && <span style={{ marginTop: "5%", width: "100%" }}>
        <Advertisement />
      </span>}
    </section>

  );
}
