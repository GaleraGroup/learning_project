'use strict';


window.addEventListener('DOMContentLoaded', () => {
    class Card {
        constructor([img, alt, title, description, price], parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.transfer = 28.5;
            this.parent = document.querySelector(parentSelector);
        }


        //Реализовать парсинг информации о курсе с api какого - нибудь банка через api
        changreToUAH() {
            return Math.floor(this.price * this.transfer);
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
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
            this.parent.append(element);
        }
    }

    // const customCard = new Card (
    //     'img/tabs/elite.jpg',
    //     'elite',
    //     'Завтрак для альфа - самцов',
    //     'Похавай от души, как кабан',
    //      50,
    //     '.menu__field .container',
    //     'menu__item',
    //     'big'
    // );

    fetch('http://localhost:3000/menu')
        .then(response => response.json())
        .then(json => {
            json.forEach(item => {
                const customCard = new Card(Object.values(item));
                //console.log(customCard.classes)
                customCard.render();
            });
        });

    
});


//img, alt, title, description, price, parentSelector, ...classes


//Классы и их экземпляры
// class Rectangle {
//     constructor(height, width) {
//         this.height = height;
//         this.width = width;
//     }

//     calcArea() {
//         return this.height * this.width;
//     }
// }

// class ColoredRectangleWithText extends Rectangle {
//     constructor(height, width, text, bgc) {
//         super(height, width);
//         this.text = text;
//         this.bgc = bgc;
//     }

//     showMpProps() {
//         console.log(`Текст: ${this.text}, цвет: ${this.bgc}`)
//     }
// }

// const colorSquare = new ColoredRectangleWithText(25, 10, 'asdfasd', '#000000');
// colorSquare.showMpProps();
// console.log(colorSquare.calcArea());