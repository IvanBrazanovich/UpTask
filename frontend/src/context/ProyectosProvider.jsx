import { useEffect, useState, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  //State
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);

  //React Router
  const navigate = useNavigate();
  const params = useParams();

  //Functions
  const getProyectos = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const resOne = await fetch("http://localhost:4000/api/proyectos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }
      setProyectos(resTwo);
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  //Get Proyectos
  useEffect(() => {
    getProyectos();
  }, []);

  const mostrarAlerta = (datos) => {
    setAlerta(datos);

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const agregarProyecto = async (proyecto) => {
    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }
  };

  // Editar proyecto

  const editarProyecto = async (proyecto) => {
    const token = localStorage.getItem("token");

    if (!token) {
      mostrarAlerta({
        msg: "No tienes los permisos necesarios",
        error: true,
      });

      return;
    }

    try {
      const resOne = await fetch(
        `http://localhost:4000/api/proyectos/${proyecto.id}`,
        {
          method: "PUT",
          body: JSON.stringify(proyecto),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      setAlerta({
        msg: "Proyecto creado correctamente",
        error: false,
      });

      const proyectosActualizados = proyectos.map((item) =>
        item._id === resTwo._id ? resTwo : item
      );
      console.log(proyectosActualizados);

      setProyectos(proyectosActualizados);

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  // Nuevo Proyecto
  const nuevoProyecto = async (proyecto) => {
    const token = localStorage.getItem("token");

    if (!token) {
      mostrarAlerta({
        msg: "No tienes los permisos necesarios",
        error: true,
      });

      return;
    }

    try {
      const resOne = await fetch("http://localhost:4000/api/proyectos", {
        method: "POST",
        body: JSON.stringify(proyecto),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      setAlerta({
        msg: "Proyecto creado correctamente",
        error: false,
      });

      setProyectos([...proyectos, resTwo]);

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  //Delete proyecto
  const deleteProyecto = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const resOne = await fetch(`http://localhost:4000/api/proyectos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      const proyectosActualizados = proyectos.filter((item) => item._id !== id);

      setProyectos(proyectosActualizados);

      setAlerta({
        msg: resTwo.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  const getProyecto = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setCargando(true);
    try {
      //Ger proyecto
      const resOne = await fetch(`http://localhost:4000/api/proyectos/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      setProyecto(resTwo.proyecto);
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }

    setCargando(false);
  };

  return (
    <ProyectosContext.Provider
      value={{
        cargando,
        alerta,
        agregarProyecto,
        mostrarAlerta,
        proyectos,
        setProyectos,
        getProyectos,
        getProyecto,
        deleteProyecto,
        proyecto,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export default ProyectosContext;

export { ProyectosProvider };
