const container = document.querySelector(".equipment-specific-main");                       //targeting display container
const modalContainer = document.querySelector(".modal-container");                          //targeting the modal container

const queryString = document.location.search;                                               //searching through the querystring
const params = new URLSearchParams(queryString);                                            //searching through parameters of querystring
const id = params.get("id");                                                                //targeting ID in parameters taking its value

const url = "https://saeteraas.one/home-bar/wp-json/wp/v2/posts/" + id + "?per_page=100&_embed";         //targeting URL with specific ID

async function callApi() {

    try {
        const response = await fetch(url);                                                  //Fetching URL
        const json = await response.json();                                                 //Extract JSON from URL
        console.log(json);

        createHtml(json);                                                                   //Function where HTML is created

        //MODAL
        const modalImage = document.querySelector(".modal-container img")
        const modalActivator = document.querySelector(".equipment-info img");

        console.log(modalImage, modalContainer, modalActivator);


        modalActivator.addEventListener('click', () => {                                    //display flex on modal when img is clicked
            modalContainer.style.display = "flex";
        });

        modalContainer.addEventListener('click', () => {                                    //when modal container is clicked the display none
            modalContainer.style.display = "none";
        });

        modalImage.addEventListener('click', () => {                                        //preventing the said effect to happen when modal image is clicked
            event.stopPropagation();
        });

    }
    catch (error) {                                                                         //Catching and displaying if Error
        container.innerHTML = ` <div class="error-container">
                                    <div>
                                        <i class="fas fa-exclamation-circle fa-3x"></i>
                                        <h3>WOOPS! There seems to be an error</h3>
                                    </div>
                                </div>`;
    }
};

callApi()

function createHtml(details) {                                                              //Creating html
    container.innerHTML = `
    <h1>${details.title.rendered}</h1>
        <hr>
        <div class="equipment-info">
            <img src="${details._embedded["wp:featuredmedia"][0].source_url}" alt="a picture of the equipment">
            <div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde quam omnis saepe voluptatibus
                    excepturi
                    eveniet pariatur praesentium repudiandae recusandae iusto fugit quas modi repellat eaque iste, hic
                    laborum obcaecati qui illum atque! Aliquid, quasi. Dignissimos atque, illum provident incidunt odit
                    consectetur repellat cupiditate nisi magni laborum enim quaerat adipisci est quam quidem veniam
                    aspernatur ut deserunt quos quia. Iusto, sapiente autem! Suscipit cum eligendi quos minus
                    perspiciatis
                    quae doloremque, aut et aspernatur hic? Saepe praesentium sint dolores possimus distinctio quos.</p>
            </div>
        </div>`;                                                                            //creates html from JSON

    modalContainer.innerHTML = `<img src="${details._embedded["wp:featuredmedia"][0].source_url}" alt="a modal of the equipment">`; //changing picture for modal from JSON

    document.title = "HomeBar | " + details.title.rendered;                                 //Altering page title
};
