import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function UpdateUser() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        age: '',
        email: '',
        password: '',
        status: '',
        datahoracadastro: ''
    });

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
                    setFormData({
                        name: data.name,
                        lastname: data.lastname,
                        age: data.age,
                        email: data.email,
                        password: '',
                        status: data.status ? 'ativo' : 'inativo',  // Converte booleano para string
                        datahoracadastro: data.datahoracadastro  // Mantém a data no formato original
                    });
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
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const dataToSend = {
                ...formData,
                status: formData.status === 'ativo'  // Converte string para booleano
            };

            const response = await fetch(`http://localhost:8082/userView/updateUserView/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                navigate(-1); // Redireciona para a lista de usuários
            } else {
                const errorData = await response.json();
                console.error('Erro ao atualizar dados do usuário:', response.statusText, errorData);
            }
        } catch (error) {
            console.error('Erro ao tentar atualizar o usuário:', error);
            alert('Falha ao tentar atualizar o usuário!');
        }
    }

    // Função para formatar a data para exibição no formulário
    const formatDateForDisplay = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return new Date(dateString).toLocaleString('pt-BR', options);
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
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastname">
                            <Form.Label>Sobrenome</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formAge">
                            <Form.Label>Idade</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={formData.status}
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
                                value={formatDateForDisplay(formData.datahoracadastro)}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
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
