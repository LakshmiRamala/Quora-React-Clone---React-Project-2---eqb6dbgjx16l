import React from "react";
import "./Home.css"
import Addquestion from "./Addquestion";
import Postgrid from "./Postgrid";
import CreateSpace from "./CreateSpace";
import Advertisement from "./Advertisement";
import { useAuth } from "../Auth/AuthProvider";
export default function Home(){
    const { isLoggedIn } = useAuth();
    return (
        <div style={{display:"flex",justifyContent:"center",marginLeft:window.innerWidth>768?"15%":"5%",gap:"1%",position:"relative"}}>
            {window.innerWidth>768 && ( <CreateSpace/>)}
            <span style={{flexDirection:"column",width:"100%",marginTop:window.innerWidth>768?"5%":"130px"}}>
            {isLoggedIn && <Addquestion/>}
            <Postgrid/>
            </span>
            {window.innerWidth>768 && (<Advertisement/>   )} 
        </div>
    )
}