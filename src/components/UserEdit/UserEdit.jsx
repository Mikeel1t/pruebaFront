// src/components/UserEdit/UserEdit.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, editUser } from '../../api/api';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';

const UserEdit = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(userId);
        setUser(response.data);
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
      }
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const initialValues = user ? {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    title: user.title,
    picture: user.picture,
    gender: user.gender,
    registerDate: user.registerDate ? format(new Date(user.registerDate), 'yyyy-MM-dd') : '',
    phone: user.phone,
  } : {};

  const validationSchema = Yup.object({
    firstName: Yup.string().required('El nombre es obligatorio'),
    lastName: Yup.string().required('El apellido es obligatorio'),
    email: Yup.string().email('Correo electrónico inválido').required('El email es obligatorio'),
    title: Yup.string().required('El título es obligatorio'),
    picture: Yup.string().url('La URL de la imagen es inválida').required('La imagen es obligatoria'),
    gender: Yup.string().required('El género es obligatorio'),
    registerDate: Yup.date().required('La fecha de nacimiento es obligatoria').max(new Date(), 'La fecha de nacimiento no puede ser futura'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'El teléfono debe tener 10 dígitos').required('El teléfono es obligatorio'),
  });

  const handleSubmit = async (values) => {
    try {
      await editUser(userId, values);
      alert('Usuario editado con éxito');
      navigate('/');
    } catch (error) {
      console.error('Error al editar el usuario:', error);
      alert('Hubo un error al editar el usuario. Intenta de nuevo.');
    }
  };

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Editar Usuario</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form>
            <div className="mb-3">
              <Field name="firstName" placeholder="Nombre" className="form-control" />
              {touched.firstName && errors.firstName && (
                <div className="text-danger">{errors.firstName}</div>
              )}
            </div>
            <div className="mb-3">
              <Field name="lastName" placeholder="Apellido" className="form-control" />
              {touched.lastName && errors.lastName && (
                <div className="text-danger">{errors.lastName}</div>
              )}
            </div>
            <div className="mb-3">
              <Field name="email" type="email" placeholder="Email" className="form-control" />
              {touched.email && errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
            <Field name="title" as="select"
                className={`form-control ${touched.title && errors.title ? 'is-invalid' : ''}`}>
                <option value="">Seleccionar título</option>
                <option value="mr">Sr.</option>
                <option value="mrs">Sra.</option>
                <option value="dr">Dr.</option>
            </Field>
            </div>
            <div className="mb-3">
              <Field name="picture" placeholder="URL de la imagen" className="form-control" />
              {touched.picture && errors.picture && (
                <div className="text-danger">{errors.picture}</div>
              )}
            </div>
            <div className="mb-3">
              <Field as="select" name="gender" className="form-control">
                <option value="">Seleccionar género</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </Field>
              {touched.gender && errors.gender && (
                <div className="text-danger">{errors.gender}</div>
              )}
            </div>
            <div className="mb-3">
              <Field type="date" name="registerDate" className="form-control" />
              {touched.registerDate && errors.registerDate && (
                <div className="text-danger">{errors.registerDate}</div>
              )}
            </div>
            <div className="mb-3">
              <Field name="phone" placeholder="Teléfono" className="form-control" />
              {touched.phone && errors.phone && (
                <div className="text-danger">{errors.phone}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary mt-3">Guardar Cambios</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserEdit;
