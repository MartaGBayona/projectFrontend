
import "./Custominput.css"

export const CustomInput = ({ className, type, name, value, placeholder,disabled, onChangeFunction, onBlurFunction }) => {
    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            value={value}
            onChange={onChangeFunction}
            onBlur={onBlurFunction}
            
        />
    )
}
