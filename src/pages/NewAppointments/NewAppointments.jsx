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
            <div className='newAppointmentDesign'>
            <div className='titleDesign'>
            Solicita tu cita</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <>Selecciona fecha y hora</>
                    <input
                        type="datetime-local"
                        name='appointmentDate'
                        value={appointmentData.appointmentDate || ""}
                        onChange={(e) => inputHandler(e)}
                        required
                    />
                </div>
                <div>
                    <>Selecciona un servicio</>
                    <input
                        type="text"
                        name='service'
                        value={appointmentData.service || ""}
                        onChange={(e) => inputHandler(e)}
                        required
                    />
                </div>
                <button 
                className='buttonDesign'
                type="submit">Solicitar cita</button>
            </form>
            {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default NewAppointment;

