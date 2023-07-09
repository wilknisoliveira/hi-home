import {GoogleMaps} from "../models/GoogleMaps.js"

const apiPointUrl = 'http://localhost:8080/points'

const saveBtn = document.querySelector('input#save-btn')
const changes = document.querySelector('div#map')
const nameInput = document.querySelector('input#name')
const attention = document.querySelector('div#attention')
const showChanges = document.querySelector('div#changes')
const deleteBtn = document.querySelector('input#delete-btn')
const newPointBtn = document.querySelector('input#new-point-btn')
const explorerDiv = document.querySelector('div#explorer')

saveBtn.addEventListener('click', function (){
    save(currentPoint)
})
changes.addEventListener('click', function(){
    deleteMarker(true)
})
nameInput.addEventListener('change', upAvailable)
deleteBtn.addEventListener('click', function(){
    deletePoint(currentPoint)
})
newPointBtn.addEventListener('click', newPoint)

let updateAvailable = false
let currentPoint

const googleMaps = new GoogleMaps(document.querySelector('div#map'));

(async ()=>{
    await googleMaps.initWait()

    updateExplorer()
})()

function deleteMarker(fromMap){
    if(fromMap == true)
        updateAvailable = true
    else
        googleMaps.deleteMarker()

}

function upAvailable(){
    
    showChanges.style.display = "flex"
    updateAvailable = true
}

function save(currentPoint){
    const name = nameInput.value
    if(updateAvailable == true){
        if(name != ""){
            let point = {
                id: currentPoint,
                name: name,
                lat: googleMaps.currentMarker.position.h,
                lng: googleMaps.currentMarker.position.j
            }

            update(point)

            reloadExplorer()
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
}

async function deletePoint(pointId){
    const response = await fetch(`${apiPointUrl}/${pointId}`, {
        method: "DELETE"
    })
    updateExplorer()
    deleteMarker(false)
}

function newPoint(){
    window.location.href = "http://localhost:3000"
}

function reloadExplorer(){
    window.location.href = "http://localhost:3000/explorer"
}

function getAllPoints(points){
    const newDiv = []
    for (let i = points.length-1, j = 0; i>0; i--, j++){
        newDiv.push(document.createElement("div"))

        newDiv[j].innerHTML = points[i].name
        newDiv[j].classList.add('point-div')
        newDiv[j].addEventListener('click', function(){
            selectPoint(points[i], newDiv[j])
        })
        explorerDiv.appendChild(newDiv[j])
    }
    selectDiv(newDiv[0])
}

async function readAll(){
    const response = await fetch(`${apiPointUrl}?cache=${Date.now()}`, {
        headers: {
            'Cache-Control' : 'no-cache'
        }
    })
    return await response.json()
}

function selectPoint(point, newDiv){
    googleMaps.marker(point)
    selectDiv(newDiv)
    deleteMarker(false)
    currentPoint = point.id
    showChanges.style.display = "None"
}

function selectDiv(newDiv){
    let childExplorerDiv = explorerDiv.querySelectorAll('div')

    for(let i = 0; i< childExplorerDiv.length; i++){
        childExplorerDiv[i].style.borderColor = "#58af9c"
    }
    newDiv.style.borderColor = "red"
}

async function updateExplorer(){
    explorerDiv.innerHTML = ""
    const points =  await readAll()
    
    if(points != null){
        getAllPoints(points)
        googleMaps.marker(points[points.length-1])
        currentPoint = points[points.length-1].id
    }
}
