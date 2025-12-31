const CACHE_NAME = 'aya-love-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;700;900&family=Great+Vibes&family=Marck+Script&display=swap',
    'https://raw.githubusercontent.com/shehabt1000-boop/Moussa/3c5822b0deb99157562300b4aefb8ce499b83603/IMG-20251124-WA0051.jpg',
    'https://images.pexels.com/photos/3266703/pexels-photo-3266703.jpeg?auto=compress&cs=tinysrgb&w=600'
];

// تثبيت الـ Service Worker وتخزين الملفات
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// تفعيل الـ Service Worker وحذف الكاش القديم
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// استرجاع الملفات من الكاش أو الشبكة
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // لو الملف موجود في الكاش رجعه، لو لأ هاته من النت
                return response || fetch(event.request);
            })
    );
});