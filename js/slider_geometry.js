'use strict';

document.addEventListener('DOMContentLoaded', () => {
    //Переменные слайдера и счетчика
const   sliderContainer = document.querySelector('.offer__slider-wrapper'),
        sliderInner = document.querySelector('.offer__slider-inner'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        left = document.querySelector('.offer__slider-prev'),
        right = document.querySelector('.offer__slider-next'),
        width = window.getComputedStyle(sliderContainer).width;

    //Переменные переключателя карусели
const   carousel = document.querySelector('.carousel-indicators');
        

    //Остальные переменные
let     offset = 0;
let     index = 1;
const url = 'http://localhost:3000/sliderItems';

    //Установка CSS значений
sliderContainer.style.overflow = "hidden";
sliderInner.style.display = "flex";
sliderInner.style.transition = 'all 1s';
current.textContent = nullAdder(index);


let getImg = async(url) => await fetch(url);
getImg(url).then(async data => {
    if (data.ok) {
        let imgList = await data.json();
        sliderInner.style.width = slicePX(width) * imgList.length + 'px';
        total.textContent = nullAdder(imgList.length);
        imgList.forEach(img => renderElem(img));
        renderCarousel(imgList.length);
        const dots = document.querySelectorAll('.dot');

    right.addEventListener('click', (evt) => {
        if (offset == slicePX(width) * (imgList.length-1)) {    
            offset = 0;
        } else {
            offset += slicePX(width);
        }
        getOffsetCoord(offset);

        if (index >= 1 && index <= imgList.length-1) {
            ++index;
            current.textContent = `${nullAdder(index)}`;
        } else {
            index = 1;
            current.textContent = `${nullAdder(index)}`;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[index - 1].style.opacity = 1;
    });

    left.addEventListener('click', (evt) => {
        if (offset == 0) {
            offset = slicePX(width) * (imgList.length - 1);
        } else {
            offset -= slicePX(width);
        }
        getOffsetCoord(offset);
        if (index > 1 && index <= imgList.length) {
            --index;
            current.textContent = `${nullAdder(index)}`;
        } else {
            index = imgList.length;
            current.textContent = `${nullAdder(index)}`;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[index - 1].style.opacity = 1;
    });

    //Логика точек
    dots.forEach(dot => {
        dot.addEventListener('click', (evt) => {
            const slideTo = evt.target.getAttribute('data-slide-to');
            index = slideTo;
            offset = slicePX(width) * (slideTo - 1);
            getOffsetCoord(offset);

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[index - 1].style.opacity = 1;
            if (index >= 1 && index <= imgList.length) {
                current.textContent = `${nullAdder(index)}`;
            } else {
                index = imgList.length;
                current.textContent = `${nullAdder(index)}`;
            }
        });
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

function renderCarousel(l) {
    for (let i = 0; i <= l-1; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i === 0) {
            dot.style.opacity = '1';
            carousel.append(dot);
        } else {
            carousel.append(dot);
        }
    }
}

function slicePX(str) {
    return +str.replace(/\D/g, '');
}

function nullAdder(n) {
    if (n > 0 && n < 10) {
        return `0${n}`;
    } else {
        return n + '';
    }
}

//Расчёт смещения, ориентируясь на ширину
function getOffsetCoord (offset) {
    sliderInner.style.transform = `translateX(-${offset}px)`;
}

});