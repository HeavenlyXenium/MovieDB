;'use strict';

const movieDB = {
    movies: [
        "ЛОГАН",
        "ЛИГА СПРАВЕДЛИВОСТИ",
        "ЛА-ЛА ЛЭНД",
        "ОДЕРЖИМОСТЬ",
        "СКОТТ ПЕЛЕГРИММ ПРОТИВ...",
        "БАМБЛБИ"
    ],
    deleted: []
  };

document.addEventListener('DOMContentLoaded', () => {
  
  let genre = document.querySelector(".promo__genre");
  let adv = document.querySelector(".promo__adv");
  let mainBg = document.querySelector(".promo__bg");
  const addButton = document.querySelector('form.add button');
  const inputField = document.querySelector('.adding__input');
  const favoriteCheckbox = document.querySelector('#favorite');
  const originListFilm = document.querySelector('.promo__interactive-list');
  const blankListElement = document.createElement('li');
  const deleteDiv = document.createElement('div');
  blankListElement.classList.add('promo__interactive-item');
  deleteDiv.classList.add('delete');
  blankListElement.prepend(deleteDiv);

  function createDBList(dataArray) {
    dataArray.sort();
    dataArray.forEach((dataString) => {
      originListFilm.append(constructorNewListElement(dataString));
    })
  };

  function addNewListElement(dataString) {
    for (let i = originListFilm.children.length; i > 0; i--) {                                // ПЕРЕБИРАЕМ ДЕТЕЙ ЧТОБЫ ОПРЕДЕЛИТЬ ОЧЕРЕДНОСТЬ ДОБАВЛЕНИЯ
      if (originListFilm.children[i-1].innerText < dataString) {
        originListFilm.children[i-1].after(constructorNewListElement(dataString));            // ДОБАВЛЯЕМ ЭЛЕМЕНТ ПО АЛФАВИТУ
        break;
      } else if (i == 1) {
        originListFilm.prepend(constructorNewListElement(dataString));                        // ДОБАВЛЯЕМ В САМОЕ НАЧАЛО ЕСЛИ ЭЛЕМЕНТ МЕНЬШЕ ВСЕХ ИМЕЮЩИХСЯ
        break;
      }
    }
    if (favoriteCheckbox.checked) console.log('Favorite!!')
  };

  function constructorNewListElement(dataString) {
    let newElement = blankListElement.cloneNode(true);
    newElement.setAttribute('data-fullname', dataString);
      if (dataString.length > 21) {                         // ЕСЛИ НАЗВАНИЕ БОЛЕЕ 21 СИМВОЛА УКОРАЧИВАЕМ ВЫВОД          
        dataString = dataString.slice(0,21) + '...';
      }
      newElement.prepend(dataString);
    return newElement
  };

  createDBList(movieDB.movies);

  while (adv.lastElementChild) adv.removeChild(adv.lastElementChild);

  genre.innerHTML = "ДРАМА";

  mainBg.style.background = 'url(img/bg.jpg) center center/cover no-repeat';

  addButton.addEventListener('click', addFilm);
  function addFilm (e) {
      e.preventDefault()
      let dataString = inputField.value.toUpperCase();
      if (inputField.value && inputField.value.length < 50) {
        movieDB.movies.push(dataString);
        movieDB.movies.sort();
        addNewListElement(dataString);
        addButton.form.reset();
      } else {
        console.log('Ничего не введено или название слишком длинное');
      }
  };

  originListFilm.addEventListener('click', deleteElement);
  function deleteElement(e) {
    if (e.target.className == 'delete') {
      let deleteElement = e.target.parentElement.getAttribute('data-fullname');
      console.log(deleteElement);
        if (movieDB.deleted.indexOf(deleteElement) == -1) { // ЕСЛИ ФИЛЬМ УЖЕ ДОБАВЛЕН В DELETED, ТО ИГНОРИМ ЕГО
          movieDB.deleted.push(deleteElement);
        }
        if (movieDB.movies.indexOf(deleteElement) == -1) {
          console.log('Ошибка: элемент в массиве фильмов не найден!');
        } else {
          movieDB.movies.splice(movieDB.movies.indexOf(deleteElement), 1)    // УДАЛЯЕМ ЭЛЕМЕНТ ИЗ ОСНОВНОГО МАССИВА
        }
      e.target.parentElement.remove();                                       // УДАНЯЕМ ЭЛЕМЕНТ СО СТРАНИЦЫ
    }
  }
});

