import "./Card.css"

export const Card = ({name, description, clickFunction}) => {

    return (
        <div className="cardDesign" onClick={clickFunction}>
            <div>{name}</div>
            <div>{description}</div>
        </div>
    )
}

export const UserCard = ({ firstName, secondName, email, isDeletable, onDelete }) => {
    return (
        <div className="cardUserDesign">
            <div>{firstName}</div>
            <div>{secondName}</div>
            <div>{email}</div>
            {isDeletable && <button onClick={onDelete}>Borrar</button>}
        </div>
    );
}

export const ServiceCard = ({ service, appointmentDate, onDelete }) => {
    return (
        <div className="cardServiceDesign">
            <div>{service}</div>
            <div>{appointmentDate}</div>
            {<button onClick={onDelete}>Borrar</button>}
        </div>
    );
}