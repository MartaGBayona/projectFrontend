import "./Users.css";
import { useState, useEffect } from "react";
import { Header } from "../../common/Header/Header";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await GetUsers();  // Aquí llamamos a la función GetUsers
                setUsers(data);
            } catch (error) {
                setErrorMsg("Error al obtener usuarios");
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <Header />
            <div className="loginDesign">
                <div className="titleDesign">
                    Acceso a usuarios
                </div>

                {/* Renderizar la lista de usuarios */}
                <div className="userList">
                    {users.map((user, index) => (
                        <div key={index} className="userItem">
                            <div>ID: {user.id}</div>
                            <div>Email: {user.email}</div>
                            <div>First Name: {user.firstName}</div>
                            <div>Second Name: {user.secondName}</div>
                            <div>Role: {user.role.name}</div>
                        </div>
                    ))}
                </div>

                <div className="error">{errorMsg}</div>
            </div>
        </>
    );
}

