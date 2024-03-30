import { useState, useEffect } from "react"
import { CustomInput } from "../../common/Custominput/Custominput"
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";
import { validate } from "../../utils/functions";
import { decodeToken } from "react-jwt"
import { LoginUser } from "../../services/apiCalls";
import { CustomButton } from "../../common/customButton/customButton";
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
    }, [tokenStorage, navigate]);

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

            const passport = {
                token: fetched.token,
                decoded: decoded,
            };
            console.log(decoded)

            localStorage.setItem("passport", JSON.stringify(passport));

            setMsgError(
                `Bienvenido de nuevo ${decoded.firstName}`
            );

            setTimeout(() => {
                navigate("/")
            }, 2000);
        } catch (error) {
            setMsgError(error.message)
        }
    }

    return (
        <>
            <Header />
            <div className="loginDesign">
            <div className="titleDesign">
                    Acceso a usuarios
                </div>
                <CustomInput
                    className={`inputDesign ${
                        credencialesError.emailError !== "" ? "inputDesignError" : ""
                    }`}
                    type={"email"}
                    placeholder={"email"}
                    name={"email"}
                    disabled={""}
                    value={credenciales.email || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                    
                />
                <div className="error">{credencialesError.emailError}</div>
                <CustomInput
                    className={`inputDesign ${credencialesError.passwordError !== "" ? "inputDesignError" : ""
                    }`}
                    type={"password"}
                    placeholder={"contraseña"}
                    name="password"
                    disabled={""}
                    value={credenciales.password || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{credencialesError.passwordError}</div>

                <CustomButton
                    className={"buttonDesign"}
                    title={"Acceso"}
                    functionEmit={LoginMe}
                    />
                    <div className="error">{msgError}</div>
            </div>
        </>
    )
}