import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';
const refs = {
  form: document.querySelector('.img-form'),
  inputForm: document.querySelector('.img-inp'),
  btnForm: document.querySelector('.img-btn'),
  galleryForm: document.querySelector('.gallery'),
  loaderForm: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-btn'),
};

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41930626-f2ac102ea6260ef01eb19ab27';

const simplyGallery = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const hiddenClass = 'is-hidden';
const page = 1;
const query = '';
const maxPage = 0;

refs.form.addEventListener('submit', searchForm);

async function searchForm(event) {
  event.preventDefault();
  refs.galleryForm.innerHTML = '';
  showLoader(true);
  page = 1;
  refs.loadMoreBtn.classList.add(hiddenClass);
  query = refs.form.query.value.trim();

  if (!query) {
    showLoader(false);
    createMessage(
      `The search field can't be empty! Please, enter your request!`
    );
    return;
  }
  try {
    const data = await fetchImages(query);

    maxPage = Math.ceil(data.totalHits / 40);

    createMarkup(data.hits, refs.galleryForm);

    if (data.hits.length > 0) {
      refs.loadMoreBtn.classList.remove(hiddenClass);
      refs.loadMoreBtn.addEventListener('click', onLoadMore);
    } else {
      refs.loadMoreBtn.classList.add(hiddenClass);
      createMessage(
        `Sorry, there are no images matching your search query. Please, try again!`
      );
    }
  } catch (error) {
    createMessage(`We're sorry, but you've reached the end of search results.`);
  } finally {
    showLoader(false);
    refs.form.reset();
    if (page === maxPage) {
      refs.loadMoreBtn.classList.add(hiddenClass);
    }
  }
}

function createMessage(message) {
  iziToast.show({
    class: 'error-svg',
    position: 'topRight',
    icon: 'error-svg',
    message: message,
    maxWidth: '432',
    messageColor: '#fff',
    messageSize: '16px',
    backgroundColor: '#EF4040',
    close: false,
    closeOnClick: true,
  });
}
async function onLoadMore() {
  page += 1;
  try {
    showLoader(true);
    refs.loadMoreBtn.classList.add(hiddenClass);
    const { hits } = await fetchImages(query, page);
    createMarkup(hits);
    simplyGallery.refresh();
    refs.loadMoreBtn.classList.remove1(hiddenClass);
  } catch (error) {
    createMessage(`We're sorry, but you've reached the end of search results.`);
  } finally {
    showLoader(false);
    if (page === maxPage) {
      refs.loadMoreBtn.classList.add(hiddenClass);
    }
  }
}
async function fetchImages(query, page = 1) {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: page,
    },
  });
  return response.data;
}

function createMarkup(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
       <li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
    <p class="gallery-item">Likes: ${likes} Views: ${views} Comments: ${comments} Downloads: ${downloads}</p>
  </a>
</li>`
    )
    .join('');
  refs.galleryForm.insertAdjacentHTML('beforeend', markup);
  simplyGallery.refresh();
}

function showLoader(state = true) {
  refs.loaderForm.style.display = !state ? 'none' : 'inline-block';
  refs.btnForm.disabled = state;
}
