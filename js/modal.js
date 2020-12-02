'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelectorAll('[data-modal]'), 
          modal =  document.querySelector('.modal'),
          close = document.querySelector('.modal__close'),
          visibility = window.getComputedStyle(modal).display;
    

    btn.forEach(button => {
        if (!button.classList.contains('btn_min')) {
            button.addEventListener('click', (evt) => {
                openModal();
            });
        }
    });

    function openModal() {
        if (visibility === 'none') {
            modal.style.display = 'block';
        }
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    close.addEventListener('click', closeModal);

    modal.addEventListener('click', (evt) => {
        if (evt.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);


    //Функционал показа модального окна при скролле до самого конца страницы сайта + удаление обработчика события скролл, чтобы не показывать повторно модальное окно при достижении низа страницы
    window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
});
