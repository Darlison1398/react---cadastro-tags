import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" style={{fontSize: '18pt'}}>Admin</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {/*<a className="nav-link active" aria-current="page" href="#">Home</a>*/}
                                <Link to="/admin/pageAdmin/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                {/*<a className="nav-link" href="users">Usuários</a>*/}
                                <Link to="/admin/users" className="nav-link">Usuários</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/tags" className="nav-link">Tags</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Tag</a>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Sair</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/perfil" className="nav-link">Perfil</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        Some text lorem ipsum.
                    </div>
                    <div>
                        Some text lorem ipsum.
                    </div>
                    <div>
                        Some text lorem ipsum.
                    </div>
                    <button className="btn btn-secondary" type="button">A Button</button>
                </div>
            </div>
        </div>
    );
}

export default Header;
