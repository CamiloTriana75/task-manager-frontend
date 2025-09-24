import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/dashboard" className="font-bold">Task Manager</Link>
        <div className="flex items-center gap-4">
          {user && <span className="text-sm text-gray-600">{user.name || user.email}</span>}
          {user && (
            <button onClick={logout} className="text-sm bg-black text-white rounded px-3 py-1">Salir</button>
          )}
        </div>
      </div>
    </nav>
  );
}


