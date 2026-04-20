// Récupération des données météo via l'API Open-Meteo
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search"
const METEO_URL = "https://api.open-meteo.com/v1/forecast"

// Fonction pour la liste de suggestions de villes
export async function getCitySuggestions(ville) {
    // On ne cherche que si l'utilisateur a saisi au moins 3 caractères
    if (ville.trim().length < 3) return []

    const response = await fetch(
        `${GEO_URL}?name=${ville}&count=5&language=fr&format=json`
    )
    const data = await response.json()
    return data.results || []
}

// Etape 1 - Convertir le nom de ville en coordonnées
export async function getCoordinates(ville) {
    // On questionne l'API pour qu'elle fournisse les coordonnées de la ville recherchée
    const response = await fetch(
        `${GEO_URL}?name=${ville}&count=1&language=fr&format=json`
    )
    const data = await response.json()

    if (!data.results ||data.results.length === 0) {
        // Si la ville n'existe pas
        throw new Error("Ville introuvable")
        // throw interrompt l'exécution de la fonction et renvoie l'erreur au bloc catch de App.jsx pour afficher le message d'erreur
    }

    const {latitude, longitude, name, country} = data.results[0]
    return {latitude, longitude, name, country}
}

// Etape 2 - Récupérer la météo avec les coordonées
export async function getMeteo(latitude, longitude) {
    // On questionne l'API pour qu'elle fournisse les info météo de la ville ayant les coordonnées renseignées
    const response = await fetch(
        `${METEO_URL}?latitude=${latitude}&longitude=${longitude}`
        + `&current=temperature_2m,apparent_temperature,windspeed_10m,winddirection_10m,relativehumidity_2m,weathercode,precipitation_probability`
        + `&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_mean,sunrise,sunset`
        + `&hourly=weathercode,temperature_2m,precipitation_probability`
        + `&timezone=auto`
    )
    const data = await response.json()
    return {
        // On retourne un objet avec deux types de données : les données actuelles et les prévisions sur 7 jours
        current: data.current,
        daily: data.daily,
        hourly: data.hourly
    }
}