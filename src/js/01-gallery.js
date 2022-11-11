import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);
const galleryContainer = document.querySelector('.gallery');
const galleryItemsMarkup = createGalleryItems(galleryItems);

function createGalleryItems(items) {
  return items
    .map(item => {
      return `
      <div class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</div>`;
    })
    .join('');
}
galleryContainer.insertAdjacentHTML('afterbegin', galleryItemsMarkup);
galleryContainer.addEventListener('click', onImageClick);

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const modal = basicLightbox.create(
    `
     <img src="${event.target.dataset.source}">
`,
    {
      onShow: modal => {
        document.addEventListener('keydown', onPressEscape);
      },

      onClose: modal => {
        document.removeEventListener('keydown', onPressEscape);
      },
    },
  );

  modal.show();

  function onPressEscape(event) {
    if (event.code === 'Escape') {
      modal.close();
    }
  }
}
