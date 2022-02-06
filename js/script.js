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
    dataArray.forEach((dataString, index) => {
      originListFilm.append(constructorNewListElement(dataString, index));
    })
  };

  function addNewListElement(dataString) {
    for (let i = originListFilm.children.length; i > 0; i--) {                                // ПЕРЕБИРАЕМ ДЕТЕЙ ЧТОБЫ ОПРЕДЕЛИТЬ ОЧЕРЕДНОСТЬ ДОБАВЛЕНИЯ
      if (originListFilm.children[i-1].innerText.toUpperCase() < dataString.toUpperCase()) {
        originListFilm.children[i-1].after(constructorNewListElement(dataString));            // ДОБАВЛЯЕМ ЭЛЕМЕНТ ПО АЛФАВИТУ
        break;
      } else if (i == 1) {
        originListFilm.prepend(constructorNewListElement(dataString));                        // ДОБАВЛЯЕМ В САМОЕ НАЧАЛО ЕСЛИ ЭЛЕМЕНТ МЕНЬШЕ ВСЕХ ИМЕЮЩИХСЯ
        break;
      }
    }
    if (favoriteCheckbox.checked) console.log('Favorite!!')
  };

  function constructorNewListElement(dataString, index) {
    let newElement = blankListElement.cloneNode(true);
    newElement.setAttribute('data-index', index);
      if (dataString.length > 21) {                         // ЕСЛИ НАЗВАНИЕ БОЛЕЕ 21 СИМВОЛА УКОРАЧИВАЕМ ВЫВОД          
        dataString = dataString.slice(0,21) + '...';
      }
      newElement.prepend(dataString.toUpperCase());
    return newElement
  };

  createDBList(movieDB.movies);

  while (adv.lastElementChild) adv.removeChild(adv.lastElementChild);

  genre.innerHTML = "ДРАМА";

  mainBg.style.background = 'url(img/bg.jpg) center center/cover no-repeat';

  addButton.addEventListener('click', addFilm);
  function addFilm (e) {
      e.preventDefault()
      if (inputField.value) {
        movieDB.movies.push(inputField.value);
        movieDB.movies.sort();
        addNewListElement(inputField.value);
        addButton.form.reset();
      }
  };

  originListFilm.addEventListener('click', deleteElement);
  function deleteElement(e) {
    if (e.target.className == 'delete') {
      let deletedElement = e.target.parentElement;
      let deletedElementIndex = deletedElement.getAttribute('data-index');
      console.log(deletedElementIndex);
      console.log(movieDB.movies[deletedElementIndex]);
        if (movieDB.deleted.indexOf(movieDB.movies[deletedElementIndex])) {
          movieDB.deleted.push(movieDB.movies[deletedElementIndex]);
        }
      delete movieDB.movies[deletedElementIndex];
      e.target.parentElement.remove();
    }
  }
});

