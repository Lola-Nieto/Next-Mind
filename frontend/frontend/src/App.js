import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:3000'; // Cambia el puerto si es necesario

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    curso: '',
  });

  // Obtener la lista de estudiantes al cargar el componente
  useEffect(() => {
    fetchStudents();
  }, []);

  // Función para obtener estudiantes desde el backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/estudiantes`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error al obtener estudiantes:', error);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/estudiantes`, formData);
      fetchStudents(); // Actualizar la lista de estudiantes
      setFormData({ nombre: '', apellido: '', curso: '' }); // Limpiar el formulario
    } catch (error) {
      console.error('Error al agregar estudiante:', error);
    }
  };

  return (
    <div className="App">
      <h1>Gestión de Estudiantes</h1>

      <form onSubmit={handleSubmit}>
        <h3>Agregar Estudiante</h3>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="curso"
          placeholder="Curso"
          value={formData.curso}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Agregar</button>
      </form>

      <h3>Lista de Estudiantes</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Curso</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.nombre}</td>
              <td>{student.apellido}</td>
              <td>{student.curso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;