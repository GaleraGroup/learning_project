'use strict';

function tabs() {
    const tabsParent = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent');

    const visibilitySwitch = {
        hideTabContent() {
            tabsContent.forEach(item => {
                item.style.display = 'none';
            });

            tabs.forEach(tab => {
                tab.classList.remove('tabheader__item_active');
            });
        },
        showTabContent(i = 0) {
            tabsContent[i].style.display = 'block';
            tabsContent[i].classList.add('fade');
            tabs[i].classList.add('tabheader__item_active');
        },
        hideClassActive() {
            tabs.forEach(tab => {
                tab.classList.remove('tabheader__item_active');
            });
        },
        showClassActive(event) {
            event.target.classList.add('tabheader__item_active');
        }
    };

    visibilitySwitch.hideTabContent();
    visibilitySwitch.showTabContent();

    tabsParent.addEventListener('click', (evt) => {
        evt.preventDefault();
        const target = evt.target;
        if (target && target.matches('div.tabheader__item') && !target.classList.contains('tabheader__item_active')) {
            tabs.forEach((item, i) => {
                if (item.innerText === target.innerText) {
                    visibilitySwitch.hideClassActive();
                    visibilitySwitch.showClassActive(evt);
                    visibilitySwitch.hideTabContent();
                    visibilitySwitch.showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;


// const btnWhite = document.querySelector('.btn_white');
// let id;

// btnWhite.addEventListener('click', (evt) => {
//     id = setInterval(foo, 2000);
//     setTimeout(() => {
//         clearInterval(id)
//     }, 5000);
// })

// console.log(id)
// function foo() {
//     console.log('text')
// }