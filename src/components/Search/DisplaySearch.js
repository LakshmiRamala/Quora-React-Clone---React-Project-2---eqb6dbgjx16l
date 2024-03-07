import React from "react";
import SearchAddQuestion from "./SeachAddQuestion";
import Gridaddquestion from "./Gridaddquestion";
import { useMediaQuery } from "react-responsive";
export default function DisplaySearch(){
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return (
        <section style={{display:"flex",justifyContent:"center",marginLeft:!isMobile ?"8%":"3%",gap:"1%",position:"relative"}}>
       {!isMobile && <SearchAddQuestion/>}
        <Gridaddquestion/>
        </section>
    )
}