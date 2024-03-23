import { useState, useEffect } from "react"
import { CustomInput } from "../../common/Custominput/Custominput"
import { useNavigate } from "react-router-dom";
import "./Login.css"

export const Login = () => {
    const navigate =useNavigate()

    const [credenciales, setCredenciales] = useState({
        email: "",
        password: ""
    })

    const inputHandler = (e) => {
        console.log(e.target.value)
    }

    return (
        <div className="loginDesign">
            <CustomInput
                design="inputDesign"
                type="text"
                name="email"
                value={credenciales.email || ""}
                placeholder="Email"
                functionChange={inputHandler}
            />
            <CustomInput
                design="inputDesign"
                type="password"
                name="password"
                value={credenciales.password || ""}
                placeholder="Contraseña"
                functionChange={inputHandler}
            />
        </div>
    )
}