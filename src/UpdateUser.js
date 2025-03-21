import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateUser = ({ user, fetchUsers }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [title, setTitle] = useState(user.title);
  const [gender, setGender] = useState(user.gender);
  const [image, setImage] = useState(user.picture);
  const [phone, setPhone] = useState(user.phone);
  const apiKey = '63473330c1927d386ca6a3a5'; 
  const apiUrl = "https://dummyapi.io/data/v1/user";

  const handleUpdate = async () => {
    try {
      await axios.put(
        apiUrl,
        {
          firstName,
          lastName,
          email,
          title,
          gender,
          picture: image,  // Link de la imagen
          phone,
        },
        {
          headers: {
            'app-id': apiKey,
          },
        }
      );
      fetchUsers(); // Recargar la lista de usuarios después de crear uno nuevo
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
      
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        type="text"
        placeholder="Primer nombre"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        type="text"
        placeholder="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Selecciona Género</option>
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
        <option value="other">Otro</option>
      </select>

      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        type="text"
        placeholder="Link de Imagen"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        type="tel"
        placeholder="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Editar Usuario
      </button>
    </div>
  );
};

export default UpdateUser;
