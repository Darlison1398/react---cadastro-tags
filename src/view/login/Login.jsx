import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../components/TextInput"; // Importa seu componente de input
import { useAuth } from "./AuthContext";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('view'); // 'admin' or 'view'
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = userType === 'admin' ? '/auth/login' : '/userView/loginUserView';
      const response = await axios.post(`http://localhost:8082${endpoint}`, {
        email: email,
        password: password
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        login(); // Chame a função login aqui
        navigate(userType === 'admin' ? '/admin' : '/main');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="container-center-center">
        <div className="container">
          <h3 className="text-center">Login</h3>

          <div className="container d-flex mt-3" style={{ gap: '30px'}}>
              <div>
                <label>
                    <input
                    type="radio"
                    value="admin"
                    checked={userType === 'admin'}
                    onChange={handleUserTypeChange}
                    />
                    Admin
                </label>
              </div>

              <div>
                <label>
                    <input
                    type="radio"
                    value="view"
                    checked={userType === 'view'}
                    onChange={handleUserTypeChange}
                    />
                    View
                </label>
              </div>
           </div>

          <form className="mt-4" onSubmit={handleSubmit}>
            <TextInput
              label="Email address"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
            <TextInput
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
        
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
        </div>

        {/*<div className="container d-flex justify-content-center mt-5">
          <div className="col-sm-6">
            <span>Ainda não tem conta?</span><br />
            <Link to="/">Criar conta</Link>
          </div>
          <div className="col-sm-6">
            <span>Esqueceu a senha?</span><br />
            <Link to="/">Recuperar senha</Link>
          </div>
        </div>*/}
      </div>
    </div>
  );
}

export default Login;
