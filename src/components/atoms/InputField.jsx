import React from 'react';

function InputField({ label, name, value, onChange, type = "text", options = [] }) {
  return (
    <div className="mb-4">
      <label className="block mb-2">{label}</label>
      {type === "select" ? (
        <select name={name} value={value} onChange={onChange} className="w-full p-2 border rounded">
          <option value="">Seleccionar...</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      )}
    </div>
  );
}

export default InputField;
