'use strict';

function cards() {

    class Card {
        constructor([img, alt, title, description, price]) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.transfer = 28.5;
        }

        //Реализовать парсинг информации о курсе с api какого - нибудь банка через api;
        changreToUAH() {
            return Math.floor(this.price * this.transfer);
        }

        render() {
            const element = document.createElement('div');
            element.classList.add("menu__item");
            element.innerHTML = `
                        <img src=${this.img} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.description}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.changreToUAH()}</span> грн/день</div>
                        </div>
                `;
            document.querySelector('.menu .container').append(element);
        }
    }

    const getCardsFromDB = async (url) => {
        return await fetch(url);
    };

    getCardsFromDB('http://localhost:3000/menu')
        .then(async res => {
            if (res.ok) {
                let json = await res.json();
                json.forEach(item => {
                    new Card(Object.values(item)).render();
                });
            } else {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
        });
}

module.exports = cards;