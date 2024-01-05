import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../components/utils/Store"; 
import "../styles/App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Answer from "./Answer/Answer";
import Follow from "./Follow/Follow";
import Space from "./Space/Space";
import Notifications from "./Notifications/Notifications";
import DarkModeProvider from "./utils/DarkModeContext";
import Searchbar from "./Search/Searchbar";
import DisplaySearch from "./Search/DisplaySearch";
import FindQuestion from "./Search/FindQuestion";

function RouterForHeader() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DarkModeProvider>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/answer" element={<Answer />} />
              <Route path="/following" element={<Follow />} />
              <Route path="/space" element={<Space />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/search/add" element={<DisplaySearch />} />
              <Route path="/search/:id" element={<FindQuestion/>}/>   
            </Routes>
            
          </div>
        </DarkModeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default RouterForHeader;


