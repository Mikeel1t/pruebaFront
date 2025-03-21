import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState(''); // Estado para el filtro de búsqueda por ID

  // Número de usuarios por página
  const usersPerPage = 10;
  
  // Hook de redirección
  const navigate = useNavigate();

  // Función para obtener usuarios
  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await getUsers(page, usersPerPage);
      setUsers(response.data.data);
      setTotalPages(Math.ceil(response.data.total / usersPerPage)); // Establecer el total de páginas
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para obtener los usuarios cuando la página cambie
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // Función para manejar la eliminación de usuarios
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      alert('Usuario eliminado con éxito');
      fetchUsers(currentPage); // Refrescar la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  // Función para cambiar de página
  const changePage = (page) => {
    if (page < 1 || page > totalPages) return; // Evitar páginas fuera de rango
    setCurrentPage(page);
  };

  // Filtrar usuarios por ID
  const filteredUsers = users.filter(user => {
    if (!searchId) return true; // Si no hay búsqueda, muestra todos los usuarios
    return user.id.toLowerCase().includes(searchId.toLowerCase()); // Filtrar por ID
  });

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Usuarios</h1>

      {/* Filtro de búsqueda por ID */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)} // Actualizar el estado con el valor de búsqueda
        />
      </div>

      {/* Botón para redirigir a la página de creación */}
      <div className="mb-3">
        <button 
          className="btn btn-success"
          onClick={() => navigate('/create')} // Redirigir a la ruta de creación
        >
          Crear Usuario
        </button>
      </div>

      {/* Tabla de usuarios */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center py-4">Cargando...</td>
            </tr>
          ) : (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>
                  <img height="40px" src={user.picture} alt={user.firstName} className="w-12 h-12 rounded-circle" />
                </td>
                <td>
                  <Link to={`/edit/${user.id}`} className="btn btn-primary btn-sm mr-2">Editar</Link>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="d-flex justify-content-between align-items-center">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-secondary"
        >
          Anterior
        </button>
        <div>
          Página {currentPage} de {totalPages}
        </div>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-secondary"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UserList;
