import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";

function NewUser() {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (e) => setName(e.target.value);
    const handleLastnameChange = (e) => setLastname(e.target.value);
    const handleAgeChange = (e) => setAge(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:8082/userView/create';

        try {
            const token = localStorage.getItem('authToken');
            //console.log("Token:", token); // Debugging token

            const response = await axios.post(url, {
                name: name,
                lastname: lastname,
                age: age,
                email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200 || response.status === 201) {
                alert('Usuário criado com sucesso!');
                setName('');
                setLastname('');
                setAge('');
                setEmail('');
                setPassword('');
                navigate('/admin/users'); 
                
            } else {
                console.error('Erro inesperado:', response.status);
            }
            
        } catch (error) {
            console.error('Erro ao tentar criar o usuário:', error);
            alert('Falha ao tentar criar o usuário!');
        }
    }

    return (
        <div className="container mt-3">
             <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Crie um novo usuário</h3>
                <Link to="/admin/users" className="btn btn-primary">Voltar</Link>
            </div>
            <div className="container d-flex justify-content-center align-items-center mt-3">
                <div className="container" style={{ maxWidth: '500px' }}>
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Nome"
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={handleNameChange}
                        />
                        <TextInput
                            label="Sobrenome"
                            type="text"
                            placeholder="Sobrenome"
                            value={lastname}
                            onChange={handleLastnameChange}
                        />
                        <TextInput
                            label="Idade"
                            type="number"
                            placeholder="Idade"
                            value={age}
                            onChange={handleAgeChange}
                        />
                        <TextInput
                            label="Email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextInput
                            label="Senha"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewUser;
