import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../utils/DarkModeContext";
import axios from "axios";
import Comment from "./Comment";
import Like from "./Like";
import PostEdit from "./PostEdit";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

export default function Postgrid() {
  const { darkMode } = useContext(DarkModeContext);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [postlist, setPostlist] = useState([]);
  const [followList, setFollowList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [comment, setComment] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const storedFollowList = JSON.parse(localStorage.getItem(`${user}_followList`)) || [];
    setFollowList(storedFollowList);
    const storedCommentlist = JSON.parse(localStorage.getItem(`${user}_comment`)) || [];
    setComment(storedCommentlist);
    getPostsData();
  }, []);

  const getPostsData = async () => {
    if (!hasMore || loading) {
      setPage(1);
    };
    const config = {
      headers: {
        projectId: "g4hvu8o4jh5h",
      },
    };

    try {
      setLoading(true);
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/quora/post?limit=10&page=${page}`,
        config
      );
    
      if (response.data.data.length === 0) {
        setHasMore(false);
      } else {
        const initialFollowState = response.data.data.map(() => false);
        setFollowList((prevFollowList) =>
          prevFollowList.length ? prevFollowList : initialFollowState);
        const initialCommentList = response.data.data.map(() => false);
        setComment((prevComment) => [...prevComment, ...initialCommentList]);
        const newPosts = response.data.data;
        setPostlist((prevPosts) => [...prevPosts, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrolledToBottom = scrollTop + windowHeight >= documentHeight;

    if (scrolledToBottom) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    getPostsData();
  }, [page]);


  const handleFollow = (index) => {
    if (isLoggedIn) {
      const updatedFollowList = [...followList];
      updatedFollowList[index] = !updatedFollowList[index];
      setFollowList(updatedFollowList);
      localStorage.setItem(`${user}_followList`, JSON.stringify(updatedFollowList));
    } else {
      navigate("/login");
    }
  };


  const handleComment = (index) => {
    const updatedComment = [...comment];
    updatedComment[index] = !updatedComment[index];
    setComment(updatedComment);
    localStorage.setItem(`${user}_comment`, JSON.stringify(updatedComment));
  };

  return (
    <div className="postContainer" style={{ width: window.innerWidth <= 768 && "92%" }}>
      {postlist.map((post, index) => (
        <div style={{
          background: darkMode ? "#262626" : "#fff", color: darkMode ? "#8e8f8f" : "black",
        }} key={index} className="postgrid" >
          <section >
            <div className="autorContainer">
              {post.author && post.author.profileImage ? (
                <img src={post.author.profileImage} alt={post.author.name} className="authorImage" />) : (<><AccountCircleIcon sx={{ fontSize: 50 }} /></>)}
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
            {post.images && post.images.map((imageURL, imageIndex) => (
              <img key={imageIndex} src={imageURL} alt={`Image ${imageIndex}`} style={{ padding: "5%" }} width="90%" />
            ))}
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
        </div>
      ))}
      {loading && <div className="autorContainer" style={{ color: darkMode ? "#8e8f8f" : "black" }}>Loading...</div>}
    </div>
  );
}
