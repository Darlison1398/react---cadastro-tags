import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function UpdateTag() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        number: '',
        userId: '',
        status: ''
    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchTag() {
            try {
                const response = await fetch(`http://localhost:8082/tags/tagById/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        number: data.number,
                        userId: data.userId,
                        status: data.status ? 'ativo' : 'inativo'
                    });
                } else {
                    console.error('Erro ao carregar dados da tag:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao carregar dados da tag:', error);
            }
        }

        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:8082/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Erro ao carregar usuários:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao carregar usuários:', error);
            }
        }

        fetchTag();
        fetchUsers();
    }, [id]);

    function handleNumberChange(event) {
        setFormData({ ...formData, number: event.target.value });
    }

    function handleUserChange(event) {
        setFormData({ ...formData, userId: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:8082/tags/updateTag/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate('/admin/tags');
            } else {
                console.error('Erro ao atualizar a tag:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao atualizar a tag:', error);
        }
    }

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 style={{ color: 'yellow' }}>Editar tag</h3>
                <Link to="/admin/tags" className="btn btn-primary">Voltar</Link>
            </div>

            <div className="container d-flex justify-content-center align-items-center mt-3">
                <div className="container" style={{ maxWidth: '500px' }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNumber">
                            <Form.Label>Número da Tag</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Informe o número da tag" 
                                value={formData.number} 
                                onChange={handleNumberChange} 
                                required 
                            />
                        </Form.Group>
                
                        <Form.Group controlId="formUser">
                            <Form.Label>Selecione um usuário</Form.Label>
                            <Form.Control 
                                as="select"
                                value={formData.userId} 
                                onChange={handleUserChange} 
                                required
                            >
                                <option value="">Selecione um usuário</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary mt-4" type="submit">
                            Atualizar tag
                        </Button>
                    </Form>

                    <div className="mt-3">
                        <Link to="/admin/tags" className="btn btn-secondary">Cancelar</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateTag;
