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
    const [tokenStorage, setTokenStorage] = useState(dataAppointment?.token);
    const [loadedData, setLoadedData] = useState(false);
    const [write, setWrite] = useState("disabled");

    const [appointment, setAppointment] = useState({
        id: "",  // Asegúrate de que appointment tenga un campo id
        appointmentDate: "",
        service: "",
    });

    const [appointmentError, setAppointmentError] = useState({
        appointmentDateError: "",
        serviceError: "",
    });

    const inputHandler = (e) => {
        setAppointment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value);
        setAppointmentError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }))
    }


    useEffect(() => {
        const getUserAppointment = async () => {
            try {
                const fetched = await GetAppointment(tokenStorage);
    
                console.log("Respuesta del backend:", fetched);  // Depuración para verificar la respuesta del backend
    
                setLoadedData(true);
    
                if (fetched && fetched.data && fetched.data.length > 0) {
                    // Seleccionar la primera cita del array data por defecto
                    const firstAppointment = fetched.data[0];
    
                    if (firstAppointment && firstAppointment.id) {
                        setAppointment({
                            ...appointment,
                            id: firstAppointment.id,
                            appointmentDate: firstAppointment.appointmentDate,
                            service: firstAppointment.service.name,
                        });
                    } else {
                        throw new Error("El ID del appointment es inválido");
                    }
                } else {
                    throw new Error("No se pudo obtener el ID del appointment");
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        if (!loadedData) {
            getUserAppointment();
        }
    }, [tokenStorage, loadedData]);
    
    const updateAppointment = async () => {
        try {
            // Verificar el valor del ID justo antes de actualizar
            console.log("ID del appointment:", appointment.id);
    
            // Asegúrate de que appointment tenga un campo id válido
            if (!appointment.id || appointment.id === "") {
                throw new Error("El ID del appointment es inválido");
            }
    
            const fetched = await UpdateAppointment(tokenStorage, appointment);
    
            setAppointmentError((prevState) => ({
                ...prevState,
                appointmentDate: fetched.appointmentDate || prevState.appointmentDate,
                service: fetched.service || prevState.service,
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
                            value={appointment.appointmentDate || ""}
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
                            value={appointment.service || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />

                        <CustomButton
                            className={write === "" ? "buttonDesign" : "buttonDesign"}
                            title={write === "" ? "Confirmar" : "Editar"}
                            functionEmit={write === "" ? updateAppointment : () => setWrite("")}
                        />
                    </div>
                )}
            </div>
        </>
    );
}