import { useState, useContext } from "react";
import { AuthProvider, AuthContext } from "../src/components/Axio";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Chat from "./components/Chat";

function AppContent() {
  const { user } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  if (!user)
    return (
      <div className="flex flex-col items-center mt-10">
        {showRegister ? <RegisterForm /> : <LoginForm />}
        <button
          onClick={() => setShowRegister(!showRegister)}
          className="text-blue-600 underline mt-3"
        >
          {showRegister ? "Déjà un compte ? Se connecter" : "Créer un compte"}
        </button>
      </div>
    );

  return <Chat />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
