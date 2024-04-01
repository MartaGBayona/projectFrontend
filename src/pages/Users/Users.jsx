import "./Users.css";
import { useState, useEffect } from "react";
import { Header } from "../../common/Header/Header";
import { GetUsers,DeleteUser } from "../../services/apiCalls";
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
                    setUsers(fetched);
                } catch (error) {
                    setErrorMsg("Error al obtener usuarios: " + error.message);
                }
            };

            BringData();
        }
    });

    const handleDelete = async (userId) => {
        try {
            if (userId === 1) {
                setErrorMsg("Super Admin cannot be deleted");
                return;
            }
    
            const response = await DeleteUser(passport.token, { id: userId });
            
            if (!response.success) {
                throw new Error(response.message || "Error al eliminar el usuario");
            }
    
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


