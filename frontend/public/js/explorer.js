import {GoogleMaps} from "../models/GoogleMaps.js"

const apiPointUrl = 'http://localhost:8080/points'

const saveBtn = document.querySelector('input#save-btn')
const changes = document.querySelector('div#map')
const nameInput = document.querySelector('input#name')
const attention = document.querySelector('div#attention')
const showChanges = document.querySelector('div#changes')
const deleteBtn = document.querySelector('div#delete-btn')

saveBtn.addEventListener('click', save)
changes.addEventListener('click', deleteMarker)
nameInput.addEventListener('change', upAvailable)

let updateAvailable = false

const googleMaps = new GoogleMaps(document.querySelector('div#map'));

(async ()=>{
    await googleMaps.initWait()
    googleMaps.marker()
})()

function deleteMarker(){
    googleMaps.deleteMarker()
    updateAvailable = true
}

function upAvailable(){
    
    showChanges.style.display = "flex"
    updateAvailable = true
}

function save(){
    const name = nameInput.value
    let lastMarker = JSON.parse(sessionStorage.getItem("position"))
    if(updateAvailable == true){
        if(name != ""){
            let point = {
                id: JSON.parse(sessionStorage.getItem("currentPoint")).id,
                name: name,
                lat: lastMarker.lat,
                lng: lastMarker.lng
            }

            update(point)

            attention.style.display = "None"
            showChanges.innerHTML = ""
        }else{
            attention.style.display = "flex"
        }

    }
}

async function update(point){
    const response = await fetch(apiPointUrl, {
        method: "PUT",
        body: JSON.stringify(point),
        headers: {
            "Content-type" : "application/json"
        }
    })
    const dataResponse = await response.json()
    sessionStorage.setItem("currentPoint", JSON.stringify(dataResponse))
}