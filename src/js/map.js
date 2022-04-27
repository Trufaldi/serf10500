let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [59.937670, 30.355591],
        zoom: 11,
        controls: []
    });

    const coords = [
        [59.937670, 30.355591],
        [60.058812, 30.330106],
        [59.856293, 30.393968]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: "img/marker.png",
        iconImageSize: [60, 73],
        iconImageOffset: [-35, 52]
    });
    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    })
    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);