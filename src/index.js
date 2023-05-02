import Notiflix from 'notiflix';
const apiKey='35982674-1fa4ab59d755be2b53ee72fb5'
let pages = 1
const loadMore=document.getElementById("load-more")
const cardList=document.getElementsByClassName("card-list")
const input=document.getElementById('input')
const search=document.getElementById('search') 
let counter = 1 
loadMore.classList.add("hidden")
loadMore.addEventListener("click", (event)=>{
    pages++
    event.preventDefault()
    getElemets()
})
search.addEventListener('click', (event) => {
    event.preventDefault()
    getElemets()
});
function getElemets(){
    loadMore.classList.remove("hidden")
    loadMore.classList.add("shown")
    const searchingValue=input.value.replace(/\s/g, '+');
    const api=`https://pixabay.com/api/?key=${apiKey}&q=${searchingValue}&image_type=photo&pretty=true&safesearch=true&orientation=orientation&lang=en&page=${pages}&per_page=40`
    fetch(api)
        .then(response=>response.json())
        .then((data)=>{
            if(data.total===0){
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            }
            console.log(data)
            for(let i =0; i<40; i++){
                cardList[0].insertAdjacentHTML('afterbegin', `<li><div class="photo-card">
                <img src="${data.hits[i].webformatURL}" class="image" alt="" loading="lazy" />
                <div class="info">
                  <p class="info-item">
                    ${data.hits[i].likes}
                    <b>Likes</b>
                  </p>
                  <p class="info-item">
                    ${data.hits[i].views}
                    <b>Views</b>
                  </p>
                  <p class="info-item">
                    ${data.hits[i].comments}
                    <b>Comments</b>
                  </p>
                  <p class="info-item">
                  ${data.hits[i].downloads}
                    <b>Downloads</b>
                  </p>
                </div>
              </div></li>`)
            }
        })
        .catch(oNerror=>console.log('Eror:', oNerror))
}
