import React from "react";
import "./Home.css"
import Addquestion from "./Addquestion";
import Postgrid from "./Postgrid";
import CreateSpace from "./CreateSpace";
import Advertisement from "./Advertisement";
import { useAuth } from "../Auth/AuthProvider";
import { useMediaQuery } from "react-responsive";
export default function Home(){
    const { isLoggedIn } = useAuth();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return (
        <div style={{display:"flex",justifyContent:"center",marginLeft:!isMobile?"15%":"5%",gap:"1%",position:"relative"}}>
            {!isMobile && ( <CreateSpace/>)}
            <span style={{flexDirection:"column",width:"100%",marginTop:!isMobile?"5%":"130px"}}>
            {isLoggedIn && <Addquestion/>}
            <Postgrid/>
            </span>
            {!isMobile && (<Advertisement/>   )} 
        </div>
    )
}