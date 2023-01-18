$(window).on('load', function(){
  if(localStorage.getItem('page')){
    $("nav a[href='#"+localStorage.getItem('page')+"']").addClass('active');
    initMain(localStorage.getItem('page'))
    return false;
  }
  localStorage.setItem('page','mappa')
  $("nav a[href='#mappa']").addClass('active');
  initMain('mappa')
})
$(".toggleMenu").on('click', () => {  $("nav").toggleClass('opened'); })
$("body").on('click', '.viewPanel', function() {
  if (!$(this).hasClass('noAction')) {
    $('nav a').removeClass('active');
    $(this).addClass('active');
    if (!localStorage.getItem('page') || localStorage.getItem('page') !== $(this).attr('href').substr(1)) {
      localStorage.setItem('page',$(this).attr('href').substr(1));
    }
    if (!$(this).hasClass('mapLink')){$("nav").toggleClass('opened');}
    initMain($(this).attr('href').substr(1));
  }
})

let prevBtn = $("<div/>",{class:'switchPanel', id:'prevPanel'}).appendTo('body');
$("<button/>",{class:'prevPanelBtn btn btn-warning'}).text('<').appendTo(prevBtn).on('click', function(){
  let i = getPageIdx()
  $('nav a').removeClass('active');
  $("nav a[href='#"+i[1]+"']").addClass('active');
  localStorage.setItem('page',i[1]);
  initMain(i[1])
})

let nextBtn = $("<div/>",{class:'switchPanel', id:'nextPanel'}).appendTo('body');
$("<button/>",{class:'nextPanelBtn btn btn-warning'}).text('>').appendTo(nextBtn).on('click', function(){
  let i = getPageIdx()
  $('nav a').removeClass('active');
  $("nav a[href='#"+i[2]+"']").addClass('active');
  localStorage.setItem('page',i[2]);
  initMain(i[2])
})

function getPageIdx(){
  let page = localStorage.getItem('page')
  let me = idx.map(i => i).indexOf(page);
  let last = idx.length
  let prev = me == 0 ? 0 : idx[me-1];
  let next = idx[me+1];
  return [me, prev, next, last-1];
}

function initMain(page){
  $("[data-bs-toggle='popover']").popover('dispose');
  $("main").load('assets/pannelli/'+page+'.html', function(){
    $(".etrText").hide()
    $("#etrBtn").on('click', function(){$(".etrText,.defaultText").toggle();})
    let i = getPageIdx()
    let map = false;
    if (page == 'mappa'){
      map = true
    }else {
      let filteredPage = markerPannelli.filter((item) => item.id == page);
      if(filteredPage.length > 0){map = true;}
    }
    if (map) {initMap()}else {$("#map").remove();}
    i[0] == 0 ? prevBtn.hide() : prevBtn.show()
    i[0] == i[3] ? nextBtn.hide() : nextBtn.show()
    if (i[0] >= 35) {
      $(".time").on('click', function(){
        let p = $(this).attr('id');
        $('nav a').removeClass('active');
        $("nav a[href='#"+p+"']").addClass('active');
        localStorage.setItem('page',p);
        initMain(p)
      })
      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
      const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl,{trigger:'manual'}))
      $('[data-bs-toggle="popover"]').popover('show');
    }
  })
}
function initMap(){
  let page = localStorage.getItem('page')
  let punti;
  map = L.map('map');
  map.setMaxZoom(16);
  let osm = L.tileLayer(osmTile, {maxZoom: 17,attribution: osmAttrib});
  let gStreets = L.tileLayer(gStreetTile,{maxZoom: 20, subdomains:gSubDomains });
  let gSat = L.tileLayer(gSatTile,{maxZoom: 20, subdomains:gSubDomains});
  let gTerrain = L.tileLayer(gTerrainTile,{maxZoom: 20, subdomains:gSubDomains});
  osm.addTo(map)
  var baseLayers = {
    "OpenStreetMap": osm,
    "Terrain":gTerrain,
    "Satellite": gSat,
    "Google Street": gStreets
  };
  L.control.layers(baseLayers, '', {position: 'bottomright'}).addTo(map);
  let icon = new L.Icon({
    iconUrl: 'img/gui/marker.png',
    shadowUrl: 'img/gui/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  let marker = L.featureGroup().addTo(map);
  if(page == 'mappa'){
    punti = L.geoJSON(puntiJson,{
      pointToLayer: function(feature, latlng) { return L.marker(latlng, {icon: icon});},
      onEachFeature: initPopUp
    }).addTo(map);
    map.fitBounds(punti.getBounds());
  }else {
    let filteredPage = markerPannelli.filter((item) => item.id == page);
    filteredPage[0].point.forEach((item, i) => {
      L.marker([item.coordinates[1],item.coordinates[0]], {icon: icon}).addTo(marker).bindPopup(item.desc);
    });
    filteredPage[0].point.length == 1 ? map.setView([filteredPage[0].point[0].coordinates[1],filteredPage[0].point[0].coordinates[0]], 15) : map.fitBounds(marker.getBounds());

  }

  L.easyButton( '<i class="mdi mdi-home" data-bs-toggle="tooltip" data-bs-placement="right" title="torna allo zoom massimo">face</i>', function(){
    page == 'mappa' ? map.flyToBounds(punti.getBounds()) : map.flyToBounds(marker.getBounds())
  }).addTo(map)
}

function initPopUp(feature, layer){
  let title = "<h4>"+feature.properties.desc+"</h4>";
  let url = "<a class='viewPanel mapLink' href='#"+feature.properties.panel+"'>#visualizza scheda</a>"
  layer.bindPopup(title+url);
}
