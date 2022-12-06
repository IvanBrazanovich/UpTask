import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <div className="mx-auto w-3/5 lg:w-2/5 text-slate-600  ">
      <h2 className="text-3xl font-black text-sky-600 capitalize">
        Reestablece tu password y no pierdas acceso a tus proyectos
        <span className="text-slate-700">Proyectos</span>
      </h2>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-5 rounded-md py-10 px-5 shadow-md"
      >
        {alert.msg && <Alert alerta={alert} />}

        <div className="mb-5">
          <label className="block font-bold uppercase" htmlFor="email">
            {" "}
            Email
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            id="email"
            name="email"
            placeholder="Tu email"
            className="px-2 bg-slate-50 block w-full  py-1 mt-2"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-sky-800 w-full py-2 uppercase font-bold"
        >
          Guardar Nuevo Password
        </button>
      </form>

      <div className="flex justify-between mt-10 text-xs uppercase font-semibold text-slate-600   ">
        <Link to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link to="/registrar">¿No tienes una cuenta? Regístrate</Link>
      </div>
    </div>
  );
};

export default NuevoPassword;
