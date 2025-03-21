// src/components/UserCreate/UserCreate.jsx
import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { createUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const UserCreate = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    picture: '',
    gender: '',
    registerDate: '',
    phone: '',
  };

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
      await createUser(values);
      alert('Usuario creado con éxito');
      navigate('/');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('Hubo un error al crear el usuario. Intenta de nuevo.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Crear Usuario</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form>
            <div className="mb-3">
              <Field
                name="firstName"
                placeholder="Nombre"
                className={`form-control ${touched.firstName && errors.firstName ? 'is-invalid' : ''}`}
              />
              {touched.firstName && errors.firstName && (
                <div className="text-danger">{errors.firstName}</div>
              )}
            </div>
            <div className="mb-3">
              <Field
                name="lastName"
                placeholder="Apellido"
                className={`form-control ${touched.lastName && errors.lastName ? 'is-invalid' : ''}`}
              />
              {touched.lastName && errors.lastName && (
                <div className="text-danger">{errors.lastName}</div>
              )}
            </div>
            <div className="mb-3">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
              />
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
              <Field
                name="picture"
                placeholder="URL de la imagen"
                className={`form-control ${touched.picture && errors.picture ? 'is-invalid' : ''}`}
              />
              {touched.picture && errors.picture && (
                <div className="text-danger">{errors.picture}</div>
              )}
            </div>
            <div className="mb-3">
              <Field
                as="select"
                name="gender"
                className={`form-control ${touched.gender && errors.gender ? 'is-invalid' : ''}`}
              >
                <option value="">Seleccionar género</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </Field>
              {touched.gender && errors.gender && (
                <div className="text-danger">{errors.gender}</div>
              )}
            </div>
            <div className="mb-3">
              <Field
                type="date"
                name="registerDate"
                className={`form-control ${touched.registerDate && errors.registerDate ? 'is-invalid' : ''}`}
              />
              {touched.registerDate && errors.registerDateate && (
                <div className="text-danger">{errors.registerDate}</div>
              )}
            </div>
            <div className="mb-3">
              <Field
                name="phone"
                placeholder="Teléfono"
                className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
              />
              {touched.phone && errors.phone && (
                <div className="text-danger">{errors.phone}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary mt-3">Crear Usuario</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserCreate;
