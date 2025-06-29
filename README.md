# React Chatbot App

This project is a simple React application that serves as a chatbot interface. Users can input their questions, and the chatbot will respond based on the existing backend functions.

## Project Structure

```
react-chatbot-app
├── public
│   └── index.html          # Main HTML file for the application
├── src
│   ├── app.jsx             # Main component for the React application
│   ├── components
│   │   ├── ChatInput.jsx   # Component for user input
│   │   └── MessageList.jsx  # Component for displaying messages
│   ├── lib
│   │   └── chatbot.js       # Functions for interacting with the chatbot backend
│   └── index.js            # Entry point of the React application
├── package.json             # Configuration file for npm
└── README.md                # Documentation for the project
```

## Features

- **User Input**: Users can type their questions into an input field.
- **Message Display**: The application displays a list of previous messages, including both user queries and chatbot responses.
- **Chatbot Interaction**: Utilizes existing backend functions to handle user queries and provide responses.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd react-chatbot-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the application:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.

## License

This project is licensed under the MIT License.


DUDA TP 3

endpoint api/chat que recibe una pregunta y lo procesa (corre elAgente.run) está en el front o en el back (en una parte de la consigna dice back, pero dsp en estructura de proyecto archivo api.js está en front)

Hacer que parezca qeu está pensando (mostrar un loading de rta mientras se espera por ella)


TOOLS

Funciona 
Listar alumnos 
Buscar por nombre


Falla
Buscar por apellido -->
User prompts: 
- Hay alumnos que se apelliden Rodríguez
- Quiero buscar un alumno que se apellida González, está en la lista?
- Decime si hay alumnos que se apelliden Rodríguez

Se va por exceso de tiempo en operación