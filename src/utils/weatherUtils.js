export function getWeatherInfo(code) {
    // L'API Open-Meteo renvoi un nombre appelé weathercode correspondant à la météo
    // La fonction a donc le rôle de traducteur
    // Elle reçoit le code et elle retourne un objet avec emoji et description correspondant au code
    // Elle reçoit également un background correspondant au code et à afficher sur l'app
    if (code === 0) return { emoji: "☀️", description: "Ciel dégagé", background: `${import.meta.env.BASE_URL}backgrounds/bg-clear.webp` }
    if (code <= 2) return { emoji: "⛅", description: "Partiellement nuageux", background: `${import.meta.env.BASE_URL}backgrounds/bg-cloudy.webp` }
    if (code === 3) return { emoji: "☁️", description: "Couvert", background: `${import.meta.env.BASE_URL}backgrounds/bg-cloudy.webp` }
    if (code <= 49) return { emoji: "🌫️", description: "Brouillard", background: `${import.meta.env.BASE_URL}backgrounds/bg-foggy.webp` }
    if (code <= 59) return { emoji: "🌦️", description: "Bruine", background: `${import.meta.env.BASE_URL}backgrounds/bg-rainy.webp` }
    if (code <= 69) return { emoji: "🌧️", description: "Pluie", background: `${import.meta.env.BASE_URL}backgrounds/bg-rainy.webp` }
    if (code <= 79) return { emoji: "❄️", description: "Neige", background: `${import.meta.env.BASE_URL}backgrounds/bg-snowy.webp` }
    if (code <= 82) return { emoji: "🌧️", description: "Averses", background: `${import.meta.env.BASE_URL}backgrounds/bg-rainy.webp` }
    if (code <= 86) return { emoji: "🌨️", description: "Averses de neige", background: `${import.meta.env.BASE_URL}backgrounds/bg-snowy.webp` }
    if (code <= 99) return { emoji: "⛈️", description: "Orage", background: `${import.meta.env.BASE_URL}backgrounds/bg-stormy.webp` }
    return { emoji: "🌡️", description: "Inconnu" }
}