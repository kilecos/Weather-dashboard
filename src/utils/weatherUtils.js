export function getWeatherInfo(code) {
    // L'API Open-Meteo renvoi un nombre appelé weathercode correspondant à la météo
    // La fonction a donc le rôle de traducteur
    // Elle reçoit le code et elle retourne un objet avec emoji et description correspondant au code
    if (code === 0) return { emoji: "☀️", description: "Ciel dégagé" }
    if (code <= 2) return { emoji: "⛅", description: "Partiellement nuageux" }
    if (code === 3) return { emoji: "☁️", description: "Couvert" }
    if (code <= 49) return { emoji: "🌫️", description: "Brouillard" }
    if (code <= 59) return { emoji: "🌦️", description: "Bruine" }
    if (code <= 69) return { emoji: "🌧️", description: "Pluie" }
    if (code <= 79) return { emoji: "❄️", description: "Neige" }
    if (code <= 82) return { emoji: "🌨️", description: "Averses" }
    if (code <= 99) return { emoji: "⛈️", description: "Orage" }
    return { emoji: "🌡️", description: "Inconnu" }
}