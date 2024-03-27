import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetProfile, UpdateProfile } from "../../services/apiCalls";
import { CustomButton } from "../../common/customButton/customButton";
import { CustomInput } from "../../common/Custominput/Custominput";
//import dayjs from "dayjs";
import "./Profile.css"
import { Header } from "../../common/Header/Header"
import { validate } from "../../utils/functions";
import { GetAppointment, UpdateAppointment } from "../../services/apiCalls";

export const Profile = () => {
    const navigate = useNavigate();
    const dataUser = JSON.parse(localStorage.getItem("passport"));

    const [write, setWrite] = useState("disabled");
    const [tokenStorage, setTokenStorage] = useState(dataUser?.token);
    const [loadedData, setLoadedData] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        secondName: "",
        email: "",
    });

    const [userError, setUserError] = useState({
        firstNameError: "",
        secondNameError: "",
        emailError: "",
    });

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
        }))
    }

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage, navigate])

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const fetched = await GetProfile(tokenStorage);

                setLoadedData(true);

                setUser({
                    firstName: fetched.data.firstName,
                    secondName: fetched.data.secondName,
                    email: fetched.data.email,
                });
            } catch (error) {
                console.log(error)
            }
        };

        if (!loadedData) {
            getUserProfile();
        }
    },[user]);

    const updateData = async () => {
        try {
            const fetched = await UpdateProfile(tokenStorage, user);
    
            setUser((prevState) => ({
                ...prevState,
                firstName: fetched.data.firstName || prevState.firstName,
                secondName: fetched.data.secondName || prevState.secondName,
                email: fetched.data.email || prevState.email,
            }));
    
            setWrite("disabled");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <div className="profileDesign">
                {!loadedData ? (
                    <div>CARGANDO</div>
                ) : (
                    <div className="profileDesign">
                        <CustomInput
                            className={`inputDesign ${userError.firstNameError !== "" ? "inputDesignError" : ""
                                }`}
                            type={"text"}
                            placeholder={""}
                            name={"firstName"}
                            disabled={write}
                            value={user.firstName || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CustomInput
                            className={`inputDesign ${userError.secondNameError !== "" ? "inputDesignError" : ""
                                }`}
                            type={"text"}
                            placeholder={""}
                            name={"secondName"}
                            disabled={"disabled"}
                            value={user.secondName || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CustomInput
                            className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                                }`}
                            type={"email"}
                            placeholder={""}
                            name={"email"}
                            disabled={"disabled"}
                            value={user.email || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CustomButton
                            className={write === "" ? "buttonDesign" : "buttonDesign"}
                            title={write === "" ? "Confirmar" : "Editar"}
                            functionEmit={write === "" ? updateData : () => setWrite("")}
                        />
                    </div>
                )}
            </div>
        </>
    );
}