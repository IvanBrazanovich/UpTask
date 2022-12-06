import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mx-auto w-3/5 lg:w-2/5 text-slate-600  ">
      <h2 className="text-3xl font-black text-sky-600 capitalize">
        Inicia Sesión y administra tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h2>

      {/* Formulario */}
      <form className="bg-white mt-5 rounded-md py-10 px-5 shadow-md">
        <div className="mb-5">
          <label className="block font-bold uppercase" htmlFor="email">
            {" "}
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email de Registro"
            className="px-2 bg-slate-50 block w-full  py-1 mt-2"
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold uppercase" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password de Registro"
            className="px-2 bg-slate-50 block w-full  py-1 mt-2"
          />
        </div>

        <button className="text-white bg-sky-800 w-full py-2 uppercase font-bold">
          Iniciar Sesión
        </button>
      </form>

      <div className="flex justify-between mt-10 text-xs uppercase font-semibold text-slate-600   ">
        <Link to="registrar">¿No tienes una cuenta? Regístrate</Link>
        <Link to="olvide-password">Olvidé mi Password</Link>
      </div>
    </div>
  );
};

export default Login;
