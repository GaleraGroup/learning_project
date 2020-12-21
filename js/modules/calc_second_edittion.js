import {postData} from '../services/services';


function calc() {
    const calcFields = document.querySelector('.calculating__field'),
        total = calcFields.querySelector('.calculating__result span'),
        metricsFields = calcFields.querySelector('.calculating__choose_medium'),
        calcTotalField = document.querySelector('.calculating__total');

    const activeClass = 'calculating__choose-item_active';
    let storage = window.localStorage;
    storage.setItem('sex', 'female');
    storage.setItem('height', 0);
    storage.setItem('weight', 0);
    storage.setItem('age', 0);
    storage.setItem('ratio', 1.375);
    storage.setItem('total', 0);



    //Перебор всех полей формы калькулятора, с целью вычленения
    //кнопок
    function bruteForceFields() {
        for (let field of calcFields.children) {
            if (field.classList.contains('calculating__choose')) {
                for (let child of field.children) {
                    if (child.nodeName !== 'INPUT') {
                        changeActivity(field);
                        break;
                    } else {
                        setEventField(child);
                    }
                }
            }
        }
    }

    bruteForceFields();

    function changeActivity(item) {

        for (let child of item.children) {
            if (child.getAttribute('data-sex') === storage.getItem('sex')) {
                setClass(item, child);
            } else if (child.getAttribute('data-ratio') === storage.getItem('ratio')) {
                setClass(item, child);
            }
            child.addEventListener('click', () => {
                setClass(item, child);
            });


            child.addEventListener('keyup', (evt) => {
                setClass(item, evt.target);
                setEventButton(item);
            });
        }
        setEventButton(item);
    }

    // Перебор отдельной категории 'Ваш пол, конституция' и т.д.
    // и установка класса активности из ls
    function setClass(item, child) {
        Array.from(item.children).forEach(div => {
            div.classList.remove(activeClass);
        });
        child.classList.add(activeClass);
    }

    // Сохранение выбранного значения в localStorage
    function setEventButton(parent) {
        for (let child of parent.children) {
            child.addEventListener('click', evt => {
                let e = evt.target;
                if (e.getAttribute('data-sex')) {
                    storage.setItem('sex', e.getAttribute('data-sex'));
                } else {
                    storage.setItem('ratio', e.getAttribute('data-ratio'));
                }
            });
            calcFields.addEventListener('click', renderTotalResult);
        }
        for (let child of parent.children) {
            child.addEventListener('keyup', evt => {
                if (evt.code === 'Tab') {
                    let e = evt.target;
                    if (e.getAttribute('data-sex')) {
                        storage.setItem('sex', e.getAttribute('data-sex'));
                    } else {
                        storage.setItem('ratio', e.getAttribute('data-ratio'));
                    }
                }
            });
            child.addEventListener('keyup', renderTotalResult);
        }
    }

    function saveDataToStorage() {}

    // Сохранение значения из полей с весом, возрастом и ростом в localStorage
    function setEventField(field) {
        field.addEventListener('input', evt => {
            switch (evt.target.getAttribute('id')) {
                case 'height':
                    storage.setItem('height', checkInputValue(evt.target));
                    renderTotalResult();
                    break;
                case 'weight':
                    storage.setItem('weight', checkInputValue(evt.target));
                    renderTotalResult();
                    break;
                case 'age':
                    storage.setItem('age', checkInputValue(evt.target));
                    renderTotalResult();
                    break;
            }
            // Проверка на заполненные поля и длину результирующего div
            if (metricsFields.children[0].value && metricsFields.children[1].value && metricsFields.children[2].value && calcTotalField.children.length < 3) {
                renderBtn();
            }
        });
    }

    // Проверка вводимого значения
    function checkInputValue(target) {
        if (!isNaN(+target.value)) {
            target.style.border = '1px solid #54ed39';
            return +target.value;
        } else {
            target.style.border = '1px solid #b11f3a';
            return 0;
        }
    }

    // Отрисовка конченого значения
    function renderTotalResult() {
        total.textContent = calcTotalResult();
        storage.setItem('total', calcTotalResult());
    }

    class User {
        constructor(name, height, weight, age, total, day, userAgent) {
            this.name = name;
            this.height = height;
            this.weight = weight;
            this.age = age;
            this.total = total;
            this.userAgent = userAgent;
        }
    }

    function renderBtn() {
        const saveBtn = document.createElement('div');
        saveBtn.classList.add('btn', 'btn_white');
        saveBtn.textContent = 'Сохранить';
        calcTotalField.append(saveBtn);

        saveBtn.addEventListener('click', evt => {
            const url = 'http://localhost:3000/result';
            let newUser = new User(checkName(), storage.height, storage.weight, storage.age, storage.total, new Date(), window.navigator.userAgent);
            const json = JSON.stringify(newUser);
            postData(url, json)
                .then(data => {
                    //console.log(data)
                });
        });

        function checkName() {
            let name = prompt('Введите имя', '');
            return name;
        }
    }


    // Вычисления по формуле
    function calcTotalResult() {
        let sex = storage.getItem('sex'),
            height = storage.getItem('height'),
            weight = storage.getItem('weight'),
            age = storage.getItem('age'),
            ratio = storage.getItem('ratio');

        if (sex === 'female') {
            return Math.round(ratio * (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)));
        } else {
            return Math.round(ratio * (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)));
        }
    }
}

export {calc};