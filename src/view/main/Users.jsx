import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import CustonModal from "../components/CustonModal";
import { Button } from "react-bootstrap";

function Users() {

    const sty = {
        color: 'red'
    }

    const [users, setUsers] = useState([]);
    const [userToView, setUserToView] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:8082/userView/allUsers', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                    //console.log(data);

                } else {
                    console.error('Falha ao carregar os dados:', response.statusText);
                }

            } catch (error) {
                console.error('Falha ao carregar os dados', error);
            }
        }

        fetchUsers();
    }, []);

    // Exibindo dado
    function handleShowModal(user) {
        setUserToView(user);
        setShowModal(true);
    }

    function handleCloseModal() {
        setUserToView(null);
        setShowModal(false);
    }

    // Exibindo modal de confirmação de exclusão
    function handleDeleteUser(userId) {
        setModalConfirm(true);
        setUserToDelete(userId);
    }

    function handleCloseModalDelete() {
        setUserToDelete(null);
        setModalConfirm(false);
    }

    // Confirmando exclusão
    async function confirmDeleteUser(userId) {
        try {
            const response = await fetch(`http://localhost:8082/userView/deleteUserView/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (response.ok) {
                setUsers(users.filter(user => user.id !== userId));
                handleCloseModalDelete();

            } else {
                console.error('Falha ao excluir o usuário:', response.statusText);
            }

        } catch (error) {
            console.error('Falha ao excluir o usuário', error);
        }
        
    }

    return (
        <div className="container mt-2">
            <h1 className="text-center" style={sty}>Usuários cadastrados</h1>

            <div className="d-flex justify-content-end mb-3">
                <Link to="/admin/newUser" className="btn btn-primary ml-auto">Cadastrar usuário</Link>
            </div>

            <div className="">
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Idade</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Data/hora cadastro</th>
                            <th>#</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.lastname}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>{user.status ? 'Ativo' : 'Inativo'}</td>
                                <td>{new Date(user.datahoracadastro).toLocaleString()}</td>
                                <td style={{ display: "flex", gap: "10px" }}>
                                    <div>
                                        <Link to="#" onClick={() => handleShowModal(user)}>
                                            <FontAwesomeIcon icon={faEye} className="btn btn-success" />
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to={`/admin/updateUser/${user.id}`}>
                                            <FontAwesomeIcon icon={faPencil} className="btn btn-primary" />
                                        </Link>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteUser(user.id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CustonModal show={showModal}
                handleClose={handleCloseModal}
                title="Detalhes do Usuário"
                body={userToView && (
                    <div>
                        <strong>Nome:</strong> {userToView.name}
                        <br />
                        <strong>Sobrenome:</strong> {userToView.lastname}
                        <br />
                        <strong>Idade:</strong> {userToView.age}
                        <br />
                        <strong>Email:</strong> {userToView.email}
                        <br />
                        <strong>Status:</strong> {userToView.status ? 'Ativo' : 'Inativo'}
                        <br />
                        <strong>Data/Hora Cadastro:</strong> {new Date(userToView.datahoracadastro).toLocaleString()}
                    </div>
                )}
                footer={
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                }
            />

            <CustonModal 
                show={modalConfirm}
                handleClose={handleCloseModalDelete}
                title="Confirmação de Exclusão"
                body="Você tem certeza que deseja excluir este usuário?"
                footer={
                    <>
                      <Button variant="secondary" onClick={handleCloseModalDelete}>
                        Cancelar
                      </Button>
                      <Button variant="danger" onClick={() => confirmDeleteUser(userToDelete)}>
                        Excluir
                      </Button>
                    </>
                }
            />
        </div>
    );
}

export default Users;
