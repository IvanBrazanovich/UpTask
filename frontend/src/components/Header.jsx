import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white p-3 flex justify-between items-center shadow-sm">
      <h1 className="text-3xl font-black text-sky-600 tracking-tighter">
        UpTask
      </h1>

      <input
        type="text"
        placeholder="Buscar Proyecto"
        className="border rounded-md lg:w-96  py-1 px-2"
      />

      <div className="flex gap-2 items-center">
        <Link to="/proyectos" className="font-bold  tracking-tight uppercase">
          Proyectos
        </Link>
        <button className="bg-sky-700  text-white  cursor-pointer p-2 rounded-md font-bold">
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
