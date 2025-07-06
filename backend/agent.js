import { tool, agent } from "llamaindex";
import { Ollama } from "@llamaindex/ollama";
import { z } from "zod";
import { empezarChat } from "./lib/cli-chat.js";
import { Estudiantes } from "./lib/estudiantes.js";
import { ToolUseTracker } from "./lib/tool-use-tracker.js";

const toolTracker = new ToolUseTracker();


// Configuración
const DEBUG = false;

// Instancia de la clase Estudiantes
const estudiantes = new Estudiantes();
estudiantes.cargarEstudiantesDesdeJson();

// System prompt básico
const systemPrompt = `
Sos un asistente para gestionar estudiantes.
Tu tarea es ayudar a consultar o modificar una base de datos de alumnos.

Usá las herramientas disponibles para:
- Buscar estudiantes por nombre o apellido
- Agregar nuevos estudiantes
- Mostrar la lista completa de estudiantes

Respondé de forma clara y breve. 
Si intentás ejecutar una acción y falta información, pedile al usuario que te la proporcione antes de continuar.
Respondé solo a la última pregunta del usuario, usando el contexto anterior solo si es necesario.
Realiza únicamente la acción solicitada por el usuario. Si el usuario solo pide buscar, no sugieras agregar estudiantes.
`.trim();

const ollamaLLM = new Ollama({
    model: "qwen3:1.7b",
    temperature: 0.75,
    timeout: 2 * 60 * 1000, // Timeout de 2 minutos
});


const buscarPorNombreTool = tool({
    name: "buscarPorNombre",
    description: "Usa esta función para encontrar estudiantes por su nombre cuando el usuario pide buscar un estudiante brindando nombre",
    parameters: z.object({
        nombre: z.string().describe("El nombre del estudiante a buscar"),
    }),
    execute: ({ nombre }) => {
        if(!nombre) {
            return "Por favor, proporciona el nombre del estudiante que deseas buscar.";    
        }
        if (toolTracker.fueUsado("agregarEstudiante")) {
            return "⚠️ Ya se agregó un estudiante en esta consulta. No deberías repetir esta acción.";
        }
        toolTracker.registrar("agregarEstudiante");
        return estudiantes.buscarEstudiantePorNombre(nombre).join("/n");
    },
});

const buscarPorApellidoTool = tool({
    name: "buscarPorApellido",
    description: "Usa esta función para encontrar estudiantes por su apellido cuando el usuario pide buscar un estudiante brindando apellido",
    parameters: z.object({
        apellido: z.string().describe("El apellido del estudiante a buscar"),
    }),
    execute: ({ apellido }) => {
        if(!apellido) {
            return "Por favor, proporciona el apellido del estudiante que deseas buscar.";
        }
        if (toolTracker.fueUsado("agregarEstudiante")) {
            return "⚠️ Ya se agregó un estudiante en esta consulta. No deberías repetir esta acción.";
        }
        toolTracker.registrar("agregarEstudiante");
        return estudiantes.buscarEstudiantePorApellido(apellido).join("/n");
    },
});

const agregarEstudianteTool = tool({
    name: "agregarEstudiante",
    description: "Usa esta función para agregar un nuevo estudiante cuando el usuario lo solicite",
    parameters: z.object({
        nombre: z.string().describe("El nombre del estudiante"),
        apellido: z.string().describe("El apellido del estudiante"),
        curso: z.string().describe("El curso del estudiante (ej: 4A, 4B, 5A)"),
    }),
    execute: ({ nombre, apellido, curso }) => {
        if (!nombre || !apellido || !curso) {
            return "Por favor, proporciona tanto el nombre como el apellido y el curso del estudiante.";
        }
        if (toolTracker.fueUsado("agregarEstudiante")) {
            return "⚠️ Ya se agregó un estudiante en esta consulta. No deberías repetir esta acción.";
        }
        toolTracker.registrar("agregarEstudiante");
        return estudiantes.agregarEstudiante(nombre, apellido, curso);
        
    },
});

const listarEstudiantesTool = tool({
    name: "listarEstudiantes",
    description: "Usa esta función para mostrar todos los estudiantes",
    parameters: z.object({}),
    execute: () => {
        if (toolTracker.fueUsado("agregarEstudiante")) {
            return "⚠️ Ya se agregó un estudiante en esta consulta. No deberías repetir esta acción.";
        }
        toolTracker.registrar("agregarEstudiante");
        return estudiantes.listarEstudiantes().join(" - ");
    },
});

// Configuración del agente
export const elAgente = agent({
    tools: [buscarPorNombreTool, buscarPorApellidoTool, agregarEstudianteTool, listarEstudiantesTool],
    llm: ollamaLLM,
    verbose: DEBUG,
    systemPrompt: systemPrompt,
});

// Mensaje de bienvenida
const mensajeBienvenida = `
¡Hola! Soy tu asistente para gestionar estudiantes.
Puedo ayudarte a:
- Buscar estudiantes por nombre o apellido
- Agregar nuevos estudiantes
- Mostrar la lista completa de estudiantes

¿Qué necesitás?
`;

// Iniciar el chat
//empezarChat(elAgente, mensajeBienvenida);

export { toolTracker };