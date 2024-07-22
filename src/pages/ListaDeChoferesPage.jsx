import React from 'react';
import ListaDeChoferes from '../components/organisms/ListaDeChoferes';

function ListaDeChoferesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="container mx-auto p-4">
        <ListaDeChoferes />
      </div>
    </div>
  );
}

export default ListaDeChoferesPage;