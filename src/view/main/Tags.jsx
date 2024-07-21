import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import CustonModal from "../components/CustonModal";
import { Button } from "react-bootstrap";

function Tags() {
    const [tags, setTags] = useState([]);
    const [showTag, setShowTag] = useState(false);
    const [tagId, setTagId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTagId, setDeleteTagId] = useState(null);

    useEffect(() => {
        async function fetchTags() {
            try {
                const response = await fetch('http://localhost:8082/tags', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTags(data);
                } else {
                    console.error('Falha ao carregar os dados:', response.statusText);
                }
            } catch (error) {
                console.error('Falha ao carregar os dados:', error);
            }
        }

        fetchTags();
    }, []);

    // Exibindo tag específica no modal
    function handleShowModal(tag) {
        setTagId(tag);
        setShowTag(true);
    }

    function handleCloseModal() {
        setShowTag(false);
        setTagId(null);
    }

    // Modal para confirmar e deletar tag
    function handleDeleteTag(tagToDelete) {
        setShowDeleteModal(true);
        setDeleteTagId(tagToDelete);
    }

    function handleCloseDeleteModal() {
        setShowDeleteModal(false);
        setDeleteTagId(null);
    }

    async function confirmDeleteTag(tagToDelete) {
        try {
            const response = await fetch(`http://localhost:8082/tags/deletarTag/${tagToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                }
            });

            if (response.ok) {
                setTags(tags.filter(tag => tag.id !== tagToDelete));
                handleCloseDeleteModal();
            } else {
                console.error('Falha ao excluir a tag:', response.statusText);
            }

        } catch (error) {
            console.error('Falha ao tentar excluir a tag:', error);
            alert('Falha ao tentar excluir a tag!');
        }
    }

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 style={{ color: 'yellow' }}>Tags cadastradas</h3>
                <Link to="/admin/newTag" className="btn btn-primary">Cadastrar tag</Link>
            </div>

            <div>
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Usuário</th>
                            <th>Status</th>
                            <th>Data/hora cadastro</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.map(tag => (
                            <tr key={tag.id}>
                                <td>{tag.number}</td>
                                <td>{tag.user_view ? tag.user_view.name : 'N/A'}</td>
                                <td>{tag.status ? 'Ativo' : 'Inativo'}</td>
                                <td>{new Date(tag.datahoracadastro).toLocaleString()}</td>
                                <td style={{ display: "flex", gap: "10px" }}>
                                    <Button variant="success" size="sm" onClick={() => handleShowModal(tag)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                    <Link to={`/admin/updateTag/${tag.id}`}>
                                        <Button variant="primary" size="sm">
                                            <FontAwesomeIcon icon={faPencil} />
                                        </Button>
                                    </Link>
                                    <Button variant="danger" size="sm" onClick={() => handleDeleteTag(tag.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CustonModal show={showTag}
                handleClose={handleCloseModal}
                title="Detalhes da Tag"
                body={tagId && (
                    <div>
                        <strong>Número:</strong> {tagId.number}
                        <br />
                        <strong>Usuário:</strong> {tagId.user_view ? tagId.user_view.name : 'N/A'}
                        <br />
                        <strong>Status:</strong> {tagId.status ? 'Ativo' : 'Inativo'}
                        <br />
                        <strong>Data/Hora Cadastro:</strong> {new Date(tagId.datahoracadastro).toLocaleString()}
                    </div>
                )}
                footer={
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                }
            />

            <CustonModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                title="Confirmação de Exclusão"
                body="Você tem certeza que deseja excluir esta tag?"
                footer={
                    <>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={() => confirmDeleteTag(deleteTagId)}>
                            Excluir
                        </Button>
                    </>
                }
            />
        </div>
    );
}

export default Tags;
