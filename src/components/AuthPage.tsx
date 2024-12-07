import React from 'react';

const AuthPage: React.FC = () => {
  const handleLogin = () => {
    // Redirige l'utilisateur vers le backend pour démarrer le processus OAuth2
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth`; // Remplacez cette URL par celle de votre serveur backend
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      {/* Conteneur principal */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        {/* Titre */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Connexion
        </h1>

        {/* Description */}
        <p className="text-center text-sm text-gray-600 mb-6">
          Connectez-vous avec votre compte Google pour accéder à l'application.
        </p>

        {/* Bouton d'authentification */}
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg w-full flex items-center justify-center transition duration-300"
        >
          <svg
            className="h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.53 0 6.45 1.4 8.37 3.12l6.26-6.26C34.39 3.09 29.64 1 24 1 14.8 1 7.14 6.48 3.87 14.1l7.66 5.96C13.27 14.66 18.16 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M10.53 25.91A14.48 14.48 0 019.5 24c0-.64.06-1.27.14-1.88l-7.77-6.05C1.21 18.62 0 21.18 0 24c0 2.88 1.18 5.64 3.21 7.91l7.32-6z"
            />
            <path
              fill="#4CAF50"
              d="M24 46.5c5.19 0 9.82-1.7 13.54-4.6l-7.7-6.2c-1.66 1.12-3.74 1.8-5.84 1.8-5.28 0-9.8-3.47-11.4-8.21L3.13 31.78C6.69 39.86 14.7 46.5 24 46.5z"
            />
            <path
              fill="#FBBC05"
              d="M46.5 24c0-1.73-.27-3.38-.78-4.94H24v9.34h12.73c-.55 2.85-2.23 5.26-4.63 6.8l7.7 6.2C44.42 37.36 46.5 31.07 46.5 24z"
            />
          </svg>
          Se connecter avec Google
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          En vous connectant, vous acceptez nos{' '}
          <a href="/terms" className="text-blue-500 hover:underline">
            Conditions d'utilisation
          </a>{' '}
          et notre{' '}
          <a href="/privacy" className="text-blue-500 hover:underline">
            Politique de confidentialité
          </a>.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
