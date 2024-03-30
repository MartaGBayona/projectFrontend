import { useState } from 'react';
import { CreateAppointment } from "../../services/apiCalls"
import { Header } from '../../common/Header/Header';
import "./NewAppointments.css"

const NewAppointment = () => {
    const [appointmentData, setAppointmentData] = useState({
        appointmentDate: "",
        service: ""
    });
    //const [user, setUser] = useState('');
    //const [service, setService] = useState('');
    const [message, setMessage] = useState('');

    const inputHandler = (e) => {
        setAppointmentData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(appointmentData)
        try {
            const passport = JSON.parse(localStorage.getItem("passport"));
            const token = passport.token
            console.log(token)
            // const appointmentData = {
            //     appointmentDate,
            //     user: userId,
            //     service, // Asume que tienes el ID del servicio disponible en el estado del componente
            // };

            const response = await CreateAppointment(token, appointmentData);
            console.log(response)
            if (response.success) {
                setMessage(response.message);
                // Limpia los campos del formulario después de crear la cita
                setAppointmentData('');
                //setService('');
            } else {
                setMessage(response.message);
            }
        } catch (error) {
            setMessage('Appointment cannot be created');
        }
    };

    return (
        <div>
            <Header />
            <h2>Create Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Appointment Date:</label>
                    <input
                        type="datetime-local"
                        name='appointmentDate'
                        value={appointmentData.appointmentDate || ""}
                        onChange={(e) => inputHandler(e)}
                        required
                    />
                </div>
                {/* <div>
                    <label>User:</label>
                    <input
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                </div> */}
                <div>
                    <label>Service:</label>
                    <input
                        type="text"
                        name='service'
                        value={appointmentData.service || ""}
                        onChange={(e) => inputHandler(e)}
                        required
                    />
                </div>
                <button type="submit">Create Appointment</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default NewAppointment;

