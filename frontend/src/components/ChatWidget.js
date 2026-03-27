import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! 👋 Soy el asistente de FabriControl. ¿En qué puedo ayudarte?\n\nPuedo responder sobre:\n- ✅ Características y precios\n- ✅ Comparación con otros ERPs\n- ✅ Cómo funciona el sistema\n- ✅ Trial gratuito de 30 días'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://fabricontrol-api.onrender.com';

    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          language: 'auto'
        })
      });

      if (!response.ok) throw new Error('Error en la red');

      const data = await response.json();
      const botReply = data.response || "Lo siento, no pude procesar eso.";
      setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);

    } catch (error) {
      console.error('Error detallado:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Error de comunicación con la IA.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    let formatted = content;
    
    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Links
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Line breaks
    formatted = formatted.replace(/\n/g, '<br/>');
    
    // Lists
    formatted = formatted.replace(/^- (.+)$/gm, '• $1');
    
    return formatted;
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          className="chat-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          💬
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="chat-widget">
          {/* Header */}
          <div className="chat-header">
            <div>
              <h3>FabriControl AI 🤖</h3>
              <span className="chat-status">Online</span>
            </div>
            <button
              className="chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                {message.role === 'assistant' && <div className="message-avatar">🤖</div>}
                <div 
                  className="message-content"
                  dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                />
                {message.role === 'user' && <div className="message-avatar user-avatar">👤</div>}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message assistant-message">
                <div className="message-avatar">🤖</div>
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-container">
            <textarea
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu pregunta..."
              rows="1"
              disabled={isLoading}
            />
            <button
              className="chat-send"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
