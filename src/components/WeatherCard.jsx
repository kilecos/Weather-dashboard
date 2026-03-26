import styles from './WeatherCard.module.css'
import { getWeatherInfo } from '../utils/weatherUtils'

// Création du composant WeatherCard pour afficher la météo actuelle de la ville renseignée
function WeatherCard({meteo, localisation, isLoading, erreur}) {
    if (isLoading) {
        return (
            <div className={styles.card}>
                <div className={styles.loading}>
                    <p>Chargement en cours...</p>
                </div>
            </div>
        )
    }

    if (erreur) {
        return (
            <div className={`${styles.card} ${styles.error}`}>
                <p>❌ {erreur}</p>
            </div>
        )
    }

    // Si la météo n'existe pas encore, rien n'est affiché
    if (!meteo) return null

    const {emoji, description} = getWeatherInfo(meteo.weathercode)

    return (
        <div className={styles.card}>
            <div className={styles.location}>
                <h2>{localisation.name}</h2>
                <span>{localisation.country}</span>
            </div>

            <div className={styles.main}>
                <span className={styles.emoji}>{emoji}</span>
                <span className={styles.temperature}>{meteo.temperature_2m}°C</span>
            </div>

            <p className={styles.description}>{description}</p>

            <div className={styles.details}>
                <div className={styles.detail}>
                    <span className={styles.detailLabel}>💨 Vent</span>
                    <span className={styles.detailValue}>{meteo.windspeed_10m} km/h</span>
                </div>
                <div className={styles.detail}>
                    <span className={styles.detailLabel}>🌡️ Température Ressentie</span>
                    <span className={styles.detailValue}>{meteo.apparent_temperature}°C</span>
                </div>
                <div className={styles.detail}>
                    <span className={styles.detailLabel}>💧 Humidité</span>
                    <span className={styles.detailValue}>{meteo.relativehumidity_2m} %</span>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard