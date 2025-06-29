import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div className="message-list">
            {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}>
                    <p>{msg.text}</p>
                </div>
            ))}
        </div>
    );
};

export default MessageList;