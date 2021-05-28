const container = document.querySelector(".equipment-container");               //targeting the container for the games that will be loaded

const url = "https://saeteraas.one/home-bar/wp-json/wp/v2/posts?per_page=100&_embed";        //targeting url for products

async function callApis() {                                                     //function to call API and create html

    try {

        const response = await fetch(url);                                      //fetching url
        const json = await response.json();                                     //targeting JSON

        container.innerHTML = "";                                               //resetting container from loader

        for (let i = 0; i < json.length; i++) {                                 //looping through array items and loading them up to the container, and adding id to querystring if clicked

            if (json[i].categories[0] === 4) {                                  //making sure categories are for equipment only on this page
                container.innerHTML += `
                <a href="equipment-specific.html?id=${json[i].id}" class="recipe-anchor">
                    <div class="recipe-card">
                        <img src="${json[i]._embedded["wp:featuredmedia"][0].source_url}" alt="" class="recipe-picture">
                        <div class="card-info">
                            <h3>${json[i].title.rendered}</h3>
                        </div>
                    </div>
                </a>`;
            };
        };
    }
    catch (error) {                                                             //catching and displaying error message
        container.innerHTML = ` <div class="error-container">
                                    <div>
                                        <i class="fas fa-exclamation-circle fa-3x"></i>
                                        <h3>WOOPS! There seems to be an error</h3>
                                    </div>
                                </div>`;
    }

};

callApis();                                                                     //calling function