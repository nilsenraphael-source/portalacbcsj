// Service Worker - Portal ACBCSJ PWA
const CACHE_NAME = 'acbcsj-cache-v7';
const PRECACHE_ASSETS = [
    './',
    './index.html',
    './styles.css',
    './manifest.json',
    './logo.png',
    './icon-192.png',
    './icon-512.png',
    './apple-touch-icon.png',
    './supabaseClient.js',
    './js/core.js',
    './js/auth.js',
    './js/associados.js',
    './js/documentos.js',
    './js/mensagens.js',
    './js/financeiro.js',
    './js/portal-socio.js',
    './js/mensalidades.js',
    './js/relatorios.js',
    './js/escala.js',
    './js/senhas.js'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[PWA] Pré-carregando arquivos estáticos');
            return cache.addAll(PRECACHE_ASSETS).catch((err) => {
                console.warn('[PWA] Falha ao pré-carregar alguns itens do cache:', err);
            });
        }).then(() => self.skipWaiting())
    );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[PWA] Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Estratégia de requisições (Fetch)
// Network-First para garantir dados em tempo real (Supabase, formulários, etc.)
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Ignorar requisições não-GET ou do Supabase/APIs (sempre direto para a rede)
    if (request.method !== 'GET' || url.hostname.includes('supabase.co')) {
        return;
    }

    event.respondWith(
        fetch(request)
            .then((networkResponse) => {
                // Se a rede respondeu com sucesso, atualiza o cache para arquivos locais
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseToCache);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // Se estiver offline ou a rede falhar, busca no cache
                return caches.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // Se for navegação de página e falhar, retorna o index.html em cache
                    if (request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                    return new Response('Offline - Conteúdo temporariamente indisponível', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
                    });
                });
            })
    );
});
