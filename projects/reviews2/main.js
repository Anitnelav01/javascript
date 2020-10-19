ymaps.ready(init);

geoObjects = [];

function init() {
    let myMap = new ymaps.Map("map", {
        center: [55.75, 37.61],
        zoom: 10,
        controls: ['zoomControl'],
        behaviors: ['default', 'scrollZoom']
    });

    addListeners(myMap);

    var placemarks =[
        {
            latitude: 55.75,
            longitude: 37.61,
          hintContent: "Собственный значок метки 1",
         balloonContent: "Это красивая метка 1",
            
       },
     {
            latitude: 55.70,
           longitude: 37.61,
        hintContent: "Собственный значок метки 2",
            balloonContent: "Это красивая метка 2",
        },
    {
           latitude: 55.65,
           longitude: 37.61,
           hintContent: "Собственный значок метки 3",
           balloonContent: "Это красивая метка 3",
        }
    ];

    for (var i = 0; i < placemarks.length; i++) {
        geoObjects [i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
        {
            hintContent: placemarks[i].hintContent,
            balloonContent: placemarks[i].balloonContent
        },
        {
            iconLayout: "default#image",      
            iconImageHref: "img/pin.png",       
            iconImageSize: [30, 42],     
            iconImageOffset: [-5, -38],
        
        });
    }

    var clusterer = new ymaps.Clusterer({      
    });   
    //myMap.geoObjects.add(placemark);
    myMap.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
         

    function addListeners(myMap) {
        myMap.events.add("click", (event) => openModal(event));
    }

    function openModal(event) {
    // console.log(event);
        openEmtyModal(event);
    }

    async function openEmtyModal(event) {
        let posX = event.getSourceEvent().originalEvent.domEvent.originalEvent
            .clientX;
        let posY = event.getSourceEvent().originalEvent.domEvent.originalEvent
            .clientY;

            //console.log(posX,posY);

        coords = event.get("coords");

        const objectInfo = await getClickCoords(coords);
        //debugger;
    }

    function getClickCoords(coords) {
        return new Promise((resolve, reject) => {
            ymaps
                .geocode(coords)
                .then((response) => resolve(response.geoObjects.get(0).getAddressLine()))
                .catch((e) => reject(e));
    });
    }
}