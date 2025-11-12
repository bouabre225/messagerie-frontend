import React from "react";

export default function MessageList({ messages, currentUserId }) {
  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      {messages.map((msg) => (
        <div
          key={msg.id}
          style={{
            textAlign: msg.sender_id === currentUserId ? "right" : "left",
            margin: "5px 0",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: msg.sender_id === currentUserId ? "#4f46e5" : "#e5e7eb",
              color: msg.sender_id === currentUserId ? "white" : "black",
            }}
          >
            {msg.content}
          </span>
        </div>
      ))}
    </div>
  );
}
