import "./Appointments.css";
import { useState, useEffect } from "react";
import { Header } from "../../common/Header/Header";
import { GetAppointment, UpdateAppointment } from "../../services/apiCalls";
import { CustomButton } from "../../common/customButton/customButton";
import dayjs from "dayjs";
import { CustomInput } from "../../common/Custominput/Custominput";

export const Appointment = () => {
    
    const dataUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(dataUser?.token);
    const [loadedData, setLoadedData] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const getUserAppointment = async () => {
            try {
                const fetched = await GetAppointment(tokenStorage);
                setAppointments(fetched.data);
                setLoadedData(true);
            } catch (error) {
                console.log(error);
            }
        };
    
        if (!loadedData) {
            getUserAppointment();
        }
    }, [tokenStorage, loadedData]);
    
    const updateAppointment = async (appointmentToUpdate) => {
        try {
            console.log("ID del appointment:", appointmentToUpdate.id);
    
            if (!appointmentToUpdate.id || appointmentToUpdate.id === "") {
                throw new Error("El ID del appointment es inválido");
            }
    
            const fetched = await UpdateAppointment(tokenStorage, appointmentToUpdate);
    
            console.log("Respuesta del backend:", fetched);
    
            setLoadedData(false); 
            setEditIndex(null);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
    };

    return (
        <>
            <Header />
            <div className="appointmentDesign">
                <div>
                    {
                        loadedData && appointments.length > 0 
                        ? (appointments.map((appointment, index) => {
                             return (
                                    <div key={appointment.id} className='appointStyle'>
                                        <div>
                                            Servicio: 
                                            {editIndex === index ? (
                                                <CustomInput
                                                className="inputDesign "
                                                    type="text"
                                                    value={appointment.service.name}
                                                    onChangeFunction={(e) => {
                                                        const updatedAppointments = [...appointments];
                                                        updatedAppointments[index].service.name = e.target.value;
                                                        setAppointments(updatedAppointments);
                                                    }}
                                                />
                                            ) : (
                                                appointment.service.name
                                            )}
                                        </div>
                                        <div>
                                            Fecha: 
                                            {editIndex === index ? (
                                                <CustomInput
                                                className="inputDesign "
                                                    type="date"
                                                    value={dayjs(appointment.appointment_date).format('YYYY-MM-DD')}
                                                    onChangeFunction={(e) => {
                                                        const updatedAppointments = [...appointments];
                                                        updatedAppointments[index].appointment_date = dayjs(e.target.value).toISOString();
                                                        setAppointments(updatedAppointments);
                                                    }}
                                                />
                                            ) : (
                                                dayjs(appointment.appointment_date).format('DD/MM/YYYY')
                                            )}
                                        </div>
                                        <CustomButton
                                            className="buttonDesign"
                                            title={editIndex === index ? "Confirmar" : "Editar"}
                                            functionEmit={editIndex === index ? () => updateAppointment(appointment) : () => handleEdit(index)}
                                        />
                                    </div>
                                )
                            })
                        ): ("null")
                    }
                </div>
            </div>
        </>
    );
};