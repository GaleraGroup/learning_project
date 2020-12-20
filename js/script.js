window.addEventListener('DomContentLoaded', () => {
    const tabs = require('./modules/tabcontent'),
          modal = require('./modules/modal'),
          calc = require('./modules/calc_second_edittion'),
          cards = require('./modules/cards'),
          slider = require('./modules/slider_geometry'),
          timer = require('./modules/timer');

    tabs();
    modal();
    calc();
    cards();
    slider();
    timer();

});