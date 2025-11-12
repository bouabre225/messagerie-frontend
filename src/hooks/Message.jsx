import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/Axio";

export default function useMessages() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(res.data);
  };

  const sendMessage = async (receiverId, content) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "/api/messages",
      { receiver_id: receiverId, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setMessages([...messages, res.data]);
  };

  useEffect(() => {
    if (user) fetchMessages();
  }, [user]);

  return { messages, sendMessage, fetchMessages };
}
