import { useState } from "react";

export default function MessageForm({ onSend }) {
  const [content, setContent] = useState("");
  const [receiverId, setReceiverId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content || !receiverId) return;
    onSend(receiverId, content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        required
        className="border border-gray-300 rounded px-2 py-1"
      />
      <input
        type="text"
        placeholder="Message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="border border-gray-300 rounded px-2 py-1"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
    </form>
  );
}
