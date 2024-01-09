import React, { useContext, useRef, useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { DarkModeContext } from "../utils/DarkModeContext";
import axios from "axios";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./Search.css"
import { NavLink, useNavigate } from "react-router-dom";
import Addpost from "../Home/Addpost";

export default function Searchbar() {
    const { darkMode } = useContext(DarkModeContext);
    const inputref = useRef();
    const resultsRef = useRef();
    const [searchpost, setSearchPost] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [click,setclick]=useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    const handleInputChange = () => {
        const inputValue = inputref.current.value;
        if (inputValue) {
            const inputvalue = {
                searchval: inputValue,
            };
            setShow(true);
            getSearchPost(inputvalue);
        }
    };

    const getSearchPost = async (inputvalue) => {

        const config = {
            headers: {
                projectID: "g4hvu8o4jh5h",
            },
        };
        try {
            const response = await axios.get(
                `https://academics.newtonschool.co/api/v1/quora/post?search={"title":${JSON.stringify(inputvalue.searchval)}}`,
                config
            );
            setSearchPost(response.data.data);
        } catch (err) {
            console.log(`Error:`, err);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (resultsRef.current && !resultsRef.current.contains(event.target) && event.target !== inputref.current) {
                setShow(false);
                setclick(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const saveToSessionStorage = (post) => {
        sessionStorage.setItem("searchpost", JSON.stringify(post));
    };

    return (
        <section>
           {window.innerWidth>768 && ( <div style={{ position: 'relative', width: 'fit-content' }}>
                <SearchIcon style={{ position: 'absolute', left: '8px', color: "#666666", top: "20%" }} />
                <input
                    type="text"
                    placeholder="Search Quora"
                    className="searchInput"
                    ref={inputref}
                    onChange={handleInputChange}
                    style={{
                        background: darkMode ? '#262626' : '#fff',
                        color: darkMode ? 'white' : 'black',
                        paddingLeft: "30px",border:"none",
                        border: darkMode ? '1px solid #474646' : '1px solid grey',
                    }}
                />
            </div>)}
            {
                window.innerWidth<=768 && (
                    <section style={{display:"flex"}}>
                    <div style={{position:"relative"}} className="flexjust" onClick={()=>setclick(!click)} >
                        <SearchIcon sx={{ fontSize: 40 }} /> Search
                    </div>
                    {
                        click && <input
                        type="text"
                        placeholder="Search Quora"
                        ref={inputref}
                        onChange={handleInputChange}
                        style={{
                            background: darkMode ? '#262626' : '#fff',
                            color: darkMode ? 'white' : 'black',
                            paddingLeft: "30px"
                        }}
                    />
                    }                 
                    </section>
                )
            }
            {show && <div ref={resultsRef} className="results-list search-container" style={{
                background: darkMode ? '#262626' : '#fff',
                color: darkMode ? 'white' : 'black',
                border: darkMode ? '1px solid #474646' : '1px solid grey',
              width:window.innerWidth<=768 && "70%",

            }}>
                <div>
                    <NavLink className="questionSeach flexPro" style={{ color: darkMode ? 'white' : 'black', justifyContent: "flex-start",width:window.innerWidth<=768 && "90%" }} to={`/search/add?q=${inputref.current.value}`} onClick={()=>setclick(!click)}>
                        <SearchIcon style={{ color: "#666666" }} />
                        <span style={{ color: "#666666" }}>Search:</span> {inputref.current.value}
                    </NavLink>
                </div>
                {searchpost && searchpost.map((post, index) => (
                    <div key={index} className="result-title" style={{
                        borderBottom: darkMode ? '1px solid #474646' : '1px solid grey',
                        scrollbarColor: darkMode ? 'black black' : '#fff #262626',
                      
                    }} >
                        <NavLink className="questionSeach" style={{ color: darkMode ? 'white' : 'black' }} to={`/search/${post._id}?q=${inputref.current.value}`} onClick={() => { saveToSessionStorage(post)}}>        
                                           {post.title}
                        </NavLink>
                    </div>
                ))}
                <div className="addQuestion" onClick={() => {
                    setShow(false);
                    openModal();
                    setclick(false);
                }}>
                    <AddCircleOutlineIcon /> Add New Question
                </div>
            </div>}
            {modalOpen && <Addpost closeModal={() => setModalOpen(false)} selecttype={true} />}
        </section>
    )
} 