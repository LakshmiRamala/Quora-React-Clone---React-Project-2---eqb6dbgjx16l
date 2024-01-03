import axios from "axios";
import React, { useEffect } from "react";
export default function Space() {
    const userId = JSON.parse(sessionStorage.getItem("user"));


    const getSpace = async (space) => {
        try {
            const token = sessionStorage.getItem("userToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    projectId:"g4hvu8o4jh5h",
                },
            };
            const res = await axios.get(
                `https://academics.newtonschool.co/api/v1/quora/channel/${userId}`,
                config
            );
            console.log(res);
        } catch (err) {
            console.error("Error:", err);          
        }
    };
    useEffect(() => {
        getSpace();
    }, [])
    return (
        <>
            Space
        </>
    )
}