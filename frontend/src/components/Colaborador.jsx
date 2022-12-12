import React, { useContext } from "react";
import ProyectosContext from "../context/ProyectosProvider";

const Colaborador = () => {
  const {
    colaborador: { nombre, _id },
    agregarColaborador,
  } = useContext(ProyectosContext);

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-sm uppercase font-bold text-slate-700">{nombre}</h2>

      <button
        onClick={(e) => agregarColaborador(_id)}
        className="uppercase  text-sm font-bold bg-gray-500 text-white p-2 rounded-md"
      >
        Agregar al Proyecto
      </button>
    </div>
  );
};

export default Colaborador;
