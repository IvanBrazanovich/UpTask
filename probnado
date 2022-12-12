import { useEffect, useState, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { agregarTarea } from "../../../backend/controller/tareasController";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  //State
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});

  //React Router
  const navigate = useNavigate();

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
      console.log(resTwo);
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

  //Close and open modal formuolario tarea
  const handleModalFormularioTarea = (e) => {
    setModalFormularioTarea(!modalFormularioTarea);
  };

  //TAREAS
  const submitTarea = async (datos) => {
    if (datos.id) {
      editarTarea(datos);
    } else {
      agregarTarea(datos);
    }
  };

  const editarTarea = async (datos) => {
    //Check if there is a token
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const resOne = await fetch(
        `http://localhost:4000/api/tareas/${datos.id}`,
        {
          method: "PUT",
          body: JSON.stringify(datos),
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

      mostrarAlerta({
        msg: "La tarea se editó ",
        error: false,
      });
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  const agregarTarea = async (datos) => {
    //Check if there is a token
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const resOne = await fetch("http://localhost:4000/api/tareas/", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      mostrarAlerta({
        msg: "La tarea se agregó ",
        error: false,
      });

      console.log(resTwo);
      const proyectosActualizado = {
        ...proyecto,
        tareas: [...proyecto.tareas, resTwo],
      };
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  const handleSubmitEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  return (
    <ProyectosContext.Provider
      value={{
        tarea,
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
        handleModalFormularioTarea,
        handleSubmitEditarTarea,
        modalFormularioTarea,
        submitTarea,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export default ProyectosContext;

export { ProyectosProvider };
