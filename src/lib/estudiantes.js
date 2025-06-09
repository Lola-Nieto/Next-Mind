// Gestión de estudiantes
import { readFileSync, writeFileSync } from 'fs';

const DATA_FILE = './data/alumnos.json';

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
      this.cargarEstudiantesDesdeJson();
    } catch (e) {
      console.error("Error al guardar los estudiantes:", e);
      throw new Error("No se pudo guardar la lista de estudiantes.");
    }
  }

  // TODO: Implementar método para agregar estudiante
  agregarEstudiante(nombre, apellido, curso) {
    
    try{
      this.estudiantes.push({"nombre": nombre, "apellido": apellido, "curso": curso});
    this.guardarEstudiantes();
  return "El alumno se guardo correctamente"}
    catch (e){
      return "ERROR al agregar estudiante: " + e;
    }
  }

  // TODO: Implementar método para buscar estudiante por nombre
  buscarEstudiantePorNombre(nombre) {
    return this.estudiantes.filter(est => est.nombre === nombre).map((element) =>
    `${element.nombre} ${element.apellido} ${element.curso}`
  );

  }

  // TODO: Implementar método para buscar estudiante por apellido
  buscarEstudiantePorApellido(apellido) {
    return this.estudiantes.filter(est => est.apellido === apellido);
  }

  // TODO: Implementar método para listar estudiantes
  listarEstudiantes() {
    let datosEst = this.estudiantes.map((element) =>
      `${element.nombre} ${element.apellido} ${element.curso}`
    )
    return datosEst;
  }
}

export { Estudiantes }
