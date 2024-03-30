import "./Appointments.css";
import { useState, useEffect } from "react";
import { Header } from "../../common/Header/Header";
import { GetAppointment,  DeleteAppointment } from "../../services/apiCalls";
import { CustomButton } from "../../common/customButton/customButton";
import dayjs from 'dayjs';

export const Appointment = () => {

    const dataUser = JSON.parse(localStorage.getItem("passport"));
    // eslint-disable-next-line no-unused-vars
    const [tokenStorage, setTokenStorage] = useState(dataUser?.token);
    const [loadedData, setLoadedData] = useState(false);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const getUserAppointment = async () => {
            try {
                console.log("Obteniendo citas con token:", tokenStorage);
                
                const fetched = await GetAppointment(tokenStorage);
                
                console.log("Datos obtenidos:", fetched);

                const formattedAppointments = fetched.data.map((appointment, index) => {
                    console.log("Appointment:", appointment);
                    console.log("Index:", index);
                    return {
                        ...appointment,
                        id: appointment.id ,
                    };
                });

                setAppointments(formattedAppointments);
                setLoadedData(true);
            } catch (error) {
                console.log("Error al obtener citas:", error);
            }
        };

        if (!loadedData) {
            getUserAppointment();
        }
    }, [tokenStorage, loadedData]);

    const deleteAppointment = async (appointmentId) => {
    try {
        console.log("ID del appointment a eliminar:", appointmentId);

        if (appointmentId === null || appointmentId === undefined || appointmentId === "") {
            throw new Error("El ID del appointment es inválido");
        }
        console.log(appointmentId)
        console.log(tokenStorage)
        const result = await DeleteAppointment(tokenStorage, appointmentId );

        if (result.success) {
            console.log("Cita eliminada con éxito");

            setLoadedData(false);
            window.location.reload();

        } else {
            throw new Error(result.message || 'Error deleting appointment');
        }

    } catch (error) {
        console.log("Error al eliminar la cita:", error);
    }
};

    console.log("IDs de citas:", appointments.map(appointment => appointment.id));

    return (
        <>
            <Header />
            <div className="appointmentDesign">
            <div className="titleDesign">
                    Mis citas
                </div>
                <div>
                    {
                        loadedData && appointments.length > 0
                            ? (appointments.map((appointment) => {
                                return (
                                    <div key={appointment.id} className='appointStyle'>
                                        <div>
                                            Servicio: {appointment.service.name}
                                        </div>
                                        <div>
                                            Fecha: {dayjs(appointment.appointment_date).format('DD/MM/YYYY')}
                                        </div>
                                        <CustomButton
                                            className="buttonDesign"
                                            title="Eliminar"
                                            functionEmit={() => {
                                                deleteAppointment(appointment.id);
                                            }}
                                        />
                                    </div>
                                )
                            })
                            ) : ("null")
                    }
                </div>
            </div>
        </>
    );
};