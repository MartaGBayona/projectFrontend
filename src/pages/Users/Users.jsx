import "./Users.css";
import { useState, useEffect } from "react";
import { Header } from "../../common/Header/Header";
import { GetUsers } from "../../services/apiCalls";
import { Card } from "../../common/Card/Card";

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

    return (
        <>
            <Header />
            <div className="userDesign">
                <div className="titleDesign">
                    Lista de Usuarios
                </div>
                {users.length > 0 ? (
                    <div className="cardsRoster">
                        {users.map(user => (
                            <Card
                                key={user.id}
                                firstName={<span>{user.firstName}</span>}
                                secondName={<span>{user.secondName}</span>}
                                email={<span>{user.email}</span>}
                                //clickFunction={() => clickedService(service)}
                            />
                        ))}
                    </div>
                ) : (
                    <div>{errorMsg || "Los usuarios están viniendo."}</div>
                )}
            </div>
        </>
    );
}


