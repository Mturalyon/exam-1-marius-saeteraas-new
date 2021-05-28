const tequilaContainer = document.querySelector(".recipe_tequila-container");           //targeting each section for each category
const vodkaContainer = document.querySelector(".recipe_vodka-container");
const rumContainer = document.querySelector(".recipe_rum-container");

const url = "https://saeteraas.one/home-bar/wp-json/wp/v2/posts?per_page=100&_embed";   //calling the url

async function callApi() {

    try {
        const response = await fetch(url);                                              //catching JSON format through URL
        const json = await response.json();

        console.log(json);
        tequilaContainer.innerHTML = '';                                                //resetting all containers
        vodkaContainer.innerHTML = '';
        rumContainer.innerHTML = '';

        createHtml(json);                                                                //a function to create HTML
    }
    catch (error) {                                                                     //error display on all containers
        tequilaContainer.innerHTML = `
                                        <div class="error-container">
                                            <div>
                                                <i class="fas fa-exclamation-circle fa-3x"></i>
                                                <h3>WOOPS! There seems to be an error</h3>
                                            </div>
                                        </div>`;
        vodkaContainer.innerHTML = `
                                        <div class="error-container">
                                            <div>
                                                <i class="fas fa-exclamation-circle fa-3x"></i>
                                                <h3>WOOPS! There seems to be an error</h3>
                                            </div>
                                        </div>`;
        rumContainer.innerHTML = `
                                        <div class="error-container">
                                            <div>
                                                <i class="fas fa-exclamation-circle fa-3x"></i>
                                                <h3>WOOPS! There seems to be an error</h3>
                                            </div>
                                        </div>`;
    }

};

callApi();

function createHtml(json) {

    for (let i = 0; i < json.length; i++) {                                                 //looping and targeting different types through tags, then displaying it in correct container
        //Tequila
        if (json[i].tags[0] === 3) {
            tequilaContainer.innerHTML += `
            <a href="recipe-specific.html?id=${json[i].id}" class="recipe-anchor">
                <div class="recipe-card">
                    <img src="${json[i]._embedded["wp:featuredmedia"][0].source_url}" alt="" class="recipe-picture">
                    <div class="card-info">
                        <h3>${json[i].title.rendered}</h3>
                    </div>
                </div>
            </a>`;
        };
        //Vodka
        if (json[i].tags[0] === 5) {
            vodkaContainer.innerHTML += `
            <a href="recipe-specific.html?id=${json[i].id}" class="recipe-anchor">
                <div class="recipe-card">
                    <img src="${json[i]._embedded["wp:featuredmedia"][0].source_url}" alt="" class="recipe-picture">
                    <div class="card-info">
                        <h3>${json[i].title.rendered}</h3>
                    </div>
                </div>
            </a>`;
        };
        //Rum
        if (json[i].tags[0] === 6) {
            rumContainer.innerHTML += `
            <a href="recipe-specific.html?id=${json[i].id}" class="recipe-anchor">
                <div class="recipe-card">
                    <img src="${json[i]._embedded["wp:featuredmedia"][0].source_url}" alt="" class="recipe-picture">
                    <div class="card-info">
                        <h3>${json[i].title.rendered}</h3>
                    </div>
                </div>
            </a>`;
        };
    };
};

