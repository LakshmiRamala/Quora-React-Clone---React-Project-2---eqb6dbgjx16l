import React from "react";
import "./Home.css"
import Addquestion from "./Addquestion";
import Postgrid from "./Postgrid";
import CreateSpace from "./CreateSpace";
import Advertisement from "./Advertisement";
export default function Home(){
    return (
        <div style={{display:"flex",justifyContent:"center",marginLeft:window.innerWidth>768?"15%":"5%",gap:"1%",position:"relative"}}>
            {window.innerWidth>768 && ( <CreateSpace/>)}
            <span style={{flexDirection:"column",width:"100%",marginTop:window.innerWidth>768?"5%":"130px"}}>
            <Addquestion/>
            <Postgrid/>
            </span>
            {window.innerWidth>768 && (<Advertisement/>   )} 
        </div>
    )
}