const searchURL = "https://images-api.nasa.gov/search?q="
const imageContainer = document.getElementById("imageContainer")
document.getElementById("btnBuscar").addEventListener("click", imageSearch)



async function imageSearch(){
    let searchParameter = document.getElementById("inputBuscar").value
    const result = await getJSONData(searchURL + searchParameter)  
    let itemsArray = result.data.collection.items
    let itemsToAppend = ""
    console.log(itemsArray)
    for (let i = 0; i < 10; i++) {
        itemsToAppend +=
        `<div class="col-sm-4 d-flex justify-content-center">
            <div class="card" style="width: 100%; height: 600px">
                <div style="height:300px" class="container">
                    <img  src="`+ itemsArray[i].links[0].href +`" class="card-img-top" alt="...">
                </div>
                <div class="card-body overflow-auto">
                    <h5 class="card-title">`+ itemsArray[i].data[0].title +`</h5>
                    <p class="card-text">`+ itemsArray[i].data[0].description +`</p>
                </div>
                <p class="card-text">`+ itemsArray[i].data[0].date_created +`</p>
            </div>
        </div>`
    }

    imageContainer.innerHTML += itemsToAppend

}








let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
        
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}
