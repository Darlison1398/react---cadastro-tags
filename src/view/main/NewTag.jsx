import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function NewTag() {
    const [number, setNumber] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const navigate = useNavigate();

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
                } else {
                    console.error('Falha ao carregar os dados:', response.statusText);
                }

            } catch (error) {
                console.error('Falha ao carregar os dados', error);
            }
        }

        fetchUsers();
    }, []);

    const handleNumberChange = (e) => setNumber(e.target.value);
    const handleUserChange = (e) => setSelectedUser(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            const url = 'http://localhost:8082/tags/saveTag';

            const response = await axios.post(url, {
                number: number,
                user_view: {
                    id: selectedUser
                }

            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200 || response.status === 201) {
                alert("Tag cadastrada com sucesso!");
                setNumber('');
                setSelectedUser('');
                navigate('/admin/tags');
            } else {
                console.error("Ocorreu um erro ao tentar cadastrar a tag:", response.statusText);
                alert("Ocorreu um erro ao tentar cadastrar a tag.");
                navigate('/admin/tags');
            }

        } catch (error) {
            console.error("Ocorreu um erro ao tentar cadastrar a tag:", error);
            alert("Ocorreu um erro ao tentar cadastrar a tag.");
            navigate('/admin/tags');
        }
    };

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 style={{ color: 'blue' }}>Nova Tag</h3>
                <Link to="/admin/tags" className="btn btn-primary">Voltar</Link>
            </div>

            <div className="container d-flex justify-content-center align-items-center mt-3">
                <div className="container" style={{ maxWidth: '500px' }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNumber">
                            <Form.Label>Número da Tag</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="Informe o número da tag" 
                                          value={number} 
                                          onChange={handleNumberChange} 
                                          required />
                        </Form.Group>
                
                        <Form.Group controlId="formUser">
                            <Form.Label>Selecione um usuário</Form.Label>
                            <Form.Control as="select"
                                          value={selectedUser} 
                                          onChange={handleUserChange} 
                                          required>
                                <option value="">Selecione um usuário</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary mt-4" type="submit">
                            Cadastrar tag
                        </Button>
                    </Form>

                    <div className="mt-3">
                        <Link to="/admin/tags" className="btn btn-secondary">Cancelar</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewTag;
