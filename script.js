'use strict';

let numberOfFilms;

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

function start() {
    numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
    while (!numberOfFilms || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
    }
}

start();
personalMovieDB.count = numberOfFilms;

function rememberMyFilms() {
    for (let i = 0; i < 2; i++) {
        let film = prompt('Один из последних просмотренных фильмов');
        let rate = prompt('На сколько его оцените?');

        if (film && rate && film.length < 50) {
            personalMovieDB.movies[film] = rate;
            console.log('Данные добавлены');
        } else {
            console.log('Введенные данные некорректны');
            i--;
        }
    }

}

rememberMyFilms();


function detectPersonalLevel() {
    if (personalMovieDB.count < 10) {
        console.log("Просмотрено довольно мало фильмов");
    } else if (personalMovieDB.count <= 30) {
        console.log("Вы классический зритель");
    } else if (personalMovieDB.count > 30) {
        console.log("Вы киноман");
    } else {
        console.log("Произошла ошибка");
    }
}

detectPersonalLevel();


function writeYourGenres() {
    for (let i = 1; i < 4 ; i++) {
        personalMovieDB.genres[i - 1] = prompt(`Ваш любимый жанр под номером ${i}`, '');
    }
}

writeYourGenres();


function showMyDB () {
    if (!personalMovieDB.privat) {
        console.log(personalMovieDB);
    }
}

showMyDB();