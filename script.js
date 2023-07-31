const apiKey = 'pmjVv7oZnkh-aqwbxl5adRYsCU1tM0Rj4CYvKtyI3xY';

const searchForm = document.querySelector('form');
const input = document.querySelector('.search-input');
const imageContainer = document.querySelector('.image-container');
const loadmoreBtn = document.querySelector('.loadmore');
const icon = document.querySelector('.icon');
let page = 1;



const fetchImages = async function (query, pageNo) {
    try {
        if (page === 1) {
            imageContainer.innerHTML = "";
        }
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${apiKey}`
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if(data.results.length > 0){
        data.results.forEach(element => {
            // creating image div
            const imgElement = document.createElement('div');
            imgElement.classList.add('photos')
            imgElement.innerHTML = `<img src="${element.urls.regular}"></>`;

            // creating image overlay
            const overlayElement = document.createElement('div');
            overlayElement.innerHTML = `<h3>${element.alt_description}</h3>`;
            overlayElement.classList.add('overlay');

            imgElement.appendChild(overlayElement);
            imageContainer.appendChild(imgElement);
        });

        if (data.total_pages === page) {
            loadmoreBtn.style.display = "none";
        }
        else {
            loadmoreBtn.style.display = "block";
        }
    }else{
        imageContainer.innerHTML = `<h2>No Image Found....</h2>`
        if(loadmoreBtn.style.display == "block"){
            loadmoreBtn.style.display == "none";
        }
    }
    } catch (error) {
        imageContainer.innerHTML = `<h2>Failed To Fetch Your Query</h2>`;
        if(loadmoreBtn.style.display == "block"){
            loadmoreBtn.style.display == "none";
        }
    }
}
// Give results on enter
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = input.value.trim();
    if (inputValue !== '') {
        fetchImages(inputValue, page);
    }
    else {
        imageContainer.innerHTML = `<h2>Please enter a search query</h2>`;
        if(loadmoreBtn.style.display == "block"){
            loadmoreBtn.style.display == "none";
        }
    }
});

// give results on click the search button
icon.addEventListener('click', (e) => {
    e.preventDefault();
    const inputValue = input.value.trim();
    if (inputValue !== '') {
        fetchImages(inputValue, page);
    }
    else {
        imageContainer.innerHTML = `<h2>Please enter a search query</h2>`;
        if (loadmoreBtn.style.display == "block") {
            loadmoreBtn.style.display == "none";
        }
    }
});

loadmoreBtn.addEventListener('click', () => {
    fetchImages(input.value.trim(), ++page);
});
