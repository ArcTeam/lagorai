const cacheName = "v3.2";
let cacheFile=[
'/lagorai',
'/lagorai/audio/37EtaContemporanea.mp3',
'/lagorai/audio/08Canezza.mp3',
'/lagorai/audio/25Fluorite.mp3',
'/lagorai/audio/06Viarago.mp3',
'/lagorai/audio/27Barite.mp3',
'/lagorai/audio/17S_francesco.mp3',
'/lagorai/audio/28Quarzo.mp3',
'/lagorai/audio/03Pergine.mp3',
'/lagorai/audio/30Min_Antimon.mp3',
'/lagorai/audio/01IlTerritorio.mp3',
'/lagorai/audio/23Calcopirite.mp3',
'/lagorai/audio/16_100Pozzi.mp3',
'/lagorai/audio/19iMinerali.mp3',
'/lagorai/audio/26Malachite.mp3',
'/lagorai/audio/11Palu.mp3',
'/lagorai/audio/04iPrincipali.mp3',
'/lagorai/audio/05Volpare.mp3',
'/lagorai/audio/18Calisio.mp3',
'/lagorai/audio/34FineBronzo.mp3',
'/lagorai/audio/31Attivita.mp3',
'/lagorai/audio/12Vignola.mp3',
'/lagorai/audio/13Vetriolo.mp3',
'/lagorai/audio/15Frassilongo.mp3',
'/lagorai/audio/24Magnetite.mp3',
'/lagorai/audio/07Valar.mp3',
'/lagorai/audio/21Galena.mp3',
'/lagorai/audio/32MetallurgiaPreistorica.mp3',
'/lagorai/audio/10Quadrate.mp3',
'/lagorai/audio/29Min_manganese.mp3',
'/lagorai/audio/36Medioevo.mp3',
'/lagorai/audio/02IlDistretto.mp3',
'/lagorai/audio/09Rementil.mp3',
'/lagorai/audio/14Santorsola.mp3',
'/lagorai/audio/35EtaRomana.mp3',
'/lagorai/audio/22Pirite.mp3',
'/lagorai/audio/33FaseEneo.mp3',
'/lagorai/audio/20_ORO.mp3',
'/lagorai/css/main.css',
'/lagorai/index.html',
'/lagorai/assets/pannelli/main6sub12.html',
'/lagorai/assets/pannelli/main6sub7.html',
'/lagorai/assets/pannelli/main7sub2.html',
'/lagorai/assets/pannelli/main5sub1.html',
'/lagorai/assets/pannelli/main8sub4.html',
'/lagorai/assets/pannelli/main6sub11.html',
'/lagorai/assets/pannelli/main8sub3.html',
'/lagorai/assets/pannelli/main6sub3.html',
'/lagorai/assets/pannelli/main7sub12.html',
'/lagorai/assets/pannelli/main8sub5.html',
'/lagorai/assets/pannelli/main8sub6.html',
'/lagorai/assets/pannelli/main7sub1.html',
'/lagorai/assets/pannelli/main7sub6.html',
'/lagorai/assets/pannelli/main7sub8.html',
'/lagorai/assets/pannelli/main6sub8.html',
'/lagorai/assets/pannelli/main6sub16.html',
'/lagorai/assets/pannelli/main7sub11.html',
'/lagorai/assets/pannelli/main6sub6.html',
'/lagorai/assets/pannelli/main7sub5.html',
'/lagorai/assets/pannelli/main4sub1.html',
'/lagorai/assets/pannelli/main6sub14.html',
'/lagorai/assets/pannelli/main7sub9.html',
'/lagorai/assets/pannelli/main6sub9.html',
'/lagorai/assets/pannelli/main7sub10.html',
'/lagorai/assets/pannelli/main6sub13.html',
'/lagorai/assets/pannelli/main6sub10.html',
'/lagorai/assets/pannelli/main8sub2.html',
'/lagorai/assets/pannelli/main6sub15.html',
'/lagorai/assets/pannelli/mappa.html',
'/lagorai/assets/pannelli/main2.html',
'/lagorai/assets/pannelli/main6sub17.html',
'/lagorai/assets/pannelli/main7sub4.html',
'/lagorai/assets/pannelli/main6sub4.html',
'/lagorai/assets/pannelli/main6sub18.html',
'/lagorai/assets/pannelli/main7sub3.html',
'/lagorai/assets/pannelli/template.html',
'/lagorai/assets/pannelli/main8sub1.html',
'/lagorai/assets/pannelli/main6sub2.html',
'/lagorai/assets/pannelli/main6sub5.html',
'/lagorai/assets/pannelli/main3.html',
'/lagorai/assets/pannelli/main7sub7.html',
'/lagorai/assets/pannelli/main6sub1.html',
'/lagorai/assets/header.html',
'/lagorai/img/icons/app-icon-512x512.png',
'/lagorai/img/icons/app-icon-144x144.png',
'/lagorai/img/icons/app-icon-192x192.png',
'/lagorai/img/icons/app-icon-96x96.png',
'/lagorai/img/icons/app-icon-48x48.png',
'/lagorai/img/icons/app-icon-256x256.png',
'/lagorai/img/icons/app-icon-384x384.png',
'/lagorai/img/gui/marker.png',
'/lagorai/img/gui/logo-lagorai.png',
'/lagorai/img/gui/etr.png',
'/lagorai/img/gui/marker-shadow.png',
'/lagorai/img/gui/favicon.png',
'/lagorai/json/markerPannelli.js',
'/lagorai/json/punti.js',
'/lagorai/json/menu.js',
'/lagorai/LICENSE',
'/lagorai/manifest.json',
'/lagorai/js/index.js',
'/lagorai/js/function.js',
'/lagorai/js/init.js'
]
self.addEventListener('install', e => {
  console.log('The service worker is being installed.');
  e.waitUntil(precache())
});

function precache() {
  return caches.open(cacheName).then(function (cache) {
    const stack = [];
    cacheFile.forEach(file => stack.push(
        cache.add(file).catch(_=>console.error(`can't load ${file} to cache`))
    ));
    return Promise.all(stack);
    // return cache.addAll(cacheFile);
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
