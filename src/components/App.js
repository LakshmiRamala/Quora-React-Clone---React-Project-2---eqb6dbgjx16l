import React from "react";
import "../styles/App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Answer from "./Answer/Answer";
import Follow from "./Follow/Follow";
import Space from "./Space/Space";
import Notifications from "./Notifications/Notifications";
import DarkModeProvider from "./utils/DarkModeContext";
import DisplaySearch from "./Search/DisplaySearch";
import FindQuestion from "./Search/FindQuestion";
import SingleSpace from "./Space/SingleSpace";
import { Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import AuthProvider from "./Auth/AuthProvider";
import Settings from "../Profile/Settings";
import AuthNavigator from "./Navbar/AuthNavigator";
import ResponsiveNav from "./Navbar/ResponsiveNav";


function App() {

  return (
    <div className="App">
      <AuthProvider>
      <DarkModeProvider>
          <div>
            {window.innerWidth > 768 && (<Navbar />)}
            {window.innerWidth<=768 && <ResponsiveNav/>}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/answer" element={<Answer />} />
              <Route path="/following" element={<AuthNavigator><Follow /></AuthNavigator>} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/space" element={<Space />} />
              <Route path="/space/:id" element={<SingleSpace/>}/>
              <Route path="/notifications" element={<AuthNavigator><Notifications /></AuthNavigator>} />
              <Route path="/search/add" element={<DisplaySearch />} />
              <Route path="/search/:id" element={<FindQuestion/>}/>  
              <Route path="/settings" element={<AuthNavigator><Settings/></AuthNavigator>}/> 
              <Route path="*" element={<h2>Page not found!!!!</h2>} /> 
            </Routes>
            
          </div>
        </DarkModeProvider>
        </AuthProvider>
    </div>
  );
}

export default App;
