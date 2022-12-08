import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import FormularioProyecto from "../components/FormularioProyecto";
import ProyectosContext from "../context/ProyectosProvider";

const EditarProyecto = () => {
  //Context
  const { getProyecto, cargando, proyecto } = useContext(ProyectosContext);

  //React router
  const params = useParams();

  useEffect(() => {
    getProyecto(params.id);
  }, []);

  //Destructuring
  const { nombre, _id, cliente } = proyecto;

  if (cargando) return "Cargando...";

  return (
    <div className="p-3 ">
      <h2 className="text-3xl font-black">Editar: {nombre}</h2>

      <FormularioProyecto />
    </div>
  );
};

export default EditarProyecto;
