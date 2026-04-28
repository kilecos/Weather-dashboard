export function getWeatherInfo(code, isDay = 1) {
    // L'API Open-Meteo renvoi un nombre appelé weathercode correspondant à la météo
    // La fonction a donc le rôle de traducteur
    // Elle reçoit le code et elle retourne un objet avec emoji et description correspondant au code
    // Elle reçoit également un background correspondant au code et à afficher sur l'app
    const suffix = isDay === 1 ? "" : "-night" // On utilise un suffixe pour les fichiers images pour adapté l'image à renvoyé en fonction de s'il fait jour ou nuit
    if (code === 0) return { emoji: isDay === 1 ? "☀️" : "🌙", description: isDay === 1 ? "Ensoleillé" : "Nuit claire", background: `${import.meta.env.BASE_URL}backgrounds/bg-clear${suffix}.webp` }
    if (code <= 2) return { emoji: isDay === 1 ? "⛅" : "☁️", description: "Partiellement nuageux", background: `${import.meta.env.BASE_URL}backgrounds/bg-cloudy${suffix}.webp` }
    if (code === 3) return { emoji: "☁️", description: "Couvert", background: `${import.meta.env.BASE_URL}backgrounds/bg-cloudy${suffix}.webp` }
    if (code <= 49) return { emoji: "🌫️", description: "Brouillard", background: `${import.meta.env.BASE_URL}backgrounds/bg-foggy${suffix}.webp` }
    if (code <= 59) return { emoji: isDay === 1 ? "🌦️" : "🌧️", description: "Bruine", background: `${import.meta.env.BASE_URL}backgrounds/bg-rainy${suffix}.webp` }
    if (code <= 69) return { emoji: "🌧️", description: "Pluie", background: `${import.meta.env.BASE_URL}backgrounds/bg-rainy${suffix}.webp` }
    if (code <= 79) return { emoji: "❄️", description: "Neige", background: `${import.meta.env.BASE_URL}backgrounds/bg-snowy${suffix}.webp` }
    if (code <= 82) return { emoji: "🌧️", description: "Averses", background: `${import.meta.env.BASE_URL}backgrounds/bg-rainy${suffix}.webp` }
    if (code <= 86) return { emoji: "🌨️", description: "Averses de neige", background: `${import.meta.env.BASE_URL}backgrounds/bg-snowy${suffix}.webp` }
    if (code <= 99) return { emoji: "⛈️", description: "Orage", background: `${import.meta.env.BASE_URL}backgrounds/bg-stormy${suffix}.webp` }
    return { emoji: "🌡️", description: "Inconnu" }
}