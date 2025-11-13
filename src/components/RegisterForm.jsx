import { AuthContext } from "./Axio";
import { useState, useContext } from "react";
import { User, Mail, Lock, UserPlus, ArrowLeft } from 'lucide-react';
import  LoginForm  from "./LoginForm";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const { register } = useContext(AuthContext)
    const [ name, setName] =useState("")
    const [ email, setEmail] =useState("")
    const [ password, setPassword] =useState("")
    const [showLogin, setShowLogin] = useState(false);
    const [ errors, setErrors] = useState({});
    const navigate = useNavigate();

    if (showLogin) return <LoginForm />;

    const handleSubmit = async (e) => {
        e.preventDefault();
          setErrors({}); // reset avant une nouvelle tentative

        try {
            await register({name, email, password});
            navigate("/chat");
        } catch (error) {
// si Laravel renvoie une erreur
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "Email ou mot de passe incorrect." });
      }       
     }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card principale */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header avec gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-center">
            <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Créer un compte</h1>
            <p className="text-purple-100 text-sm">Rejoignez-nous pour accéder à la messagerie</p>
          </div>

          {/* Formulaire */}
          <div className="p-8">
            <div className="space-y-5">
              {/* Champ Nom */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom complet
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                  />
                </div>
                {/* parie pour afficher les erreurs */}
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
              </div>

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
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                  />
                </div>
                {/* parie pour afficher les erreurs */}
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
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                  />
                </div>
                {/* parie pour afficher les erreurs */}
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 8 caractères recommandés
                </p>
              </div>

              {/* Case à cocher CGU */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  J'accepte les{' '}
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    conditions d'utilisation
                  </button>
                  {' '}et la{' '}
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    politique de confidentialité
                  </button>
                </label>
              </div>
                
                {errors.general && <p className="text-red-600 text-center">{errors.general}</p>}

              {/* Bouton d'inscription */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
              >
                <UserPlus className="w-5 h-5" />
                Créer mon compte
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
                Vous avez déjà un compte ?{' '}
                <button className="text-purple-600 font-medium hover:text-purple-700 transition duration-200 inline-flex items-center gap-1" onClick={() => setShowLogin(true)}>
                  <ArrowLeft className="w-4 h-4" />
                  Se connecter
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Message de sécurité */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Vos informations sont chiffrées et sécurisées
        </p>
      </div>
    </div>
    )
}