import Notiflix from 'notiflix';
import axios from 'axios';
const apiKey = '35982674-1fa4ab59d755be2b53ee72fb5';
let pages = 1;
const loadMore = document.getElementById('load-more');
const cardList = document.getElementsByClassName('card-list');
const input = document.getElementById('input');
const search = document.getElementById('search');
let counter = 1;
loadMore.classList.add('hidden');
search.addEventListener('click', event => {
  event.preventDefault();
  pages = 1;
  cardList[0].innerHTML = '';
  getElemets();
  search.disabled=true
});
loadMore.addEventListener('click', () => {
  pages++;
  getElemets();
});
 
async function getElemets() {
  const searchingValue = input.value.replace(/\s/g, '+');
  const api = `https://pixabay.com/api/?key=${apiKey}&q=${searchingValue}&image_type=photo&pretty=true&safesearch=true&orientation=orientation&lang=en&page=${pages}&per_page=40`;
  const response = await axios.get(api);
  const data = response.data;
  let count = data.hits.length;
  console.log(count);
  if (data.totalHits === 0) {
    loadMore.classList.remove('shown');
    loadMore.classList.add('hidden');
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  if (input.value.length === 0) {
    loadMore.classList.remove('shown');
    loadMore.classList.add('hidden');
    Notiflix.Notify.warning('Type something');
    return;
  }
  loadMore.classList.remove('hidden');
  loadMore.classList.add('shown');
  if (count< 40) {
    loadMore.classList.remove('shown');
    loadMore.classList.add('hidden');
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
  }


  console.log(response);
  console.log(data);
  const cardsHtml = data.hits
    .map(hit => {
      return `<li><div class="photo-card">
              <img src="${hit.webformatURL}" class="image" alt="" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  ${hit.likes}
                  <b>Likes</b>
                </p>
                <p class="info-item">
                  ${hit.views}
                  <b>Views</b>
                </p>
                <p class="info-item">
                  ${hit.comments}
                  <b>Comments</b>
                </p>
                <p class="info-item">
                  ${hit.downloads}
                  <b>Downloads</b>
                </p>
              </div>
            </div></li>`;
    })
    .join('');

  cardList[0].insertAdjacentHTML('beforeend', cardsHtml);
}
