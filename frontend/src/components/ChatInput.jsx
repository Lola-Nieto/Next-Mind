import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };
    
    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '20px' }}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu pregunta..."
                style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button type="submit" style={{ padding: '10px', marginLeft: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff' }}>
                Enviar
            </button>
        </form>
    );
};

export default ChatInput;