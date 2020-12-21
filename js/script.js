import {tabs} from './modules/tabcontent';
import {calc} from './modules/calc_second_edittion';
import {cards} from './modules/cards';
import {slider} from './modules/slider_geometry';
import {timer} from './modules/timer';
import {modal} from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {
    const date = '2020-12-31';
    // const tabs = require('./modules/tabcontent'),
    //       calc = require('./modules/calc_second_edittion'),
    //       cards = require('./modules/cards'),
    //       slider = require('./modules/slider_geometry'),
    //       timer = require('./modules/timer'),
    //       modal = require('./modules/modal');

    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', '.tabheader__item_active');
    modal();
    calc();
    cards();
    slider({
        container: '.offer__slider-wrapper',
        inner: '.offer__slider-inner',
        currentCounter: '#current',
        totalCounter: '#total',
        leftArrow: '.offer__slider-prev',
        rightArrow: '.offer__slider-next',
        indicators: '.carousel-indicators'
    });
    timer('#days', '#hours', '#minutes', '#seconds', '.promotion__timer', '.title', date);
});




