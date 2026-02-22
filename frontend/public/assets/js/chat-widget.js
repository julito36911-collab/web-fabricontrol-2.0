// FabriControl Chat Widget - Standalone Version for Static Pages
(function() {
  const BACKEND_URL = window.REACT_APP_BACKEND_URL || '';
  
  // Styles
  const styles = `
    .fc-chat-button {
      position: fixed;
      bottom: 90px;
      right: 24px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, #5A8AA0 0%, #8B6FA8 100%);
      border: none;
      color: white;
      font-size: 32px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(90, 138, 160, 0.4);
      transition: all 0.3s ease;
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .fc-chat-button:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(90, 138, 160, 0.6);
    }
    .fc-chat-widget {
      position: fixed;
      bottom: 90px;
      right: 24px;
      width: 380px;
      height: 600px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
      display: none;
      flex-direction: column;
      z-index: 9999;
      overflow: hidden;
    }
    .fc-chat-widget.open {
      display: flex;
    }
    .fc-chat-header {
      background: linear-gradient(135deg, #5A8AA0 0%, #8B6FA8 100%);
      color: white;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .fc-chat-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
    }
    .fc-chat-status {
      font-size: 12px;
      opacity: 0.9;
    }
    .fc-chat-close {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.2s;
    }
    .fc-chat-close:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .fc-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #f9fafb;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .fc-chat-message {
      display: flex;
      gap: 8px;
      align-items: flex-start;
    }
    .fc-message-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
      background: linear-gradient(135deg, #5A8AA0 0%, #8B6FA8 100%);
    }
    .fc-user-avatar {
      background: #F09C85;
    }
    .fc-message-content {
      max-width: 75%;
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.5;
    }
    .fc-assistant-message .fc-message-content {
      background: white;
      color: #1F2937;
      border: 1px solid #e5e7eb;
    }
    .fc-user-message {
      flex-direction: row-reverse;
    }
    .fc-user-message .fc-message-content {
      background: linear-gradient(135deg, #5A8AA0 0%, #8B6FA8 100%);
      color: white;
      margin-left: auto;
    }
    .fc-message-content a {
      color: #5A8AA0;
      text-decoration: underline;
      font-weight: 600;
    }
    .fc-user-message .fc-message-content a {
      color: white;
    }
    .fc-typing-indicator {
      display: flex;
      gap: 4px;
      padding: 12px 16px;
    }
    .fc-typing-indicator span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #5A8AA0;
      animation: fc-typing 1.4s infinite;
    }
    .fc-typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
    .fc-typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes fc-typing {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
      30% { transform: translateY(-10px); opacity: 1; }
    }
    .fc-chat-input-container {
      padding: 16px;
      background: white;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
      align-items: flex-end;
    }
    .fc-chat-input {
      flex: 1;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 14px;
      font-family: inherit;
      resize: none;
      max-height: 100px;
      min-height: 40px;
      transition: border-color 0.2s;
    }
    .fc-chat-input:focus {
      outline: none;
      border-color: #5A8AA0;
    }
    .fc-chat-input:disabled {
      background: #f3f4f6;
      cursor: not-allowed;
    }
    .fc-chat-send {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #5A8AA0 0%, #8B6FA8 100%);
      color: white;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .fc-chat-send:hover:not(:disabled) {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(90, 138, 160, 0.3);
    }
    .fc-chat-send:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    @media (max-width: 768px) {
      .fc-chat-widget {
        width: 100%;
        height: 85vh;
        bottom: 0;
        right: 0;
        border-radius: 16px 16px 0 0;
      }
      .fc-chat-button {
        bottom: 80px;
        right: 16px;
        width: 52px;
        height: 52px;
        font-size: 26px;
      }
    }
    @media (max-width: 480px) {
      .fc-chat-button {
        bottom: 70px;
        right: 12px;
        width: 48px;
        height: 48px;
        font-size: 24px;
      }
      .fc-chat-widget { height: 80vh; }
      .fc-chat-header h3 { font-size: 16px; }
      .fc-message-content {
        max-width: 85%;
        padding: 10px 12px;
        font-size: 13px;
      }
    }
  `;

  // Inject styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Detect language
  const isEnglish = window.location.pathname.includes('/en/');
  
  // Initial message based on language
  const initialMessage = isEnglish 
    ? "Hi! 👋 I'm FabriControl's assistant. How can I help you?\n\nI can answer about:\n- ✅ Features and pricing\n- ✅ Comparison with other ERPs\n- ✅ How the system works\n- ✅ Free 30-day trial"
    : "¡Hola! 👋 Soy el asistente de FabriControl. ¿En qué puedo ayudarte?\n\nPuedo responder sobre:\n- ✅ Características y precios\n- ✅ Comparación con otros ERPs\n- ✅ Cómo funciona el sistema\n- ✅ Trial gratuito de 30 días";

  const placeholder = isEnglish ? "Type your question..." : "Escribe tu pregunta...";

  // Create HTML
  const chatHTML = `
    <button class="fc-chat-button" id="fcChatButton">💬</button>
    <div class="fc-chat-widget" id="fcChatWidget">
      <div class="fc-chat-header">
        <div>
          <h3>FabriControl AI 🤖</h3>
          <span class="fc-chat-status">Online</span>
        </div>
        <button class="fc-chat-close" id="fcChatClose">✕</button>
      </div>
      <div class="fc-chat-messages" id="fcChatMessages"></div>
      <div class="fc-chat-input-container">
        <textarea class="fc-chat-input" id="fcChatInput" placeholder="${placeholder}" rows="1"></textarea>
        <button class="fc-chat-send" id="fcChatSend">➤</button>
      </div>
    </div>
  `;

  // Insert chat widget
  const container = document.createElement('div');
  container.innerHTML = chatHTML;
  document.body.appendChild(container);

  // Get elements
  const chatButton = document.getElementById('fcChatButton');
  const chatWidget = document.getElementById('fcChatWidget');
  const chatClose = document.getElementById('fcChatClose');
  const chatMessages = document.getElementById('fcChatMessages');
  const chatInput = document.getElementById('fcChatInput');
  const chatSend = document.getElementById('fcChatSend');

  // Messages array
  let messages = [{ role: 'assistant', content: initialMessage }];
  let isLoading = false;

  // Format message (simple markdown)
  function formatMessage(content) {
    let formatted = content;
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    formatted = formatted.replace(/\n/g, '<br/>');
    formatted = formatted.replace(/^- (.+)$/gm, '• $1');
    return formatted;
  }

  // Render messages
  function renderMessages() {
    chatMessages.innerHTML = messages.map((msg, i) => `
      <div class="fc-chat-message ${msg.role === 'user' ? 'fc-user-message' : 'fc-assistant-message'}">
        ${msg.role === 'assistant' ? '<div class="fc-message-avatar">🤖</div>' : ''}
        <div class="fc-message-content">${formatMessage(msg.content)}</div>
        ${msg.role === 'user' ? '<div class="fc-message-avatar fc-user-avatar">👤</div>' : ''}
      </div>
    `).join('');
    
    if (isLoading) {
      chatMessages.innerHTML += `
        <div class="fc-chat-message fc-assistant-message">
          <div class="fc-message-avatar">🤖</div>
          <div class="fc-message-content fc-typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      `;
    }
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Send message
  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || isLoading) return;

    chatInput.value = '';
    messages.push({ role: 'user', content: text });
    isLoading = true;
    renderMessages();

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Error');
      }

      const data = await response.json();
      messages.push({ role: 'assistant', content: data.response });
    } catch (error) {
      console.error('Chat error:', error);
      let errorMsg = isEnglish 
        ? '❌ Sorry, there was an error. Please try again.\n\n📧 **Contact:** julito36911@gmail.com\n📱 **WhatsApp:** +972 52-648-9461'
        : '❌ Lo siento, hubo un error. Por favor intenta de nuevo.\n\n📧 **Contacto:** julito36911@gmail.com\n📱 **WhatsApp:** +972 52-648-9461';
      messages.push({ role: 'assistant', content: errorMsg });
    } finally {
      isLoading = false;
      renderMessages();
    }
  }

  // Event listeners
  chatButton.addEventListener('click', () => {
    chatWidget.classList.add('open');
    chatButton.style.display = 'none';
  });

  chatClose.addEventListener('click', () => {
    chatWidget.classList.remove('open');
    chatButton.style.display = 'flex';
  });

  chatSend.addEventListener('click', sendMessage);

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Initial render
  renderMessages();

  // ─── WHATSAPP FLOATING BUTTON ────────────────────────────────────────────
  const waBtn = document.createElement('a');
  waBtn.href = 'https://wa.me/972526489461?text=' + encodeURIComponent('Hola! Estoy interesado en FabriControl. ¿Pueden darme más información?');
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.title = 'Contactar por WhatsApp';
  waBtn.setAttribute('data-testid', 'whatsapp-float-btn');
  waBtn.style.cssText = 'position:fixed;bottom:10rem;right:1.5rem;width:52px;height:52px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(37,211,102,0.45);z-index:997;transition:transform 0.2s,box-shadow 0.2s;text-decoration:none;';
  waBtn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.054 23.5l5.793-1.52A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882c-1.85 0-3.577-.498-5.065-1.367l-.364-.215-3.438.902.918-3.354-.237-.386A9.855 9.855 0 012.118 12C2.118 6.534 6.534 2.118 12 2.118c5.466 0 9.882 4.416 9.882 9.882 0 5.466-4.416 9.882-9.882 9.882z"/></svg>';
  waBtn.addEventListener('mouseenter', () => { waBtn.style.transform = 'scale(1.12)'; waBtn.style.boxShadow = '0 6px 20px rgba(37,211,102,0.6)'; });
  waBtn.addEventListener('mouseleave', () => { waBtn.style.transform = 'scale(1)'; waBtn.style.boxShadow = '0 4px 16px rgba(37,211,102,0.45)'; });
  document.body.appendChild(waBtn);
})();
