import "./Services.css"
import { Header } from "../../common/Header/Header"
import { useState, useEffect } from "react"
import { Card } from "../../common/Card/Card"
import { GetServices } from "../../services/apiCalls"

export const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        if (services.length === 0) {
            const BringData = async () => {
                try {
                    const fetched = await GetServices();
                    setServices(fetched)
                } catch (error) {
                    console.log(error);
                }
            };

            BringData();
        }
    }, [services]);

    const clickedService = (service) => {
        console.log(service)
    }

    return (
        <>
        <Header />
        <div className="servicesDesign">
        <div className="titleDesign">
                    Nuestros Servicios
                </div>
        {services.length > 0 ? (
                <div className="cardsRoster">{
                    services.map(
                        service => {
                            return (
                                <Card
                                    key={service.id}
                                    name={<span className="serviceName">{service.name}</span>}
                                    description={<span className="serviceDescription">{service.description}</span>}
                                    clickFunction={() => clickedService(service)}
                                />
                            )
                        }
                    )

                }</div>
            ) : (
                <div>Los servicios están viniendo.</div>
            )}
        </div>

        </>
    );
}