import React from 'react';

export const SubmitButton = ({ children }) => {
  return (
    <button
      className="bg-zinc-600 py-2 
      text-slate-100 
      hover:bg-zinc-800
      ease-in duration-300"
      type="submit"
    >
      {children}
    </button>
  );
};
