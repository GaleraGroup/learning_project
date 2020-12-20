'use strict';

function modal() {

    // Функционал открытия/закрытия модального окна при нажатии на кнопку связи
    const btnModalOpener = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCrossBtn = document.querySelector('.modal__close');


    btnModalOpener.forEach(btn => {
        btn.addEventListener('click', () => {
            clearInterval(timerId);
            modalOpen();
        });
    });

    modal.addEventListener('click', (evt) => {
        if (evt.target === modalCrossBtn || evt.target === modal) {
            modalClose();
        }
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape' && modal.classList.contains('show')) {
            modalClose();
        }
    });

    const timerId = setTimeout(() => {
        modalOpen();
    }, 5000);

    window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }


    function modalOpen() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    function modalClose() {
        if (modal.classList.contains('show')) {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }




    // Функционал внутренних форм и взаимодействия с ними
    const formModalDialog = document.querySelectorAll('form');

    const msg = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы скоро с вами свяжемся!',
        failure: 'Ошибка'
    };


    formModalDialog.forEach(form => {
        bindPostData(form);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // Спиннер, loading
            const statusMsg = document.createElement('img');
            statusMsg.src = msg.loading;
            statusMsg.classList.add('status');
            form.insertAdjacentElement('afterend', statusMsg);

            const formData = new FormData(form);
            // const obj = {};
            // formData.forEach((value, key) => {
            //     obj[key] = value;
            // });
            //Берем formData, с помощью entries превращаем в массив массивов, затем с помощью fromEntries - в объект, после в json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(msg.success);
                    form.reset();
                    statusMsg.remove();
                }).catch(() => {
                    showThanksModal(msg.failure);
                }).finally(() => {
                    form.reset();
                });
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json');

            //request.send(JSON.stringify(obj));

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(msg.success);
            //         form.reset();
            //     } else {
            //         showThanksModal(msg.failure);
            //     }
            // });
        });
    }

    function showThanksModal(msg) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        modalOpen();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
            <div class="modal__content">
            <form action="#">
                <div class="modal__close">&times;</div>
                <div class="modal__title">${msg}</div>
            </form>
            `;

        modal.append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalClose();
        }, 2000);
    }
}

modal.exports = modal;