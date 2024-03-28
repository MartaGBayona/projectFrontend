import "./Footer.css"
import { CustomLink } from "../CustomLink/CustomLink"


export const Footer = () => {


    return (
        <div className="footerDesign">
            <CustomLink
                title={"InkSoul"}
                destination={"/"}
            />
                        <CustomLink
                title={"Servicios"}
                destination={"/services"}
            />
            <div className="authMenu">
                        <CustomLink
                            title={"Cuenta"}
                            destination={"/login"}
                        />
                    </div>
            
        </div>
    )
    }