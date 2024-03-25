import "./Register.css"
import { useState } from "react"
import { CustomInput } from "../../common/Custominput/Custominput"
import { Header } from "../../common/Header/Header"
import { CustomButton } from "../../common/customButton/customButton"
import { RegisterUser } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"
import { validate } from "../../utils/functions"

export const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [userError, setUserError] = useState({
        nameError: "",
        emailError: "",
        passwordError: "",
    });

    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value);

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }));
    };

    const registerMe = async () => {
        try {
            for (let element in user) {
                if (user[element] === "") {
                    throw new Error("Todos los campos deben ser completados")
                }
            }

            const fetched = await RegisterUser(user);

            console.log(fetched)
            setMsgError(fetched.message)

            setTimeout(() => {
                navigate("/")
            }, 1200);
        } catch (error) {
            setMsgError(error.message)
        }
    };

    return (
        <>
            <Header />
            <div className="registerDesign">
                <CustomInput
                    className={`inputDesign ${userError.nameError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    placeholder={"nombre"}
                    name={"name"}
                    value={user.name || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.nameError}</div>
                <CustomInput
                    className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"email"}
                    placeholder={"email"}
                    name={"email"}
                    value={user.email || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.emailError}</div>
                <CustomInput
                    className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"password"}
                    placeholder={"contraseña"}
                    name={"password"}
                    value={user.password || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.passwordError}</div>
                <CustomButton
                className={"buttonDesign"}
                title={"Register"}
                functionEmit={registerMe}
                />
                <div className="error">{msgError}</div>
            </div>
        </>
    )
}