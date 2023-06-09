
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city=params.get("city");
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const response = await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    const json = await response.json();
    return json;
  }catch(e){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  document.getElementById('data').textContent='';
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((ele)=>{
    const divElement = document.createElement("div");
    divElement.setAttribute("class","col-sm-6 col-lg-3 my-4")
    divElement.innerHTML=`
    <a href="detail/?adventure=${ele.id}" id=${ele.id}>
    <div class="activity-card">
    <div class="category-banner">
    <h5>${ele.category}</h5>
    </div>
    <img src="${ele.image}">
    <div class="d-flex justify-content-between align-items-center py-2" style="width: 90%">
    <div>
    <h6>${ele.name}</h6>
    <h6>Duration</h6>
    </div>
    <div>
    <h6>${ele.currency} ${ele.costPerHead}</h6>
    <h6>${ele.duration} Hours</h6>
    </div>
    </div>
    </div>
    </a>
    `
    const parentElement=document.getElementById("data");
    parentElement.append(divElement);
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter((adv) => (adv.duration >= low && adv.duration <= high));
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((adv)=>categoryList.indexOf(adv.category) > -1)
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredlist =[]
  let arr=filters["duration"].split("-")
  if(filters["category"].length>0 && filters["duration"].length>0){
    filteredlist=filterByCategory(list, filters.category)
    filteredlist=filterByDuration(filteredlist,parseInt(arr[0]),parseInt(arr[1]))
  }
  else if(filters["category"].length>0){
    filteredlist=filterByCategory(list,filters.category);
  }
  else if(filters["duration"].length>0){
  filteredlist=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
  }
  else{
    return list;
  }

  // Place holder for functionality to work in the Stubs
  return filteredlist;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList=filters["category"];
  let li=[];
  for(let i=0;i<categoryList.length;i++)
  {
    li.push(categoryList[i]);
  }
  for(let i=0;i<li.length;i++)
  {
    var div=document.createElement("div");
    div.setAttribute("class","category-filter");
    div.innerText=li[i];
    document.getElementById("category-list").append(div);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
