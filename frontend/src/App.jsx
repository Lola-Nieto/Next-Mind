import React, { useState } from 'react';
import ChatInput from './components/ChatInput';
import MessageList from './components/MessageList';
import axios from 'axios';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async (question) => {
        const userMessage = { text: question, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
         setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/api/chat', { mensaje: question });
            const botMessage = { text: response.data.respuesta.data?.result || response.data.respuesta, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Error al comunicarse con el servidor.', sender: 'bot' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <MessageList messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
        </div>
    );
};

export default App;