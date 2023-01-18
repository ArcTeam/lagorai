const cacheName = "v1";
let cacheFile=[
'/',
'./audio',
'./audio/37EtaContemporanea.mp3',
'./audio/08Canezza.mp3',
'./audio/25Fluorite.mp3',
'./audio/06Viarago.mp3',
'./audio/27Barite.mp3',
'./audio/17S_francesco.mp3',
'./audio/28Quarzo.mp3',
'./audio/03Pergine.mp3',
'./audio/30Min_Antimon.mp3',
'./audio/01IlTerritorio.mp3',
'./audio/23Calcopirite.mp3',
'./audio/16_100Pozzi.mp3',
'./audio/19iMinerali.mp3',
'./audio/26Malachite.mp3',
'./audio/11Palu.mp3',
'./audio/04iPrincipali.mp3',
'./audio/05Volpare.mp3',
'./audio/18Calisio.mp3',
'./audio/34FineBronzo.mp3',
'./audio/31Attivita.mp3',
'./audio/12Vignola.mp3',
'./audio/13Vetriolo.mp3',
'./audio/15Frassilongo.mp3',
'./audio/24Magnetite.mp3',
'./audio/07Valar.mp3',
'./audio/21Galena.mp3',
'./audio/32MetallurgiaPreistorica.mp3',
'./audio/10Quadrate.mp3',
'./audio/29Min_manganese.mp3',
'./audio/36Medioevo.mp3',
'./audio/02IlDistretto.mp3',
'./audio/09Rementil.mp3',
'./audio/14Santorsola.mp3',
'./audio/35EtaRomana.mp3',
'./audio/22Pirite.mp3',
'./audio/33FaseEneo.mp3',
'./audio/20_ORO.mp3',
'./css',
'./css/main.css',
'./index.html',
'./assets',
'./assets/pannelli',
'./assets/pannelli/main6sub12.html',
'./assets/pannelli/main6sub7.html',
'./assets/pannelli/main7sub2.html',
'./assets/pannelli/main5sub1.html',
'./assets/pannelli/main8sub4.html',
'./assets/pannelli/main6sub11.html',
'./assets/pannelli/main8sub3.html',
'./assets/pannelli/main6sub3.html',
'./assets/pannelli/main7sub12.html',
'./assets/pannelli/main8sub5.html',
'./assets/pannelli/main8sub6.html',
'./assets/pannelli/main7sub1.html',
'./assets/pannelli/main7sub6.html',
'./assets/pannelli/main7sub8.html',
'./assets/pannelli/main6sub8.html',
'./assets/pannelli/main6sub16.html',
'./assets/pannelli/main7sub11.html',
'./assets/pannelli/main6sub6.html',
'./assets/pannelli/main7sub5.html',
'./assets/pannelli/main4sub1.html',
'./assets/pannelli/main6sub14.html',
'./assets/pannelli/main7sub9.html',
'./assets/pannelli/main6sub9.html',
'./assets/pannelli/main7sub10.html',
'./assets/pannelli/main6sub13.html',
'./assets/pannelli/main6sub10.html',
'./assets/pannelli/main8sub2.html',
'./assets/pannelli/main6sub15.html',
'./assets/pannelli/mappa.html',
'./assets/pannelli/main2.html',
'./assets/pannelli/main6sub17.html',
'./assets/pannelli/main7sub4.html',
'./assets/pannelli/main6sub4.html',
'./assets/pannelli/main6sub18.html',
'./assets/pannelli/main7sub3.html',
'./assets/pannelli/template.html',
'./assets/pannelli/main8sub1.html',
'./assets/pannelli/main6sub2.html',
'./assets/pannelli/main6sub5.html',
'./assets/pannelli/main3.html',
'./assets/pannelli/main7sub7.html',
'./assets/pannelli/main6sub1.html',
'./assets/header.html',
'./img',
'./img/foto',
'./img/icons',
'./img/icons/app-icon-512x512.png',
'./img/icons/app-icon-144x144.png',
'./img/icons/app-icon-192x192.png',
'./img/icons/app-icon-96x96.png',
'./img/icons/app-icon-48x48.png',
'./img/icons/app-icon-256x256.png',
'./img/icons/app-icon-384x384.png',
'./img/gui',
'./img/gui/marker.png',
'./img/gui/logo-lagorai.png',
'./img/gui/etr.png',
'./img/gui/marker-shadow.png',
'./img/gui/favicon.png',
'./json',
'./json/markerPannelli.js',
'./json/punti.js',
'./json/menu.js',
'./LICENSE',
'./manifest.json',
'./js',
'./js/index.js',
'./js/function.js',
'./js/init.js'
]
self.addEventListener('install', e => {
  console.log('The service worker is being installed.');
  e.waitUntil(precache())
});

function precache() {
  return caches.open(cacheName).then(function (cache) {
    return cache.addAll(cacheFile);
  });
}

self.addEventListener('fetch', event => {
  console.log('The service worker is serving the asset.');
  event.respondWith(
    fromCache(event.request)
  );
  event.waitUntil(update(event.request));
});
function fromCache(request) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}
function update(request) {
  return caches.open(cacheName).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(oldCache => {
          if (cacheWhitelist.indexOf(oldCache) === -1) {
            return caches.delete(oldCache);
          }
        })
      );
    })
  );
});
