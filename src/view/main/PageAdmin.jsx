import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import React from "react";
import { Link } from "react-router-dom";

function PageAdmin() {

    const wdt = {
        width: '200px'
    }
    return (
        <div className="container mt-2">
            <h1 className="text-center">Aqui é a página do Admin</h1>

            <div className="container mt-5">
                <h3>Aqui você pode administrar melhor a sua lista de usuários logados e sua lista de tags ativas.</h3>
                <h5>Você pode:</h5>
                <ul>
                    <li>Cadastrar novos usuários</li>
                    <li>Editar dados de usuários</li>
                    <li>Desativar usuários</li>
                    <li>Registrar tags para usuários</li>
                    <li>Definir permissões para usuários</li>
                    <li>Editar tags de usuários</li>
                    <li>Tirar relatórios sobre o uso de tags</li>
                    <li>Ter um maior controle de acesso que usuários estão tendo em sua residência</li>
                </ul>

                <div className="container d-flex mt-5" style={{ gap: '2em' }}>
                    <div>
                        <button className="btn btn-primary" style={wdt}>
                            <Link to="/admin/users" className="nav-link">Gerenciar usuários</Link>
                        </button>
                    </div>
                    <div>
                        <button className="btn btn-primary" style={wdt}>
                            <Link to="/admin/tags" className="nav-link">Gerenciar Tags</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageAdmin;