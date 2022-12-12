import React from "react";
import { useContext } from "react";
import FormularioColaborador from "../components/FormularioColaborador";
import ProyectosContext from "../context/ProyectosProvider";

const NuevoColaborador = () => {
  const { proyecto } = useContext(ProyectosContext);

  return (
    <div className="p-3">
      <h2 className="text-2xl  font-black">
        Añadir Colaborador(a) al proyecto: {proyecto.nombre}
      </h2>

      <FormularioColaborador />
    </div>
  );
};

export default NuevoColaborador;
