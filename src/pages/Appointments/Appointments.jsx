import "./Appointments.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header"
import { validate } from "../../utils/functions";
import { GetAppointment, UpdateAppointment } from "../../services/apiCalls";
import { CustomButton } from "../../common/customButton/customButton";
import { CustomInput } from "../../common/Custominput/Custominput";

export const Appointment = () => {
    
    const navigate = useNavigate();
    const dataAppointment = JSON.parse(localStorage.getItem("passport"));

    const [appointment, setAppointment] = useState({
        appointmentDate: "",
        service: "",
    });

    const [appointmentError, setAppointmentError] = useState({
        appointmentDateError: "",
        serviceError: "",
    });

    useEffect(() => {
        const getUserAppointment = async () => {
            try {
                const fetched = await GetAppointment(tokenStorage);

                setLoadedData(true);

                setAppointment({
                    appointmentDate: fetched.data.appointmentDate,
                    service: fetched.data.service,

                });
            } catch (error) {
                console.log(error)
            }
        };

        if (!loadedData) {
            getUserAppointment();
        }
    }, [appointment]);

    const UpdateAppointment = async () => {
        try {
            const fetched = await UpdateAppointment(tokenStorage, user);

            setAppointmentError((prevState) => ({
                ...prevState,
                appointmentDate: fetched.data.appointmentDate || prevState.appointmentDate,
                service: fetched.data.service || prevState.sservice,
            }));

            setWrite("disabled");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <div className="appointmentDesign">
                {!loadedData ? (
                    <div>CARGANDO</div>
                ) : (
                    <div className="appointmentDesign">

                        <CustomInput
                            className={`inputDesign ${appointmentError.appointmentDateError !== "" ? "inputDesignError" : ""
                                }`}
                            type={"appointmentDate"}
                            placeholder={""}
                            name={"appointmentDate"}
                            disabled={write}
                            value={user.appointmentDate || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />

                        <CustomInput
                            className={`inputDesign ${appointmentError.serviceError !== "" ? "inputDesignError" : ""
                                }`}
                            type={"service"}
                            placeholder={""}
                            name={"service"}
                            disabled={write}
                            value={user.appointmentDate || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />

                        <CustomButton
                            className={write === "" ? "buttonDesign" : "buttonDesign"}
                            title={write === "" ? "Confirmar" : "Editar"}
                            functionEmit={write === "" ? UpdateAppointment : () => setWrite("")}
                        />
                    </div>
                )}
            </div>
        </>
    );
}