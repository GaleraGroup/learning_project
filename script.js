'use strict';

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,

    start: function () {
        this.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        while (!this.count || isNaN(this.count)) {
            this.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },
    rememberMyFilms: function () {
        for (let i = 0; i < 2; i++) {
            let film = prompt('Один из последних просмотренных фильмов');
            let rate = prompt('На сколько его оцените?');
    
            if (film && rate && film.length < 50) {
                this.movies[film] = rate;
                console.log('Данные добавлены');
            } else {
                console.log('Введенные данные некорректны');
                i--;
            }
        }
    },
    detectPersonalLevel: function () {
        if (this.count < 10) {
            console.log("Просмотрено довольно мало фильмов");
        } else if (this.count <= 30) {
            console.log("Вы классический зритель");
        } else if (this.count > 30) {
            console.log("Вы киноман");
        } else {
            console.log("Произошла ошибка");
        }
    },
    writeYourGenres: function () {
        for (let i = 1; i < 4 ; i++) {
            this.genres[i - 1] = prompt( `Ваш любимый жанр под номером ${i}`, '' );
            while (!this.genres[i - 1]) {
                this.genres[i - 1] = prompt( `Ваш любимый жанр под номером ${i}`, '' );
            }
        }
        this.genres.forEach((item, i) => console.log(`Любимый жанр #${i + 1} - это ${item}`));
    },
    toggleVisibleMyDB: function () {
        if (this.privat) {
            this.privat = false;
        } else { 
            this.privat = true; 
        }
    }
};


personalMovieDB.start();
console.log(personalMovieDB);

console.log(typeof Infinity )