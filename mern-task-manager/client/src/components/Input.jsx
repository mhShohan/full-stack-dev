import React from 'react';

const Input = ({ item, value, handleChange }) => {
  return (
    <input
      type={item.type}
      placeholder={item.placeholder}
      name={item.name}
      value={value}
      onChange={handleChange}
      className="
      outline-none text-2xl
      text-zinc-900
      py-1 px-2 
      border-solid 
      border-b-2 
    border-zinc-600
    bg-slate-200 
      rounded-sm 
      mb-4"
    />
  );
};

export default Input;
