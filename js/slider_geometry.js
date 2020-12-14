'use strict';


document.addEventListener('DOMContentLoaded', () => {
const   sliderContainer = document.querySelector('.offer__slider-wrapper'),
        //slides = document.querySelector('.offer__slide'),
        sliderInner = document.querySelector('.offer__slider-inner'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        left = document.querySelector('.offer__slider-prev'),
        right = document.querySelector('.offer__slider-next'),
        width = window.getComputedStyle(sliderContainer).width;

let     offset = 0;


//wrapper - блок со свойством overflow: hidden - показывает, только то что влезает в его ширину
//inner  - блок, который имеет ширину = ширине всего содержимого, т.е. всех картинок
const url = 'http://localhost:3000/sliderItems';

sliderContainer.style.overflow = "hidden";
sliderInner.style.display = "flex";
sliderInner.style.transition = '0.5s all';

let getImg = async(url) => await fetch(url);
getImg(url).then(async data => {
    if (data.ok) {
        let imgList = await data.json();
        sliderInner.style.width = slicePX(width) * imgList.length + 'px';
        imgList.forEach(img => {
            renderElem(img);
        });

    right.addEventListener('click', (evt) => {
        
        sliderInner.style.transition = `translateX(-${offset}px)`;
    });
    }
});


function renderElem(img) {
    const div = document.createElement('div');
    div.classList.add('offer__slide');
    div.style.width = width;
    div.innerHTML = `
        <img src=${img.img} alt="">
    `;
    sliderInner.append(div);
}

function slicePX(str) {
    return +str.replace(/px/i, '');
}

});