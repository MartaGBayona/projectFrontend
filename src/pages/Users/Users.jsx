import "./Users.css";
import { useState, useEffect } from "react";
import { Header } from "../../common/Header/Header";
import { GetUsers } from "../../services/apiCalls";
import { UserCard } from "../../common/Card/Card";

export const Users = () => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (users.length === 0) {
            const BringData = async () => {
                try {
                    const fetched = await GetUsers(passport.token);
                    console.log("Datos de usuarios:", fetched);
                    setUsers(fetched);
                } catch (error) {
                    setErrorMsg("Error al obtener usuarios: " + error.message);
                }
            };

            BringData();
        }
    }, [users]);

    const handleDelete = async (userId) => {
        try {
            await deleteUser(passport.token, userId); // Asume que tienes una función deleteUser en tus servicios
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            setErrorMsg("Error al eliminar el usuario: " + error.message);
        }
    };

    

    return (
        <>
            <Header />
            <div className="userDesign">
                <div className="titleDesign">
                    Lista de Usuarios
                </div>
                {users.length > 0 ? (
                    <div className="cardsRoster">
                        {users.map(user => {
                            console.log(user);
                            return (
                                <UserCard
                                key={user.id}
                                firstName={<span className="userFirstName">Nombre: {user.firstName}</span>}
                                secondName={<span className="userSecondName">Apellido: {user.secondName}</span>}
                                email={<span className="userEmail">Correo: {user.email}</span>}
                                onDelete={() => handleDelete(user.id)}
                                isDeletable={user.id !== 1}
                            />
                            )
                            
                        }

                        )}
                    </div>
                ) : (
                    <div>{errorMsg || "Los usuarios están viniendo."}</div>
                )}
            </div>
        </>
    );
}


