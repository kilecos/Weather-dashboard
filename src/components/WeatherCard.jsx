import styles from './WeatherCard.module.css'
import { getWeatherInfo } from '../utils/weatherUtils'

// Création du composant WeatherCard pour afficher la météo actuelle de la ville renseignée
function WeatherCard({meteo, localisation, isLoading, erreur}) {
    // Le message de chargement qui s'affiche lors de la recherche
    if (isLoading) {
        return (
            <div className={styles.loading}>
                <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNW5kbTc2aTYweHVtOXl6NmhicjF3eWRwempxbWcwZzY4Ym5xNmV3OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QRhtqYeEywJI4/giphy.gif" alt="GIF de chargement météo"/>
                <p>Chargement en cours...</p>
            </div>    
        )
    }

    // Le message d'erreur qui va s'afficher si la ville n'existe pas
    if (erreur) {
        return (
            <div className={`${styles.card} ${styles.error}`}>
                <p>❌ {erreur}</p>
            </div>
        )
    }

    // Si la météo n'existe pas encore, rien n'est affiché
    if (!meteo) return null

    // On récupère les données renvoyées par getWeatherInfo qui sert de traducteur au code renvoyé par l'API (voir weatherUtils.js)
    const {emoji, description} = getWeatherInfo(meteo.weathercode)

    return (
        <div className={styles.card}>
            <div className={styles.location}>
                <h2>{localisation.name}</h2>
                <span>{localisation.country}</span>
            </div>

            <div className={styles.main}>
                <span className={styles.emoji}>{emoji}</span>
                <span className={styles.temperature}>{meteo.temperature_2m}°</span>
            </div>

            <p className={styles.description}>{description}</p>

            <div className={styles.details}>
                <div className={styles.detail}>
                    <span className={styles.detailLabel}>💨 Vent</span>
                    <span className={styles.detailValue}>{meteo.windspeed_10m} km/h</span>
                </div>
                <div className={styles.detail}>
                    <span className={styles.detailLabel}>🌡️ Température Ressentie</span>
                    <span className={styles.detailValue}>{meteo.apparent_temperature}°</span>
                </div>
                <div className={styles.detail}>
                    <span className={styles.detailLabel}>💦 Humidité</span>
                    <span className={styles.detailValue}>{meteo.relativehumidity_2m} %</span>
                </div>
                <div className={styles.detail}>
                    <span className={styles.detailLabel}>💧 Précipitations</span>
                    <span className={styles.detailValue}>{meteo.precipitation_probability} %</span>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard