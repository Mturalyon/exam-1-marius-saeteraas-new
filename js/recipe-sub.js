const viewMoreContainer = document.querySelector(".view-more-container");
const displayedContainer = document.querySelector(".displayed_recipe-container");

const url = "https://saeteraas.one/home-bar/wp-json/wp/v2/posts?per_page=100&_embed";   //calling the url

async function callApi() {

    try {
        const response = await fetch(url);                                              //catching JSON format through URL
        const json = await response.json();

        displayedContainer.innerHTML = '';
        viewMoreContainer.innerHTML = '';

        createHtml(json);                                                                //a function to create HTML
    }
    catch (error) {                                                                     //error display
        displayedContainer.innerHTML = `
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
    for (let i = 0; i < 10; i++) {                                                 //looping and targeting correct category, then displaying first 10 posts on both containers
        //displayed container
        if (json[i].categories[0] === 2) {

            displayedContainer.innerHTML += `
            <a href="recipe-specific.html?id=${json[i].id}" class="recipe-anchor">
                <div class="recipe-card">
                    <img src="${json[i]._embedded["wp:featuredmedia"][0].source_url}" alt="" class="recipe-picture">
                    <div class="card-info">
                        <h3>${json[i].title.rendered}</h3>
                    </div>
                </div>
            </a>`;

            viewMoreContainer.innerHTML += `
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

//VIEW MORE
const viewMoreBtn = document.querySelector(".view-more-btn"); //targeting view more btn

viewMoreBtn.addEventListener('click', () => {                   //onlick add a class on the hidden container that has a property of display flex
    viewMoreContainer.classList.toggle("display");

    if (viewMoreBtn.innerHTML === "View More") {                //if view button has a value of View More on click it will change to View Less and vice versa
        viewMoreBtn.innerHTML = "View Less";
    } else {
        viewMoreBtn.innerHTML = "View More";
    };
});
