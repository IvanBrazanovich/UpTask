import React from "react";
import { useContext } from "react";
import ProyectosContext from "../context/ProyectosProvider";
import transformDate from "../helper/transformDate";

const Tarea = ({ tarea }) => {
  const { nombre, estado, descripcion, fechaEntrega, prioridad } = tarea;

  //CONTEXT
  const { handleSubmitEditarTarea } = useContext(ProyectosContext);

  return (
    <div className="flex bg-white p-3 border-b justify-between">
      <div className="flex gap-1 flex-col">
        <p className=" uppercase font-semibold">{nombre}</p>
        <p className="text-gray-500 uppercase">{descripcion}</p>
        <p className="text-sm font-semibold">{transformDate(fechaEntrega)}</p>
        <p className="text-gray-600">Prioridad: {prioridad}</p>
      </div>

      <div className="flex gap-1 items-center">
        <button
          onClick={() => handleSubmitEditarTarea(tarea)}
          className="uppercase font-semibold text-white bg-indigo-600 py-1 px-4 rounded-md"
        >
          Editar
        </button>

        {estado ? (
          <button className="uppercase font-semibold text-white bg-blue-600 py-1 px-4 rounded-md">
            Completa
          </button>
        ) : (
          <button className="uppercase font-semibold text-white bg-gray-600 py-1 px-4 rounded-md">
            Incompleta
          </button>
        )}

        <button className="uppercase font-semibold text-white bg-red-600 py-1 px-4 rounded-md">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Tarea;