import "./Services.css"
import { Header } from "../../common/Header/Header"
import { useState, useEffect } from "react"
import { Card } from "../../common/Card/Card"
import { GetServices } from "../../services/apiCalls"

export const Services = () => {

    return (
        <>
        <Header />
            <div className="servicesDesign">Soy la página servicios</div>
        </>
    )
}