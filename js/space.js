const searchURL = "https://images-api.nasa.gov/search?q="
const imageContainer = document.getElementById("imageContainer")
document.getElementById("btnBuscar").addEventListener("click", imageSearch)
let imageUrl = "http://images-assets.nasa.gov/image/" 



async function imageSearch(){
    imageContainer.innerHTML = ""
    let searchParameter = document.getElementById("inputBuscar").value
    const result = await getJSONData(searchURL + searchParameter)  
    let itemsArray = result.data.collection.items
    let itemsToAppend = ""
    console.log(itemsArray)
    for (let i = 0; i < itemsArray.length ; i++) {
        if (itemsArray[i].data[0].media_type == "image") {
        itemsToAppend +=
        `<div class="col-sm-4 d-flex justify-content-center pb-4 mb-4">
            <div class="card" style="width: 100%; height: 450px;box-shadow: 1px 4px 7px #888888;">
            
            <img style="height:250px;width:400px" src="`+ itemsArray[i].links[0].href +`" class="card-img-top" alt="...">
            
                <div class="card-body overflow-auto">
                    <h5 class="card-title">`+ itemsArray[i].data[0].title +`</h5>
                    <p class="card-text">`+ itemsArray[i].data[0].description +`</p>
                </div>
                <p class="card-text">`+ itemsArray[i].data[0].date_created +`</p>
            </div>
        </div>`}
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
