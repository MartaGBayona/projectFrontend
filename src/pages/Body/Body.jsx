import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register"
import { Services } from "../ServicesOffered/Services";
import { Profile } from "../Profile/Profile";
import { Appointment } from "../Appointments/Appointments";
import { Users } from "../Users/Users"

export const Body = () => {
    return (
        <Routes>
            <Route path="*" element = {<Navigate to = {"/"} replace/>}/>
            <Route path="/" element = {<Home />}/>
            <Route path="/login" element = {<Login />}/>
            <Route path="/register" element = {<Register />}/>
            <Route path="/services" element = {<Services />}/>
            <Route path="/profile" element = {<Profile />}/>
            <Route path="/appointments" element = {<Appointment />}/>
            <Route path="/users" element = {<Users />}/>
        </Routes>
    )
}