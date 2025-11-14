import React, { useState, useRef, useEffect } from "react";
import "../styles/chat.css";

function Chat({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { role: "bot", content: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat Error:", err);
    }
  };

  return (
    <div className="chat-modal">
      <div className="chat-header">
        <h3>Mind Aura AI Chat</h3>
        <button onClick={onClose}>X</button>
      </div>

      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "user-msg" : "bot-msg"}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
