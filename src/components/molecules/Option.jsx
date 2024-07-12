import React from 'react';
import { Link } from 'react-router-dom';

function Option({ to, label }) {
  return (
    <Link to={to} className="mb-4 p-4 bg-purple-600 text-white rounded">
      {label}
    </Link>
  );
}

export default Option;