import { GoogleMaps } from "../models/GoogleMaps.js"

const apiPointUrl = 'http://localhost:8080/points'

const saveBtn = document.querySelector('input#save-btn')
const nameInput = document.querySelector('input#name')
const explorerBtn = document.querySelector('input#explorer-btn')
const attention = document.querySelector('div#attention')

saveBtn.addEventListener('click', save)
explorerBtn.addEventListener('click', explorerPage);

sessionStorage.clear()

const googleMaps = new GoogleMaps(document.querySelector('#map'))

googleMaps.initWait()

async function save(){
    let lastMarker = JSON.parse(sessionStorage.getItem("position"))
    let name = nameInput.value

    if(name != "" && lastMarker != null){
        let point = {
            name: name,
            lat: lastMarker.lat,
            lng: lastMarker.lng
        }
        await create(point)
        explorerPage()
    }else
        attention.style.display = "flex"
}

async function create(point){
    const response = await fetch(apiPointUrl, {
        method: "POST",
        body: JSON.stringify(point),
        headers: {
            "Content-type" : "application/json"
        }
    })
    const dataResponse = await response.json()
    await sessionStorage.setItem("currentPoint", JSON.stringify(dataResponse))
}

function explorerPage(){
    window.location.href = "http://localhost:3000/explorer"
}




