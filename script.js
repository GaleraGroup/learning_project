'use strict';

let numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?', '');
let lastWathcingFilm = prompt('Один из последних просмотренных фильмов');
let lastWatchingFilmRate = prompt('На сколько его оцените?');

let personalMovieDB = {
    count: +numberOfFilms,
    movies: {
        lastWathcingFilm: lastWatchingFilmRate
    },
    actors: {},
    genres: [],
    privat: false
}


