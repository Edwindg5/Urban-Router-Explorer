import React from 'react';

function TableRow({ children, className }) {
  return <tr className={className}>{children}</tr>;
}

export default TableRow;