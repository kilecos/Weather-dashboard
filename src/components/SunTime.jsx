import styles from './SunTime.module.css'
import {getMeteo} from '../services/weatherService'

// On passe forecast (qui contient les données daily) en prop
function SunTime({forecast}) {
    // S'il n'y a pas de prévisions, rien ne s'affiche
    if (!forecast || !forecast.sunrise || !forecast.sunset) return null
    // L'API renvoie "2026-04-20T05:42"
    // On coupe à partir du "T" pour garder uniquement l'heure
    const heurelever = forecast.sunrise[0].split("T")[1]
    const heurecoucher = forecast.sunset[0].split("T")[1]

    return (
        <div className={styles.card}>
            <div className={styles.sun}>
                <span className={styles.emoji}>🌅</span>
                <span className={styles.sunTitle}>Lever du soleil</span>
                {/* On affiche directement la chaîne coupée déja au format HH:mm */}
                <span className={styles.sunHour}>{heurelever}</span>
            </div>
            <div className={styles.sun}>
                <span className={styles.emoji}>🌇</span>
                <span className={styles.sunTitle}>Coucher du soleil</span>
                {/* On affiche directement la chaîne coupée déja au format HH:mm */}
                <span className={styles.sunHour}>{heurecoucher}</span>
            </div>
        </div>
    )
}

export default SunTime