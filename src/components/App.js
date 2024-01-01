import React from "react";
import "../styles/App.css";
import RouterForHeader from "./RouterForHeader";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../components/utils/UserSlice";
import { useEffect } from "react";
import { auth } from "../components/utils/Firebase";
import Userlogin from "../components/Auth/Userlogin";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("userToken");

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            photo: authUser.photoURL,
            uid: authUser.uid,
          })
        );
        console.log(authUser);
        sessionStorage.setItem("userToken",authUser.accessToken );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user || token ? <RouterForHeader /> : <Userlogin />}
    </div>
  );
}

export default App;
