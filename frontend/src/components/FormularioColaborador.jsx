import React from "react";
import { useContext } from "react";
import { useState } from "react";
import ProyectosContext from "../context/ProyectosProvider";
import Alert from "./Alert";
import FormularioProyecto from "./FormularioProyecto";

const FormularioColaborador = () => {
  //State
  const [email, setEmail] = useState("");

  //Context
  const { alerta, mostrarAlerta, buscarColaborador } =
    useContext(ProyectosContext);

  //Funciones
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      mostrarAlerta({
        msg: "Debes rellenar el campo con un mail válido",
        error: true,
      });

      return;
    }

    buscarColaborador(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white mt-10 rounded-md py-10 px-5 md:w-2/3 lg:w-3/5 mx-auto "
    >
      {alerta.msg && <Alert alerta={alerta} />}

      <div>
        <label htmlFor="email" className="block my-2 uppercase font-bold">
          Email Colaborador
        </label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          className="border rounded-md p-2  block w-full"
          placeholder="Email del Usuario"
        />
      </div>

      <button
        className="p-2 block w-full bg-sky-600 text-white font-bold  my-5 rounded-md uppercase"
        type="submit"
      >
        Buscar Colaborador
      </button>
    </form>
  );
};

export default FormularioColaborador;
