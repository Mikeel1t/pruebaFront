import React from 'react';
//Lista usuarios
const UserList = ({ users, deleteUser, setSelectedUser }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de Usuarios</h2>
      
      <table className="min-w-full table-auto bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border-b">Id</th>
            <th className="px-4 py-2 text-left border-b">Nombre</th>
            <th className="px-4 py-2 text-left border-b">Foto</th>
            <th className="px-4 py-2 text-left border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-4 py-2 border-b">
                <img
                  src={user.picture}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-2 border-b">
                <div className="space-x-2">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
