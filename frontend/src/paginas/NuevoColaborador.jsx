import React from "react";
import { useContext } from "react";
import Alert from "../components/Alert";
import Colaborador from "../components/Colaborador";
import FormularioColaborador from "../components/FormularioColaborador";
import ProyectosContext from "../context/ProyectosProvider";

const NuevoColaborador = () => {
  const { proyecto, colaborador } = useContext(ProyectosContext);

  return (
    <div className="p-3 md:w-2/3 lg:w-3/5 mx-auto">
      <h2 className="text-2xl  font-black">
        Añadir Colaborador(a) al proyecto: {proyecto.nombre}
      </h2>

      <FormularioColaborador />

      {colaborador?.email && (
        <div className="bg-white rounded-md px-5 py-10">
          <h2 className="text-xl font-black text-center mb-5">Resultado:</h2>

          {colaborador?.email && <Colaborador />}
        </div>
      )}
    </div>
  );
};

export default NuevoColaborador;
