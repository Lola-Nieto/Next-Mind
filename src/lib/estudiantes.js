import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construir la ruta absoluta al archivo alumnos.json
const DATA_FILE = path.join(__dirname, '../../backend/data/alumnos.json');

class Estudiantes {
  constructor() {
    this.estudiantes = [];
  }
  
  cargarEstudiantesDesdeJson() {
    try {
      const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
      this.estudiantes = data.alumnos || [];
    } catch (e) {
      console.error("Error al leer el archivo de datos:", e);
    }
  }

  guardarEstudiantes() {
    try {
      writeFileSync(DATA_FILE, JSON.stringify({ alumnos: this.estudiantes }, null, 2));
    } catch (e) {
      console.error("Error al guardar los estudiantes:", e);
      throw new Error("No se pudo guardar la lista de estudiantes.");
    }
  }
  

  agregarEstudiante(nombre, apellido, curso) {
    try {
      if (this.estudiantes.some(est => est.nombre === nombre && est.apellido === apellido && est.curso === curso)) {
        return "El estudiante ya existe.";
      }
      
      this.estudiantes.push({ nombre, apellido, curso });
      this.guardarEstudiantes();
      return "El alumno se guardó correctamente";
    } catch (e) {
      return "ERROR al agregar estudiante: " + e;
    }
  }

  buscarEstudiantePorNombre(nombre) {
    return this.estudiantes
      .filter(est.nombre.toLowerCase().includes(nombre.toLowerCase())
      )
      .map(element => `${element.nombre} ${element.apellido} ${element.curso}`);
  }

  buscarEstudiantePorApellido(apellido) {
    return this.estudiantes
  .filter(est => est.apellido.toLowerCase().includes(apellido.toLowerCase()))
  .map(est => `${est.nombre} ${est.apellido} ${est.curso}`);

  }

  listarEstudiantes() {
    return this.estudiantes
  .sort((a, b) => a.apellido.localeCompare(b.apellido))
  .map(e => `${e.nombre} ${e.apellido} ${e.curso}`);

  }
}

export { Estudiantes };