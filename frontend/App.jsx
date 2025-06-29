import React, { useState } from 'react';
import ChatInput from './components/ChatInput';
import MessageList from './components/MessageList';
import { enviarPregunta } from './lib/chatbot';

const App = () => {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async (question) => {
        const userMessage = { text: question, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const response = await elAgente.run(question);
        const botMessage = { text: response, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <MessageList messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default App;