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
        firstName: "",
        secondName: "",
        email: "",
        password: "",
    });

    const [userError, setUserError] = useState({
        firstNameError: "",
        secondNameError: "",
        emailError: "",
        passwordError: "",
    });

    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.firstName]: e.target.value,
            [e.target.secondName]: e.target.value
        }));
    };

    const checkError = (e) => {
        const errorFirstName = validate(e.target.firstName, e.target.value);
        const errorSecondName = validate(e.target.secondName, e.target.value)

        

        setUserError((prevState) => ({
            ...prevState,
            [e.target.firstName + "Error"]: errorFirstName,
            [e.target.secondName + "Error"]: errorSecondName
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
                    className={`inputDesign ${userError.errorFirstName !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    placeholder={"nombre"}
                    name={"firstName"}
                    value={user.name || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.errorFirstName}</div>
                <CustomInput
                    className={`inputDesign ${userError.errorSecondName !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    placeholder={"Apellido"}
                    name={"secondName"}
                    value={user.name || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.errorSecondName}</div>
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