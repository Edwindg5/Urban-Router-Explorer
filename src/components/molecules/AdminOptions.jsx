import React from 'react';
import ButtonLinkAdmin from '../atoms/ButtonLinkAdmin';
import choferesImg from '../../assets/choferes.jpeg';
import urbansImg from '../../assets/urbans.jpeg';
import listasImg from '../../assets/listas.jpeg';
import verListasImg from '../../assets/ver_listas.jpeg';

function AdminOptions() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <ButtonLinkAdmin to="/admin/choferes" image={choferesImg}>Choferes</ButtonLinkAdmin>
      <ButtonLinkAdmin to="/admin/urbans" image={urbansImg}>Urbans</ButtonLinkAdmin>
      <ButtonLinkAdmin to="/admin/listas" image={listasImg}>Listas</ButtonLinkAdmin>
      <ButtonLinkAdmin to="/ver_listas" image={verListasImg}>Reportes</ButtonLinkAdmin>
    </div>
  );
}

export default AdminOptions;