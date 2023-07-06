let map
let lastMarker

const saveBtn = document.querySelector('input#save-btn')

saveBtn.addEventListener('click', save);

(async ()=>{
    const googleKey = await getGoogleKey();

    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
        key: googleKey, v: "beta"
        // Add other bootstrap parameters as needed, using camel case.
        // Use the 'v' parameter to indicate the version to load (alpha, beta, weekly, etc.)
    })

    initMap()
})()

async function initMap(){
    const position = {
        lat: -25.344,
        lng: 131.031
    }

    const { Map } = await google.maps.importLibrary("maps")

    map = new Map(document.querySelector('#map'), {
        zoom: 4,
        center: position,
        mapId: "DEMO_MAP_ID"
    })

    map.addListener('click', function(e){
        const clickPosition = e.latLng
        markerMarked(clickPosition)
    })
}

async function getGoogleKey(){
    const url = 'http://localhost:3000/googlekey'

    const response = await fetch(url)

    const data = await response.json()

    return data.key
}

async function markerMarked(position){
    if(lastMarker != null){
        lastMarker.setMap(null)
    }

    const { AdvancedMarkerView } = await google.maps.importLibrary("marker")

    const marker = new AdvancedMarkerView({
        map: map,
        position: position,
        title: "mock"
    })

    lastMarker = marker
}

function save(){
    console.log('save test')
}




