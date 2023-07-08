export class GoogleMaps {
    constructor(mapDiv) {
        this.mapDiv = mapDiv
        this.map
        this.currentMarker
        this.lastMk
    }

    async initWait(){              
        const googleKey = await this.getGoogleKey();
    
        (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
            key: googleKey, v: "beta"
            // Add other bootstrap parameters as needed, using camel case.
            // Use the 'v' parameter to indicate the version to load (alpha, beta, weekly, etc.)
        })
        
        await this.initMap()
    }
    
    async initMap(){
        const position = {
            lat: -25.344,
            lng: 131.031
        }
    
        const { Map } = await google.maps.importLibrary("maps")

        const map = new Map(this.mapDiv, {
            zoom: 4,
            center: position,
            mapId: "DEMO_MAP_ID"
        })
    
        map.addListener('click', async function(e){
            try {
                const changes = document.querySelector('div#changes')
                changes.style.display = "flex"
            }catch{}

            const clickPosition = e.latLng;

            if(this.lastMarker != null){
                this.lastMarker.setMap(null)
            }
        
            const { AdvancedMarkerView } = await google.maps.importLibrary("marker")
        
            const marker = new AdvancedMarkerView({
                map: map,
                position: clickPosition,
                title: (Math.random() * (1000-0) + 0).toString()
            })
        
            this.lastMarker = marker

            sessionStorage.setItem("position", JSON.stringify(marker.position))
        })

        this.map = map
    }
    
    async getGoogleKey(){
        const url = 'http://localhost:3000/googlekey'
    
        const response = await fetch(url)
    
        const data = await response.json()
    
        return data.key
    }

    async marker(){
        const { AdvancedMarkerView } = await google.maps.importLibrary("marker")
        
        const nameInput = document.querySelector('input#name')
        nameInput.value = JSON.parse(sessionStorage.getItem("currentPoint")).name
        this.currentMarker = new AdvancedMarkerView({
            map: this.map,
            position: JSON.parse(sessionStorage.getItem("position")),
            title: nameInput.value
        })
    }

    deleteMarker(){
        this.currentMarker.setMap(null)
    }
}