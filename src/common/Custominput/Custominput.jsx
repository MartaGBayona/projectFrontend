
import "./Custominput.css"

// eslint-disable-next-line react/prop-types
export const CustomInput = ({ design, type, name, value, placeholder, functionChange }) => {
    return (
        <input
            className={design}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={functionChange}
            
        />
    )
}