import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../atoms/AuthContext';
import LinkButtonChecador from '../atoms/LinkButtonChecador';
import ButtonChecador from '../atoms/ButtonChecador';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { success, user } = await login(email, fullName, password);
    if (success) {
      switch (user.role_id) {
        case 1:
          navigate('/optionsadmin');
          break;
        case 3:
          navigate('/optionschecador');
          break;
        case 4:
          navigate('/options');
          break;
        default:
          alert('Rol desconocido');
          navigate('/');
      }
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <form className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Nombre Completo
        </label>
        <input
          type="text"
          id="fullName"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between">
        <ButtonChecador
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Iniciar Sesión
        </ButtonChecador>
        <LinkButtonChecador to="/" className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300">
          Salir
        </LinkButtonChecador>
      </div>
    </form>
  );
}

export default LoginForm;
