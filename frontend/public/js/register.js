import { GoogleMaps } from "../models/GoogleMaps.js"

const apiPointUrl = 'http://localhost:8080/points'

const saveBtn = document.querySelector('input#save-btn')
const nameInput = document.querySelector('input#name')
const explorerBtn = document.querySelector('input#explorer-btn')
const attention = document.querySelector('div#attention')
const mapDiv = document.querySelector('div#map')

saveBtn.addEventListener('click', save)
explorerBtn.addEventListener('click', explorerPage)
mapDiv.addEventListener('click', mapMarked)

let lastMarker = false
const googleMaps = new GoogleMaps(document.querySelector('#map'))

googleMaps.initWait()

function mapMarked(){
    lastMarker = true
}

async function save(){
    let name = nameInput.value

    
    if(name != "" && lastMarker){
        let point = {
            name: name,
            lat: googleMaps.currentMarker.position.h,
            lng: googleMaps.currentMarker.position.j
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
}

function explorerPage(){
    window.location.href = "http://localhost:3000/explorer"
}




