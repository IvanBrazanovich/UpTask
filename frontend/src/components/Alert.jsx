import React from "react";

const Alert = ({ alerta }) => {
  const { error, msg } = alerta;

  return (
    <div
      className={`${
        error ? "  from-red-600 to-red-700" : "from-sky-600 to-sky-700"
      } my-5 text-center py-1 bg-gradient-to-r uppercase font-semibold text-white `}
    >
      {msg}
    </div>
  );
};

export default Alert;
