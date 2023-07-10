import {GoogleMaps} from "../models/GoogleMaps.js"

const apiPointUrl = 'http://localhost:8080/points'
let updateAvailable = false
let currentPoint
let currentDiv
let currentPointArrayPosition

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
deleteBtn.addEventListener('click', function(){
    deletePoint(currentPoint)
})
newPointBtn.addEventListener('click', newPoint)
nameInput.addEventListener('change', upAvailable)

const googleMaps = new GoogleMaps(document.querySelector('div#map'));

(async ()=>{
    await googleMaps.initWait()

    updateExplorer()
})()

async function updateExplorer(){
    explorerDiv.innerHTML = ""
    const points =  await readAll()

    //This part is used when the update came from a reload of the page by the save button.
    //The code get the last div selected to give a feeling of continuing to the user
    let curDiv 
    let curPAP
    try{
        curDiv = sessionStorage.getItem("currentDiv")
        curPAP = sessionStorage.getItem("currentPointArrayPosition")
    }catch{}
    
    getAllPoints(points)
    if(curDiv != null){ 
        googleMaps.marker(points[curPAP])
        currentPoint = points[curPAP].id
        
        selectDiv(curDiv)

        sessionStorage.clear()
    }else{
        if(points.length > 0){
            googleMaps.marker(points[points.length-1])
            currentPoint = points[points.length-1].id
        }
    }  
}

async function readAll(){
    const response = await fetch(`${apiPointUrl}?cache=${Date.now()}`, {
        headers: {
            'Cache-Control' : 'no-cache'
        }
    })
    return await response.json()
}

function getAllPoints(points){
    const newDiv = []
    for (let i = points.length, j = 0; i>0; i--, j++){
        newDiv.push(document.createElement("div"))

        newDiv[j].innerHTML = points[i-1].name
        newDiv[j].classList.add('point-div')
        newDiv[j].addEventListener('click', function(){
            currentDiv = j
            currentPointArrayPosition = i-1
            selectPoint(points[i-1], newDiv[j])
        })
        explorerDiv.appendChild(newDiv[j])
    }
    selectDiv(newDiv[0])
    currentDiv = 0
    currentPointArrayPosition = points.length-1
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

    //This replace overload of the OOP
    if(!isNaN(newDiv))
        childExplorerDiv[newDiv].style.borderColor = "red"
    else
        newDiv.style.borderColor = "red"
}

function deleteMarker(fromMap){
    if(fromMap == true)
        updateAvailable = true
    else
        googleMaps.deleteMarker()
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

            //Notice that the page is reloaded to avoid a caching problem.
            //If we just update the explorer div, the next GET request came with cache data.
            //So we set the information of the selected point to the get when the page reload 
            sessionStorage.setItem("currentDiv", currentDiv)
            sessionStorage.setItem("currentPointArrayPosition", currentPointArrayPosition)
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

function reloadExplorer(){
    window.location.href = "http://localhost:3000/explorer"
}

async function deletePoint(pointId){
    const response = await fetch(`${apiPointUrl}/${pointId}`, {
        method: "DELETE"
    })
    updateExplorer()
    deleteMarker(false)
}

function newPoint(){
    sessionStorage.clear()
    window.location.href = "http://localhost:3000"
}

function upAvailable(){
    showChanges.style.display = "flex"
    updateAvailable = true
}


