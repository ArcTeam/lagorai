/////// SERVICE WORKER //////////
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful: ', registration);
      })
      .catch(err => console.error('ServiceWorker registration failed', err));
  });
}
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => { deferredPrompt = e; });
const installApp = document.getElementById('installApp');
installApp.addEventListener('click', async () => {
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
        }
    }
});
/////////// MAPPE ///////////////
let map;
const osmTile = 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png';
const osmAttrib='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const gStreetTile = 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
const gSatTile = 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
const gHybridTile = 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}';
const gTerrainTile = 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}';
const gSubDomains = ['mt0','mt1','mt2','mt3']
let idx =[]

// if (screen.width > 990) { $("nav").addClass('opened')}
$(window).on('load', function(){
  $("body>header").load('assets/header.html');
  menuEl.forEach((item, i) => {
    if (!item.sub) {idx.push(item.id)}
    let main = $("<a/>",{href:'#'+item.id, class:'list-group-item list-group-item-action viewPanel'}).text(item.title).appendTo('#menu');
    if (item.sub) {
      main.attr("data-bs-toggle","collapse").addClass('noAction');
      let collapse = $("<div/>",{class:'collapse', id:item.id}).appendTo('#menu');
      item.sub.forEach((sub, i) => {
        idx.push(sub.id)
        $("<a/>",{href:'#'+sub.id, class:'list-group-item list-group-item-action viewPanel submenu'}).text('> '+sub.title).appendTo(collapse);
      });
    }
  });
});
