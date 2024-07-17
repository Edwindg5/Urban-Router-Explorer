import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Conductor from './pages/Conductor';
import Header from './components/molecules/Header';
import Footer from './components/atoms/Footer';
import Login from './pages/Login';
import Estacion from './pages/Estacion';
import ConductorOptions from './pages/ConductorOptions';
import ChecadorOptions from './pages/ChecadorOptions';
import Administrador from './pages/Administrador';
import Horario from './pages/Horario';
import Taller from './pages/Taller';
import Reporte from './pages/Reporte';
import Tarifa from './pages/Tarifa';
import Ganancias from './pages/Ganancias';
import { AuthProvider, useAuth } from './components/atoms/AuthContext';
import ReporteProblemas from './pages/ReporteProblemas';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conductor" element={<Conductor />} />
          <Route path="/informacion" element={<Home />} />
          <Route path="/estacion" element={<Estacion />} />
          <Route path="/contacto" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/options" element={<PrivateRoute element={<ConductorOptions />} />} />
          <Route path='/optionschecador' element={<PrivateRoute element={<ChecadorOptions />} />} />
          <Route path='/optionsadmin' element={<PrivateRoute element={<Administrador />} />} />
          <Route path="/horario" element={<PrivateRoute element={<Horario />} />} />
          <Route path="/taller" element={<PrivateRoute element={<Taller />} />} />
          <Route path="/reporte" element={<PrivateRoute element={<Reporte />} />} />
          <Route path="/tarifa" element={<PrivateRoute element={<Tarifa />} />} />
          <Route path="/ganancias" element={<PrivateRoute element={<Ganancias />} />} />
          <Route path="/reporte-problemas" element={<PrivateRoute element={<ReporteProblemas />} />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
