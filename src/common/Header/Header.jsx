import { useState, useEffect } from 'react';
import { CustomLink } from "../CustomLink/CustomLink"
//import { useNavigate } from "react-router-dom";
import "./Header.css"

export const Header = () => {
    const [headerScroll, setheaderScroll] = useState (false);

    useEffect(() => {
        const handleScroll = () => {
            const headerOnTop = window.scrollY || document.documentElement.headerOnTop;

            if(headerOnTop > 0) {
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


    //const navigate = useNavigate();
    const token = false;
    return (
        <div className={headerScroll ? "headerDesign scrolled" : "headerDesign"}>
            <CustomLink
                title="Home"
                destination="/"
            />
            {
                token
                    ? (<div className="authMenu">
                        <CustomLink
                            title="name"
                            destination="/profile"
                        />
                        <CustomLink
                            title="Log-out"
                            destination="/"
                        />

                    </div>)
                    : (<div className="authMenu">

                        <CustomLink
                            title="Login"
                            destination="/login"
                        />
                        <CustomLink
                            title="Register"
                            destination="/register"
                        />

                    </div>)
            }
        </div>
    )
}