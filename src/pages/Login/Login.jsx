import { useState, useEffect } from "react"
import { CustomInput } from "../../common/Custominput/Custominput"
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";
import { validate } from "../../utils/functions";
import { decodeToken } from "react-jwt"
import "./Login.css"


export const Login = () => {
    const userData = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate();
    const [tokenStorage, setTokenStorage] = useState(userData?.token);

    const [credenciales, setCredenciales] = useState({
        email: "",
        password: ""
    });

    const [credencialesError, setCredencialesError] = useState({
        emailError: "",
        passwordError: "",
    });

    const [msgError, setMsgError] = useState("");

    useEffect(() => {
        if (tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage]);

    const inputHandler = (e) => {
        setCredenciales((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value);

        setCredencialesError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }))
    }
    const LoginMe = async () => {
        try {
            for (let elemento in credenciales) {
                if (credenciales[elemento] === "") {
                    throw new Error("Debes rellenar todos los campos");
                }
            }

            const fetched = await LoginUser(credenciales);

            const decoded = decodeToken(fetched.token)
        } catch (error) {

        }
    }

    return (
        <>
            <Header />
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
        </>
    )
}