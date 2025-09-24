import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 bg-black text-white hover:opacity-90 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


