import React from 'react';

function Table({ headers, children }) {
  return (
    <table className="min-w-full bg-white border border-gray-200 mb-6">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export default Table;