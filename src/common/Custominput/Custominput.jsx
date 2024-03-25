
import "./Custominput.css"

// eslint-disable-next-line react/prop-types
export const CustomInput = ({ className, type, name, value, placeholder,disabled, functionChange, onBlurFunction }) => {
    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            value={value}
            onChange={functionChange}
            onBlur={onBlurFunction}
            
        />
    )
}
