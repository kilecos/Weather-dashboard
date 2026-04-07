import styles from './HourlyForecast.module.css'
import { getWeatherInfo } from '../utils/weatherUtils'

function HourlyForecast({hourlyForecast}) {
    if (!hourlyForecast) return null

    // 1. On défini la "prochaine heure pile" qui sera le point de départ du tableau à afficher
    const nextHour = new Date()
    nextHour.setHours(nextHour.getHours() +1, 0, 0, 0)

    // 2. On cherche l'index de l'heure actuelle dans le tableau time
    // On utilise ensuite new Date(t) pour comparer des objets dates réels
    const departIndex = hourlyForecast.time.findIndex(t => new Date(t) >= nextHour)

    // Si on ne trouve rien, on part de l'index 0, sinon on prend l'index trouvé
    const debut = departIndex === -1 ? 0 : departIndex

    // 3. On découpe les tableaux de données pour n'avoir que celles correspondant au 24 prochaines heures
    const hours24 = hourlyForecast.time.slice(debut, debut + 24)
    const temps24 = hourlyForecast.temperature_2m.slice(debut, debut + 24)
    const codes24 = hourlyForecast.weathercode.slice(debut, debut + 24) 

    return (
        <div className={styles.hourlyForecast}>
            <div className={styles.grid}>
                {/* On parcours le tableau des dates pour générer un bloc d'affichage par heure (24h au total) */}
                {hours24.map((hour,index) => (
                    <div key={index} className={styles.hours}>
                        {/* - "new Date(date)" convertit la chaine de caractère fournie par l'API en objet Date JavaScript
                        - ".toLocale.TimeString('fr-FR')" formate l'heure' en français
                        - "{hour: '2-digit', minute: '2-digit'}" pour affichage en format "heure : minute" */}
                        <span className={styles.hour}>{new Date(hour).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className={styles.emoji}>{getWeatherInfo(codes24[index]).emoji}</span>
                        {/* Affiche la temparature */}
                        <span>{temps24[index]}°</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HourlyForecast