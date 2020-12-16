'use strict'

document.addEventListener('DOMContentLoaded', () => {

    const sliderContainer = document.querySelector('.offer__slider-wrapper'),
        current = document.querySelector('.offer__slider-counter #current'),
        total = document.querySelector('.offer__slider-counter #total'),
        left = document.querySelector('.offer__slider-prev'),
        right = document.querySelector('.offer__slider-next'),
        carouselIndicators = document.querySelector('.carousel-indicators');

    
    class Slider {
        constructor(startIndex, lastIndex) {
            this.startIndex = startIndex;
            this.lastIndex = lastIndex;
        }

        nullAdder(n) {
            if (n > 0 && n < 10) {
                return `0${n}`;
            } else {
                return n + '';
            }
        }

        render(str, num, list) {
            let slide = document.createElement('div');
            slide.classList.add('offer__slide');
            slide.innerHTML = `
            <img src= "${list[num-1].img}" alt="pepper">
            `;

            current.textContent = str;
            const indicator = document.createElement('div');
            indicator.classList.add('dot');
            
            for (let i = 0; i <= Object.keys(list).length; i++) {
                carouselIndicators.append(indicator);
            }
            sliderContainer.append(slide);
        }
    }
    

    // Получение данных с картинками из db
    const url = 'http://localhost:3000/sliderItems';

    let getImgList = async (url) => await fetch(url);
    
    function imgListProcessing(url) {
        getImgList(url).then(async data => {
            if (data.ok) {
                let imgListObj = await data.json();
                let totalLength = Object.keys(imgListObj).length;

                const slide = new Slider(1, totalLength);

                slide.render(slide.nullAdder(slide.startIndex), slide.startIndex, imgListObj);
                total.textContent = slide.nullAdder(slide.lastIndex);

                left.addEventListener('click', evt => {
                    sliderContainer.innerHTML = '';
                    if (slide.startIndex > 1) {
                        --slide.startIndex;
                        slide.render(slide.nullAdder(slide.startIndex), slide.startIndex, imgListObj);
                    } else {
                        slide.startIndex = slide.lastIndex;
                        slide.render(slide.nullAdder(slide.startIndex), slide.startIndex, imgListObj);
                    }
                });

                right.addEventListener('click', evt => {
                    sliderContainer.innerHTML = '';
                    if (slide.startIndex < slide.lastIndex) {
                        ++slide.startIndex;
                        slide.render(slide.nullAdder(slide.startIndex), slide.startIndex, imgListObj);
                    } else {
                        slide.startIndex = 1;
                        slide.render(slide.nullAdder(slide.startIndex), slide.startIndex, imgListObj);
                    }
                });
            }
        }).catch(() => console.log('Ошибка загрузки данных'));
    }
    imgListProcessing(url);
});