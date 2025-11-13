import { AuthContext } from "./Axio";
import { useState, useContext } from "react";
import { Mail, Lock, LogIn } from 'lucide-react';
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

export default function LoginForm () {
    const { login} = useContext(AuthContext)
    const [ email, setEmail] =useState("")
    const [ password, setPassword] =useState("")
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    if (showRegister) return <RegisterForm />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/chat");
        } catch (error) {
// si Laravel renvoie une erreur
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "Email ou mot de passe incorrect." });
      }           }
    }

    return (
       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card principale */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header avec gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
            <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Bienvenue</h1>
            <p className="text-blue-100 text-sm">Connectez-vous pour accéder à la messagerie</p>
          </div>

          {/* Formulaire */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Champ Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
              </div>

              {/* Champ Mot de passe */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
              </div>

              {/* Lien mot de passe oublié */}
              <div className="flex items-center justify-end">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Mot de passe oublié ?
                </button>
              </div>

              {errors.general && <p className="text-red-600 text-center">{errors.general}</p>}

              {/* Bouton de connexion */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                Se connecter
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 pb-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">ou</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Vous n'avez pas de compte ?{' '}
                <button
                  onClick={() => setShowRegister(true)}
                  className="text-blue-600 font-medium hover:text-blue-700 transition duration-200"
                >
                  Créer un compte
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Message de sécurité */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Vos données sont protégées et sécurisées
        </p>
      </div>
    </div>
    )
}