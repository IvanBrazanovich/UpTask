import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where("creador").equals(req.usuario);
  res.json(proyectos);
};

const nuevoProyecto = async (req, res) => {
  //Instanciar nuevo proyecto
  const proyecto = new Proyecto(req.body);

  //Añadir el usuario
  proyecto.creador = req.usuario._id;

  try {
    const proyectoAlmacenado = await proyecto.save();

    res.json(proyectoAlmacenado);
  } catch (err) {
    console.log(err);
  }
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error("Hubo un problema ");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos ");
    return res.status(403).json({ msg: error.message });
  }

  const tareas = await Tarea.find().where("proyecto").equals(proyecto.id);
  console.log(tareas);

  res.json({ proyecto, tareas });
};

const editarProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error("Hubo un problema ");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos ");
    return res.status(403).json({ msg: error.message });
  }

  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
  proyecto.colaboradores = req.body.colaboradores || proyecto.colaboradores;
  proyecto.cliente = req.body.cliente || proyecto.cliente;

  try {
    const proyectoEditado = await proyecto.save();

    res.json({ proyectoEditado });
  } catch (err) {
    console.log(err);
  }
};

const eliminarProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error("Hubo un problema ");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos ");
    return res.status(403).json({ msg: error.message });
  }

  try {
    await proyecto.deleteOne();

    res.json({ msg: "Proyecto Eliminado" });
  } catch (err) {
    console.log(err);
  }
};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
};