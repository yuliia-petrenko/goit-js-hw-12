import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';

const searchForm = document.querySelector('.img-form');
const inputForm = document.querySelector('.img-inp');
const btnForm = document.querySelector('.img-btn');
const loaderForm = document.querySelector('.loader');
const galleryForm = document.querySelector('.gallery');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41930626-f2ac102ea6260ef01eb19ab27';

const queryParams = {
  query: '',
  page: 1,
  maxPage: 0,
  pageSize: 40,
};
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = inputForm.value.trim();
  galleryForm.innerHTML = '';

  if (!query) {
    createMessage(
      `The search field can't be empty! Please, enter your request!`
    );
    return;
  }

  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
  function fetchImages(url) {
    showLoader(true);
    return fetch(url).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    });
  }
  function createMessage(message) {
    iziToast.show({
      message: message,
      messageColor: '#FAFAFB',
      messageSize: '16px',
      position: 'topRight',
      backgroundColor: '#EF4040',
      close: false,
      closeOnClick: true,
      class: 'error-svg',
      icon: 'error-svg',
      maxWidth: '432',
      maxHeight: '88',
    });
  }

  fetchImages(url)
    .then(data => {
      if (data.hits.length === 0) {
        createMessage(
          `Sorry, there are no images matching your search query. Please, try again!`
        );
        showLoader(false);
      }
      galleryForm.innerHTML = createMarkup(data.hits);
      showLoader(false);
      let simplyGallery = new SimpleLightbox('.gallery-item a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      searchForm.reset();
    })
    .catch(error => console.error(error));
});

function createMarkup(value) {
  return value
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
    <p class="gallery-item">Likes: ${likes} Views: ${views} Comments: ${comments} Downloads: ${downloads}</p>
  </a>
</li>`;
      }
    )
    .join('');
}

function showLoader(state = true) {
  loaderForm.style.display = !state ? 'none' : 'inline-block';
  btnForm.disabled = state;
}
