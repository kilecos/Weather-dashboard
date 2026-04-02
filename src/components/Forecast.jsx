import styles from './Forecast.module.css'
import { getWeatherInfo } from '../utils/weatherUtils'

// Création du composant Forecast pour afficher les prévisions météo sur 7 jours
function Forecast({forecast}) {
    // S'il n'y a pas encore de prévisions, rien ne s'affiche
    if (!forecast) return null

    return (
        <div className={styles.forecast}>
            <h3 className={styles.title}>Prévisions sur 7 jours</h3>
            <div className={styles.grid}>
                {/* On parcours le tableau des dates pour générer un bloc d'affichage par jour (7 au total) */}
                {forecast.time.map((date,index) => (
                    <div key={index} className={styles.day}>
                        {/* - "new Date(date)" convertit la chaine de caractère fournie par l'API en objet Date JavaScript
                            - ".toLocale.dateString('fr-FR')" formate la date en français
                            - "{weekday: 'long'}" affiche uniquement le jour de la semaine en entier */}
                        {index === 0 
                            ? <span> Aujourd'hui </span> 
                            : <span>{new Date(date).toLocaleDateString('fr-FR', { weekday: 'long' })}</span>
                        }
                        <span>{getWeatherInfo(forecast.weathercode[index]).emoji}</span>
                        {/* Affiche la temparature maximale */}
                        <span>{forecast.temperature_2m_max[index]}</span>
                        {/* Affiche la temparature minimale */}
                        <span>{forecast.temperature_2m_min[index]}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Forecast