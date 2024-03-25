import "./customButton.css"

// eslint-disable-next-line react/prop-types
export const CustomButton = ({ className, title, functionEmit }) => {
    return (
        <div className={className} onClick={functionEmit}>
            {title}
        </div>
    )
}