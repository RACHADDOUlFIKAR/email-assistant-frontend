import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchLastMessage, sendEmail } from '../features/gmail/gmailSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { translations } from './translations';

const MessageViewer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState(''); // La réponse de l'utilisateur à modifier
  const [typedResponse, setTypedResponse] = useState(''); // La réponse générée qui sera tapée lettre par lettre
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const dispatch = useAppDispatch();
  const { lastMessage, generatedResponse, loading, error } = useAppSelector((state) => state.gmail);

  // Fonction pour gérer les changements dans le champ de texte de la réponse
  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  // Fonction pour récupérer le dernier message
  const handleFetchMessage = () => {
    if (email.trim()) {
      dispatch(fetchLastMessage(email));
    } else {
      toast.error(translations[language].errorMessage);
    }
  };

  // Fonction pour envoyer l'email
  const handleSendEmail = () => {
    if (response.trim()) {
      dispatch(sendEmail({ recipientEmail: email, subject: 'Response', body: response }))
        .then(() => {
          toast.success(translations[language].successMessage);
        })
        .catch((error) => {
          toast.error(`Error sending email: ${error.message || 'Unknown error'}`);
        });
    } else {
      toast.warn(translations[language].warningMessage);
    }
  };

  // Utilisation de l'effet pour taper la réponse générée lettre par lettre
  useEffect(() => {
    if (generatedResponse) {
      setResponse(generatedResponse);  // Initialiser la réponse avec la réponse générée
      let index = -1;
      setTypedResponse(''); // Réinitialiser le texte saisi
      const interval = setInterval(() => {
        setTypedResponse((prev) => prev + generatedResponse.charAt(index));
        index++;
        if (index === generatedResponse.length) {
          clearInterval(interval);
        }
      }, 10); // Délai entre chaque lettre
      return () => clearInterval(interval);
    } else {
      setTypedResponse(''); // Si aucune réponse générée
    }
  }, [generatedResponse]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-800">
      {/* Langue Sélecteur */}
      <div className="absolute top-4 right-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'fr' | 'en')}
          className="border-gray-300 p-2 rounded-md"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Cadre Description (Gauche) */}
      <aside className="bg-gray-100 w-1/3 p-6 flex flex-col justify-center space-y-6 shadow-md border-r">
        <h2 className="text-2xl font-bold text-gray-700">{translations[language].title}</h2>
        <p className="text-sm text-gray-600">
          {language === 'fr' ? (
            'Ce projet propose un assistant intelligent pour Gmail, conçu pour récupérer les derniers messages, générer des réponses automatiques grâce à l’IA et envoyer des emails en quelques clics. Simplifiez votre gestion de messagerie avec des fonctionnalités intelligentes et intuitives.'
          ) : (
            'This project offers a smart Gmail assistant, designed to fetch the latest messages, generate automatic replies using AI, and send emails in just a few clicks. Simplify your email management with smart and intuitive features.'
          )}
        </p>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
          <li>{translations[language].lastMessage}</li>
          <li>{translations[language].generatedResponse}</li>
          <li>{translations[language].sendButton}</li>
        </ul>
      </aside>

      {/* Section Fonctionnelle (Droite) */}
      <main className="flex-grow p-8 flex flex-col justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-6">
          {/* En-tête */}
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-xl font-bold text-gray-700">{translations[language].title}</h1>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={() => (window.location.href = `${process.env.REACT_APP_BACKEND_URL}/logout`)}
            >
              {translations[language].logoutButton}
            </button>
          </div>

          {/* Formulaire Email */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {translations[language].emailLabel}
              </label>
              <input
                id="email"
                type="email"
                placeholder={translations[language].placeholderEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 p-2 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleFetchMessage}
              className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600"
            >
              {translations[language].fetchButton}
            </button>
          </div>

          {/* Messages et Réponses */}
          <div className="space-y-4">
            {lastMessage && (
              <div className="bg-gray-100 p-4 rounded-md shadow-inner">
                <p className="text-sm"><strong>{translations[language].lastMessage}:</strong> {lastMessage}</p>
              </div>
            )}
            {generatedResponse && (
              <div className="space-y-2">
                <div className="bg-blue-50 p-4 rounded-md shadow-inner">
                  <p className="text-sm"> <strong>{translations[language].generatedResponse}:</strong> {typedResponse}</p>
                </div>
                <textarea
                  value={response}  // Utilisation de "response" pour permettre la modification
                  onChange={handleResponseChange}  // Gère le changement de valeur dans le textarea
                  className="border-gray-300 p-2 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={4}
                  placeholder={translations[language].modify_response}
                />
              </div>
            )}
          </div>

          {/* Boutons d'Action */}
          {generatedResponse && (
            <button
              onClick={handleSendEmail}
              className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600"
            >
              {translations[language].sendButton}
            </button>
          )}
          {loading && <p className="text-blue-500 text-center">{translations[language].loading}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </main>

      {/* Notifications */}
      <ToastContainer />
    </div>
  );
};

export default MessageViewer;
