import React from "react";
import "./Home.css"
import Addquestion from "./Addquestion";
import Postgrid from "./Postgrid";
import CreateSpace from "./CreateSpace";
import Advertisement from "./Advertisement";
export default function Home(){
    return (
        <div style={{display:"flex",justifyContent:"center",marginLeft:"15%",gap:"1%",position:"relative"}}>
             <CreateSpace/>
            <span style={{flexDirection:"column",width:"100%"}}>
            <Addquestion/>
            <Postgrid/>
            </span>
            <Advertisement/>    
        </div>
    )
}