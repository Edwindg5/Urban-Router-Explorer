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
import Urbans from './pages/Urbans';
import Reporte from './pages/Reporte';
import ReporteForm from './components/molecules/ReporteForm';
import Tarifa from './pages/Tarifa';
import Ganancias from './pages/Ganancias';
import ReporteProblemas from './pages/ReporteProblemas';
import { AuthProvider, useAuth } from './components/atoms/AuthContext';
import { NotificationProvider } from './components/atoms/NotificationContext';
import ListaDeUnidadesPage from './pages/ListaDeUnidadesPage';
import CumplimientoDeHorario from './pages/CumplimientoDeHorarioPage';
import ChoferesPage from './pages/ChoferesPage';
import ListaDeChoferesPage from './pages/ListaDeChoferesPage';
import VerListas from './pages/VerListas';
import ReporteDescriptivo from './pages/ReporteDescriptivo';

const PrivateRoute = ({ element, requiredRole }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />; // Puedes crear una página de "No autorizado"
  }

  return element;
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/conductor" element={<Conductor />} />
            <Route path="/informacion" element={<Home />} />
            <Route path="/estacion" element={<Estacion />} />
            <Route path="/contacto" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/options" element={<PrivateRoute element={<ConductorOptions />} requiredRole={4} />} />
            <Route path='/optionschecador' element={<PrivateRoute element={<ChecadorOptions />} requiredRole={3} />} />
            <Route path='/optionsadmin' element={<PrivateRoute element={<Administrador />} requiredRole={1} />} />
            <Route path='/Horario' element={<Horario />} />
            <Route path='/Urbans' element={<Urbans />} />
            <Route path='/Reporte' element={<Reporte />} />
            <Route path='/ReporteForm' element={<ReporteForm />} />
            <Route path='/Tarifa' element={<Tarifa />} />
            <Route path='/Ganancias' element={<Ganancias />} />
            <Route path='/ReporteProblemas' element={<ReporteProblemas />} />
            <Route path='/ListaDeUnidadesPage' element={<ListaDeUnidadesPage />} />
            <Route path='/CumplimientoDeHorarioPage' element={<CumplimientoDeHorario />} />
            <Route path='/ChoferesPage' element={<ChoferesPage />} />
            <Route path='/ListaDeChoferesPage' element={<ListaDeChoferesPage />} />
            <Route path='/VerListas' element={<VerListas />} />
            <Route path='/ReporteDescriptivo' element={<ReporteDescriptivo />} />
          </Routes>
          <Footer />
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
