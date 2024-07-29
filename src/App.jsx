import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

function App() {
  const location = useLocation();

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
            <Route path="/horario" element={<PrivateRoute element={<Horario />} requiredRole={1} />} />
            <Route path="/admin/Urbans" element={<PrivateRoute element={<Urbans />} requiredRole={1} />} />
            <Route path="/reporte" element={<PrivateRoute element={<Reporte />} requiredRole={1} />} />
            <Route path="/tarifa" element={<PrivateRoute element={<Tarifa />} requiredRole={1} />} />
            <Route path="/ganancias" element={<PrivateRoute element={<Ganancias />} requiredRole={4} />} />
            <Route path="/reporte-problemas" element={<PrivateRoute element={<ReporteProblemas />} requiredRole={4} />} />
            <Route path="/unidades" element={<PrivateRoute element={<ListaDeUnidadesPage />} requiredRole={1} />} />
            <Route path="/cumplimiento-horario" element={<PrivateRoute element={<CumplimientoDeHorario />} requiredRole={3} />} />
            <Route path="/admin/choferes" element={<PrivateRoute element={<ChoferesPage />} requiredRole={1} />} />
            <Route path="/admin/listas" element={<PrivateRoute element={<ListaDeChoferesPage />} requiredRole={1} />} />
            <Route path='/ver_listas'  element={<PrivateRoute element={<VerListas />} requiredRole={1} />} />
            <Route path='/reporte-descriptivo' element={<PrivateRoute element={<ReporteDescriptivo />} requiredRole={4} />} />
          </Routes>
          {location.pathname === '/' && <Footer />}
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
