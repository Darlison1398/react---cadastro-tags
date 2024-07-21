import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Perfil() {
    const [id, setId ] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        age: '',
        email: '',
        password: '',
        code_security: ''
    });

    const navigate = useNavigate();

    useEffect( () => {
        async function fetchMe() {
            try {

                const response = await fetch(`http://localhost:8082/auth/admin`, {
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
                        code_security: data.code_security
                    });

                } else {
                    console.error('Erro ao carregar dados do usuário:', response.statusText);
                }
                
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            }
        }

        fetchMe();
    }, [id]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }



    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 style={{ color: 'yellow' }}>Perfil de Usuário</h3>
                <Link to="/admin/users" className="btn btn-primary">Voltar</Link>
            </div>

            <div className="container d-flex justify-content-center align-items-center mt-3">
                <div className="container" style={{ maxWidth: '500px' }}>
                    <Form>
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
                        <Form.Group controlId="formCode">
                            <Form.Label>Código de Segurança</Form.Label>
                            <Form.Control
                                type="text"
                                name="code_security"
                                value={formData.code_security}
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

};

export default Perfil;