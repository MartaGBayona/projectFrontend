import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register"
import { Services } from "../ServicesOffered/Services";

export const Body = () => {
    return (
        <Routes>
            <Route path="*" element = {<Navigate to = {"/"} replace/>}/>
            <Route path="/" element = {<Home />}/>
            <Route path="/login" element = {<Login />}/>
            <Route path="/register" element = {<Register />}/>
            <Route path="/services" element = {<Services />}/>
        </Routes>
    )
}