const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search"
const METEO_URL = "https://api.open-meteo.com/v1/forecast"

// Etape 1 - Convertir le nom de ville en coordonnées
export async function getCoordinates(ville) {
    const response = await fetch(
        `${GEO_URL}?name=${ville}&count=1&language=fr&format=json`
    )
    const data = await response.json()

    if (!data.results ||data.results.length === 0) {
        throw new Error("Ville introuvable")
    }

    const {latitude, longitude, name, country} = data.results[0]
    return {latitude, longitude, name, country}
}

//Etape 2 - Récupérer la météo avec les coordonées
export async function getMeteo(latitude, longitude) {
    const response = await fetch(
        `${METEO_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,windspeed_10m,weathercode&timezone=auto`
    )
    const data = await response.json()
    return data.current
}