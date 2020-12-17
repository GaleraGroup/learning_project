'use sctipt';

document.addEventListener('DOMContentLoaded', () => {
    const calcFields = document.querySelector('.calculating__field'),
        gender = calcFields.querySelector('#gender'),
        mediumChoose = calcFields.querySelector('.calculating__choose_medium'),
        bigChoose = calcFields.querySelector('.calculating__choose_big'),
        calc = document.querySelector('.calculating');



    parseChildrenBlocks(calcFields);


    //Парсит дочерние блоки калькулятора и проверяет вложенные блоки на соответствие типу 'text', после чего запускает changeActivity
    function parseChildrenBlocks(fields) {
        Array.from(fields.children).forEach(item => {
            if (item.children.length !== 0) {
                Array.from(item.children).forEach(div => {
                    if (div.type !== 'text' && item.classList.contains('calculating__choose')) {
                        changeActivity(item);
                    } else {
                        changeOutline(item, div);
                    }
                });
            }
        });
    }

    //Изменяет класс активности элемента
    function changeActivity(item) {
        let arr = Array.from(item.children);
        arr.forEach(item => {
            item.addEventListener('click', (evt) => {
                let e = evt.target;
                if (!e.classList.contains('calculating__choose-item_active')) {
                    arr.forEach(div => div.classList.remove('calculating__choose-item_active'));
                    e.classList.add('calculating__choose-item_active');
                }
            });
        });
    }

    function changeOutline(item, div) {
        if (div.classList.contains('calculating__choose-item')) {
            div.addEventListener('focus', (evt) => {
                Array.from(item.children).forEach(i => i.style.outline = '')
                div.style.outline = '1px solid #54ed39';
            });
        }
    }


    //Формирование объекта формы
    class YourSelf {
        constructor(gender = 'female', height = 0, weight = 0, age = 0, activity = 'small') {
            this.gender = gender;
            this.height = height;
            this.weight = weight;
            this.age = age;
            this.activity = activity;
        }

    }

    const calcResult = new YourSelf(getGender());
    getGender();
    getHWA();
    getActivity();


    function getGender() {
        gender.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('calculating__choose-item_active')) {
                if (evt.target.textContent === 'Женщина') {
                    calcResult.gender = 'female';
                } else {
                    calcResult.gender = 'male';
                }
            }
        });
    }

    ///Хуйню эту переписать
    function getHWA() {
        Array.from(mediumChoose.children).forEach(field => {
            field.addEventListener('click', (evt) => {
                if (field.value && typeof + field.value === 'number' && !isNaN(+field.value)) {
                    if (field.id === 'height') {
                        calcResult.height = field.value;
                    } else if (field.id === 'weight') {
                        calcResult.weight = field.value;
                    } else {
                        calcResult.age = field.value;
                    }
                }
            });
        });
    }

    function getActivity() {
        bigChoose.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('calculating__choose-item')) {
                calcResult.activity = evt.target.id;
            }
        });
    }


    calc.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('calculating__choose-item')) {
            console.log(calcResult)
        }


    });

});