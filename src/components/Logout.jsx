import { AuthContext } from "./Axio";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Shield } from 'lucide-react';

export default function Logout() {
    const { logout, user } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }
    return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card principale */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header avec gradient */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-center">
            <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Déconnexion</h1>
            <p className="text-red-100 text-sm">Vous êtes sur le point de quitter votre session</p>
          </div>

          {/* Contenu */}
          <div className="p-8">
            {/* Informations utilisateur */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Connecté en tant que</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>

            {/* Message de confirmation */}
            <div className="mb-6 text-center">
              <p className="text-gray-600 text-sm leading-relaxed">
                Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à nouveau à la messagerie.
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-3">
              {/* Bouton de déconnexion */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Se déconnecter
              </button>

              {/* Bouton annuler */}
              <button
                onClick={() => console.log('Annuler')}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200"
              >
                Annuler
              </button>
            </div>
          </div>

          {/* Footer avec info de sécurité */}
          <div className="px-8 pb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-blue-800 font-medium mb-1">Conseil de sécurité</p>
                <p className="text-xs text-blue-700">
                  Déconnectez-vous toujours lorsque vous utilisez un ordinateur partagé ou public.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message en bas */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Votre session sera fermée en toute sécurité
        </p>
      </div>
    </div>
    )
}