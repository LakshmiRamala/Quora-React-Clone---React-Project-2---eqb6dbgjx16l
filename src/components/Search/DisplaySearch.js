import React from "react";
import SearchAddQuestion from "./SeachAddQuestion";
import Gridaddquestion from "./Gridaddquestion";
export default function DisplaySearch(){
    return (
        <section style={{display:"flex",justifyContent:"center",marginLeft:"8%",gap:"1%",position:"relative"}}>
        <SearchAddQuestion/>
        <Gridaddquestion/>
        </section>
    )
}