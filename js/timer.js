'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const timer = document.querySelector('.timer'),
        timerBlocks = timer.querySelectorAll('.timer__block'),
        timerDays = document.querySelector('#days'),
        timerHours = document.querySelector('#hours'),
        timerMinutes = document.querySelector('#minutes'),
        timerSeconds = document.querySelector('#seconds'),
        promo = document.querySelector('.promotion__timer'),
        promoTitle = promo.querySelector('.title');
    

    promoTitle.innerText = 'До Нового года осталось:';

    const timeArray = [timerDays, timerHours, timerMinutes, timerSeconds];

    const endActionDate = '2020-12-31';
    
    
    function getDiffTimeRange (endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        const timerValues = [days, hours, minutes, seconds];  
        if (t <= 0 ) {
            clearInterval(timeInterval);
            promoTitle.innerText = 'С Новым годом!';
        } return timerValues;   
    }

    function renderTimer(arr) {
        let tempTimeArr = getDiffTimeRange(endActionDate);
        tempTimeArr.map(item => String(item))
                   .forEach((itm, i) => {
                       if (itm.length === 1) {
                           let strItm = `0${itm}`;
                           arr[i].innerText = strItm;
                       } else {
                           arr[i].innerText  = itm;
                       }
                   });
    }
    
    renderTimer(timeArray);
    let timeInterval = setInterval(() => {
        renderTimer(timeArray);
    }, 1000);
});
