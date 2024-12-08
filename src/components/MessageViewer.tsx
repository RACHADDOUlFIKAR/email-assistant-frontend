import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchLastMessage, sendEmail } from '../features/gmail/gmailSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { translations } from './translations';

const MessageViewer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState('');
  const [typedResponse, setTypedResponse] = useState('');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const dispatch = useAppDispatch();
  const { lastMessage, generatedResponse, loading, error } = useAppSelector((state) => state.gmail);

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  const handleFetchMessage = () => {
    if (email.trim()) {
      dispatch(fetchLastMessage(email))
        .catch((err) => {
          const errorMessage = err?.response?.data?.message || err.message || 'Unknown error fetching message';
          toast.error(`Error fetching message: ${errorMessage}`);
        });
    } else {
      toast.error(translations[language].errorMessage);
    }
  };

  const handleSendEmail = () => {
    if (response.trim()) {
      dispatch(sendEmail({ recipientEmail: email, subject: 'Response', body: response }))
        .then(() => toast.success(translations[language].successMessage))
        .catch((err) => {
          const errorMessage = err?.response?.data?.message || err.message || 'Unknown error sending email';
          toast.error(`Error sending email: ${errorMessage}`);
        });
    } else {
      toast.warn(translations[language].warningMessage);
    }
  };

  useEffect(() => {
    if (generatedResponse) {
      setResponse(generatedResponse);
      let index = -1;
      setTypedResponse('');
      const interval = setInterval(() => {
        setTypedResponse((prev) => prev + generatedResponse.charAt(index));
        index++;
        if (index === generatedResponse.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    } else {
      setTypedResponse('');
    }
  }, [generatedResponse]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="lg:w-1/3 p-6 shadow-md border-r bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">{translations[language].title}</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-600 text-center">
            {language === 'fr'
              ? 'Ce projet propose un assistant intelligent pour Gmail, conçu pour récupérer les derniers messages, générer des réponses automatiques grâce à l’IA et envoyer des emails.'
              : 'This project offers a smart Gmail assistant designed to fetch the latest messages, generate AI-powered replies, and send emails.'}
          </p>
        </div>
        <ul className="mt-4 text-sm text-gray-600 list-disc pl-5 space-y-2">
          <li>{translations[language].lastMessage}</li>
          <li>{translations[language].generatedResponse}</li>
          <li>{translations[language].sendButton}</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-8 flex flex-col items-center overflow-y-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl space-y-6">
          {/* Header with logout button */}
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-700">{translations[language].title}</h1>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={() => (window.location.href = `${process.env.REACT_APP_BACKEND_URL}/logout`)}
            >
              {translations[language].logoutButton}
            </button>
          </div>

          {/* Form */}
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

          {/* Display Messages */}
          <div className="space-y-4">
            {lastMessage && (
              <div className="bg-gray-100 p-4 rounded-md shadow-inner">
                <p className="text-sm">
                  <strong>{translations[language].lastMessage}:</strong> {lastMessage}
                </p>
              </div>
            )}
            {generatedResponse && (
              <div className="bg-blue-50 p-4 rounded-md shadow-inner">
                <p className="text-sm">
                  <strong>{translations[language].generatedResponse}:</strong> {typedResponse}
                </p>
              </div>
            )}
            <textarea
              value={response}
              onChange={handleResponseChange}
              className="border-gray-300 p-2 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
              placeholder={translations[language].modify_response}
            />
          </div>

          {/* Send Button */}
          {generatedResponse && (
            <button
              onClick={handleSendEmail}
              className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600"
            >
              {translations[language].sendButton}
            </button>
          )}

          {/* Loading and Error Messages */}
          {loading && <p className="text-blue-500 text-center">{translations[language].loading}</p>}
          {error && <p className="text-red-500 text-center">{translations[language].errorMessage}</p>}
        </div>
      </main>

      <ToastContainer />
    </div>
  );
};

export default MessageViewer;
