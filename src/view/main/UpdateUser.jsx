import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function UpdateUser() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [datahoracadastro, setDatahoracadastro] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`http://localhost:8082/userView/getUserById/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setLastname(data.lastname);
                    setAge(data.age);
                    setEmail(data.email);
                    setStatus(data.status);
                    setDatahoracadastro(data.datahoracadastro);
                } else {
                    console.error('Erro ao carregar dados do usuário:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            }
        }

        fetchUser();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') setName(value);
        else if (name === 'lastname') setLastname(value);
        else if (name === 'age') setAge(value);
        else if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
        else if (name === 'status') setStatus(value);
        else if (name === 'datahoracadastro') setDatahoracadastro(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Aqui você pode adicionar o código para enviar as alterações para o servidor
    }

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 style={{ color: 'yellow' }}>Editar usuário</h3>
                <Link to="/admin/users" className="btn btn-primary">Voltar</Link>
            </div>

            <div className="container d-flex justify-content-center align-items-center mt-3">
                <div className="container" style={{ maxWidth: '500px' }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastname">
                            <Form.Label>Sobrenome</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastname"
                                value={lastname}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formAge">
                            <Form.Label>Idade</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={age}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={status}
                                onChange={handleChange}
                                required
                            >
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDataHoraCadastro">
                            <Form.Label>Data/hora cadastro</Form.Label>
                            <Form.Control
                                type="text"
                                name="datahoracadastro"
                                value={datahoracadastro}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Salvar alterações
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser;
