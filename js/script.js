const slider = document.querySelector(".slider");                                           //targeting the sliders which crosses boundaries with its parent that have overflow hidden
const sliderProducts = document.querySelector(".slider_products");

const url = "https://saeteraas.one/home-bar/wp-json/wp/v2/posts?per_page=100&_embed";       //tageting URL with posts

async function callApi() {                                                                  //function with try catch error handling

    try {
        const response = await fetch(url);                                                  //extracting JSON from the URL
        const json = await response.json();

        slider.innerHTML = '';                                                              //resetting containers
        sliderProducts.innerHTML = '';

        createHtml(json);                                                                   //function that creates the HTML
    }
    catch (error) {
        slider.innerHTML = `
                                        <div class="error-container">
                                            <div>
                                                <i class="fas fa-exclamation-circle fa-3x"></i>
                                                <h3>WOOPS! There seems to be an error</h3>
                                            </div>
                                        </div>`;
        sliderProducts.innerHTML = `
                                        <div class="error-container">
                                            <div>
                                                <i class="fas fa-exclamation-circle fa-3x"></i>
                                                <h3>WOOPS! There seems to be an error</h3>
                                            </div>
                                        </div>`;
    }
};

callApi();

function createHtml(json) {                                                                 //looping through the JSON adding 4 objects on each container, separating with categories

    for (let i = 0; i < json.length; i++) {
        if (json[i].categories[0] === 2) {
            slider.innerHTML += `
            <a href="/html/recipe-specific.html?id=${json[i].id}" class="recipe-anchor">
                <div class="recipe-card">
                    <img src="${json[i]._embedded["wp:featuredmedia"][0].source_url}" alt="" class="recipe-picture">
                    <div class="card-info">
                        <h3>${json[i].title.rendered}</h3>
                    </div>
                </div>
            </a>`;
        }
        else if (json[i].categories[0] === 4) {
            sliderProducts.innerHTML += `
            <a href="/html/equipment-specific.html?id=${json[i].id}" class="recipe-anchor">
                <div class="recipe-card">
                    <img src="${json[i]._embedded["wp:featuredmedia"][0].source_url}" alt="" class="recipe-picture">
                    <div class="card-info">
                        <h3>${json[i].title.rendered}</h3>
                    </div>
                </div>
            </a>`;
        }
        else if (i === 4) {
            break;
        };
    };
};


//carousel Posts
const leftBtn = document.querySelector(".btn-left");                        //targeting btns
const rightBtn = document.querySelector(".btn-right");

let index = 0;

rightBtn.addEventListener('click', function () {                            //taken into consideration of a width of 400%, and 4 items
    index = (index < 3) ? index + 1 : 3;                                    //on click it will move the slider with transform translate, 25% at a time
    slider.style.transform = 'translate(' + index * -25 + '%)';             //right btn give - percentage, left btn give + percentage
});

leftBtn.addEventListener('click', function () {
    index = (index > 0) ? index - 1 : 0;
    slider.style.transform = 'translate(' + index * -25 + '%)';
});

//carousel Products
const leftBtnProducts = document.querySelector(".btn-left_products");       //had to do the same on both different carousels.
const rightBtnProducts = document.querySelector(".btn-right_products");

let index2 = 0;

rightBtnProducts.addEventListener('click', function () {
    index2 = (index2 < 3) ? index2 + 1 : 3;
    sliderProducts.style.transform = 'translate(' + index2 * -25 + '%)';
});

leftBtnProducts.addEventListener('click', function () {
    index2 = (index2 > 0) ? index2 - 1 : 0;
    sliderProducts.style.transform = 'translate(' + index2 * -25 + '%)';
});