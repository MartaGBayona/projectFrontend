import { CustomLink } from "../CustomLink/CustomLink"
//import { useNavigate } from "react-router-dom";
import "./Header.css"

export const Header = () => {
    //const navigate = useNavigate();
    const token = false;
    return (
        <div className="headerDesign">
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