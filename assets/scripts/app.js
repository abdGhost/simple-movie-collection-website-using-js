const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
// console.log(addMovieModal);

const startAddMovieButton = document.querySelector('header button');
// const startAddMovieButton = document.querySelector('header').lastElementChild;

const backdrop = document.getElementById('backdrop');

const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');

const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;

const userInputs = addMovieModal.querySelectorAll('input');

const entryTextSection = document.getElementById('entry-text');

const deleteMovieModal = document.getElementById('delete-modal');


const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
}



const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    // listRoot.removeChild(listRoot.children[movieIndex]);
    closeMovieDeletionModal();
    updateUI();
}

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();

    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');


    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    // confirmDeletionButton.removeEventListener('click', deleteMovie.bind(null, movieId));
    cancelDeletionButton.removeEventListener('clcik', closeMovieDeletionModal);

    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId));


    // deleteMovie(movieId);
};

const renderNewMovieElement = (id, title, imageurl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageurl}" atl=${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5</p>
        </div>
    `;

    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};

// Tpggle movie Modal 
const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const closeMovieModal = () => {
    // toggleBackdrop();
    addMovieModal.classList.remove('visible');
};

// Toggle Backdorp
const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

//Back drop click handler
const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput();
};

//Cancel Movie button

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
};

const clearMovieInput = () => {
    // userInputs[0].value = '';
    for (const userInput of userInputs) {
        userInput.value = '';
    }
};

// add movie function

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === '' || imageUrlValue === '' || ratingValue === '' || +ratingValue < 1 || +ratingValue > 5) {
        alert('Please enter valid values (rating between 1 - 5)');
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler)
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);