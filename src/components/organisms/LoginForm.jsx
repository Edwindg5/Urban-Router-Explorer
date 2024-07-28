import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../atoms/AuthContext';
import LinkButtonChecador from '../atoms/LinkButtonChecador';
import ButtonChecador from '../atoms/ButtonChecador';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();






  const LoginForm = () => {
    const [inventory, setInventory] = useState([]);
    const [currentAction, setCurrentAction] = useState('add');
  
    const LoginInventori = async () => {
      try {
        const response = await axios.get('ivy.urbanrouteexplorer.xyz');
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };
  
  };





  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === 'conductor@gmail.com' && password === '123') {
      login();
      navigate('/options');  
    } else if (email === 'checador@gmail.com' && password === '456') {
      login();
      navigate('/optionschecador'); 
    }else if (email ==='admin@gmail.com' && password === '789'){
      login();
      navigate('/optionsadmin')
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