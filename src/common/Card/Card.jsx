import "./Card.css"

export const Card = ({name, description, clickFunction}) => {

    return (
        <div className="cardDesign" onClick={clickFunction}>
            <div>{name}</div>
            <div>{description}</div>
        </div>
    )
}