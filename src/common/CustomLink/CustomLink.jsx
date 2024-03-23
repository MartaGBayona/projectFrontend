import { useNavigate } from "react-router-dom";
import "./CustomLink.css"

// eslint-disable-next-line react/prop-types
export const CustomLink = ({title, destination}) => {
    const navigate = useNavigate();

    return (
        <div className="navigateDesign" onClick={() => navigate (destination)}>
            {title}
        </div>
    )
}