import React from "react";
import SearchAddQuestion from "./SeachAddQuestion";
import Gridaddquestion from "./Gridaddquestion";
export default function DisplaySearch(){
    return (
        <section style={{display:"flex",justifyContent:"center",marginLeft:window.innerWidth>768 ?"8%":"3%",gap:"1%",position:"relative"}}>
       {window.innerWidth>768 && <SearchAddQuestion/>}
        <Gridaddquestion/>
        </section>
    )
}