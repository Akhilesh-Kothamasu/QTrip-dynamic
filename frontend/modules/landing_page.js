import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let response = await fetch(config.backendEndpoint+"/cities");
    let data= await response.json();
    return data;
  }catch(error){
    return null;
  }
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container=document.createElement("div");
  container.innerHTML=`
  <img src="${image}" alt="#">
  <div class="tile col-lg-3 col-sm-4">
  <a href="pages/adventures/?city=${id}" id="${id}">
  <p>${city}</p>
  <p>${description}</p>
  </div>
  `;
  document.getElementById("data").appendChild(container);

}

export { init, fetchCities, addCityToDOM };
