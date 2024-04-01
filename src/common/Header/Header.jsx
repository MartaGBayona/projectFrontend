import { useState, useEffect } from 'react';
import { CustomLink } from "../CustomLink/CustomLink"
import { useNavigate } from "react-router-dom";
import "./Header.css"

export const Header = () => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [headerScroll, setheaderScroll] = useState(false);



    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop > 0) {
                setheaderScroll(true);
            } else {
                setheaderScroll(false);
            }
        }
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }, []);

    const logOut = () => {
        localStorage.removeItem("passport")
        navigate("/login")
    }


    return (
        <div className={headerScroll ? "headerDesign scrolled" : "headerDesign"}>
            <CustomLink
                title={"InkSoul"}
                destination={"/"}
            />
            <CustomLink
                title={"Servicios"}
                destination={"/services"}
            />

            {passport?.token
                ? (
                    <div className="authMenu">
                        <CustomLink
                            title={passport?.decoded?.firstName}
                            destination={"/profile"}
                        />
                        <div>
                            <CustomLink title={"Mis citas"} destination={"/appointments"} />
                        </div>
                        <div>
                            <CustomLink title={"Solicitar Cita"} destination={"/newappointments"} />
                        </div>
                        {passport?.decoded?.name === 'super_admin' && (
                            <div>
                                <CustomLink title={"Usuarios"} destination={"/users"} />
                            </div>
                        )}
                        <div onClick={logOut}>
                            <CustomLink title={"Cerrar sesión"} destination={"/"} />
                        </div>
                    </div>
                )
                : (
                    <div className="authMenu">
                        <CustomLink title={"Cuenta"} destination={"/login"} />
                        <CustomLink title={"Registro"} destination={"/register"} />
                    </div>
                )
            }
        </div>
    )
}