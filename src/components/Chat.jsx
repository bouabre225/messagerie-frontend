import { useContext } from "react";
import { AuthContext } from "./Axio";
import useMessages from "../hooks/Message";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";

export default function Chat() {
  const { user } = useContext(AuthContext);
  const { messages, sendMessage } = useMessages();

  if (!user) return 
  <p>Connectez-vous pour voir vos messages</p>;

  return (
    <div>
      <h2>Messagerie</h2>
      <MessageList messages={messages} currentUserId={user.id} />
      <MessageForm onSend={sendMessage} />
    </div>
  );
}
