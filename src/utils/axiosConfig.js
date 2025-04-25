/*import axios from 'axios';

// Base URL à adapter selon ton backend
const API_BASE_URL = 'http://localhost:8083';

// Créer une instance Axios dédiée
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Endpoints à exclure de l'ajout automatique du token
const excludedEndpoints = ['/auth/login', '/registerUser'];

// Intercepteur des requêtes pour ajouter le token (sauf pour les routes exclues)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  const isExcluded = excludedEndpoints.some((endpoint) =>
    config.url.endsWith(endpoint)
  );

  if (token && !isExcluded) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Intercepteur des réponses pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestion stricte du 401 Unauthorized
    if (error.response && error.response.status === 401) {
      console.warn('Token expiré ou invalide. Déconnexion de l’utilisateur.');
      localStorage.removeItem('access_token');

      // Rediriger l’utilisateur vers la page login proprement
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;*/
