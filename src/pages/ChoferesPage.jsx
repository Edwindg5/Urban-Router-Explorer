import React from 'react';
import Choferes from '../components/organisms/Choferes';

function ChoferesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="container mx-auto p-4">
        <Choferes />
      </div>
    </div>
  );
}

export default ChoferesPage;