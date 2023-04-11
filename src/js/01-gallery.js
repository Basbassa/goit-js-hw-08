import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');
let activeIndex = 0;

const createGalleryItem = ({ preview, original, description }) =>
  `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;

const galleryMarkup = galleryItems.map(createGalleryItem).join('');
galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

galleryList.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();

  const isGalleryImageEl = event.target.classList.contains('gallery__image');
  if (!isGalleryImageEl) {
    return;
  }

  const sourceUrl = event.target.dataset.source;

  activeIndex = galleryItems.findIndex(item => item.original === sourceUrl);

  const instance = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    closeText: 'X',
    nav: true,
    spinner: true,
    disableScroll: false,
    blockScroll: true,
    animateSlide: true,
    history: true,
  });

  instance.open(activeIndex);

  // funkcja obsługi klawisza ESC
  function handleKeyDown(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }

  // dodanie obsługi klawisza ESC
  window.addEventListener('keydown', handleKeyDown);

  // usunięcie obsługi klawisza ESC po zamknięciu lightboxa
  instance.events.on('closed', () => {
    window.removeEventListener('keydown', handleKeyDown);
  });
}
