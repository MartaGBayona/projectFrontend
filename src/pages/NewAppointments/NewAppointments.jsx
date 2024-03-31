import { useState } from 'react';
import { CreateAppointment } from "../../services/apiCalls"
import { Header } from '../../common/Header/Header';
import dayjs from 'dayjs';
import "./NewAppointments.css"

const NewAppointment = () => {
    const [appointmentData, setAppointmentData] = useState({
        appointmentDate: "",
        service: ""
    });
    const [message, setMessage] = useState('');

    const inputHandler = (e) => {
        const { name, value } = e.target;
        console.log("Input name:", name);
        console.log("Input value:", value);
        const newValue = name === 'appointmentDate' ? dayjs(value).toISOString() : value;
        console.log("New value:", newValue);
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


            const response = await CreateAppointment(token, appointmentData);
            console.log(response)
            if (response.success) {
                setMessage(response.message);
                setAppointmentData('');
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
                    <>Selecciona fecha y hora </>
                    <input
                        className="custom-datetime"
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
                        className='selectDesign'
                        type="text"
                        name='service'
                        value={appointmentData.service || ""}
                        onChange={(e) => inputHandler(e)}
                        required
                    />
                </div>
                <button 
                className='deleteButtonDesign'
                type="submit">Solicitar cita</button>
            </form>
            {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default NewAppointment;

