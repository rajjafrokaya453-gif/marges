// Service worker minimal — juste ce qu'il faut pour que le navigateur
// propose "Installer l'application" / "Ajouter à l'écran d'accueil".
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', () => {}); // pas de cache géré ici
