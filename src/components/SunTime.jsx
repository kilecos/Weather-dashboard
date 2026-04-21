import styles from './SunTime.module.css'
import {getMeteo} from '../services/weatherService'

// On passe forecast (qui contient les données daily) en prop
function SunTime({forecast, meteo}) {
    // S'il n'y a pas de prévisions, rien ne s'affiche
    if (!meteo || !forecast || !forecast.sunrise || !forecast.sunset || !forecast.daylight_duration) return null
    // L'API renvoie "2026-04-20T05:42"
    // On cible l'élément à l'index [0] des tableaux sunrise et sunset, élément qui représente le jour en cours
    // On utilise .split("T") pour obtenir un tableau ["2026-04-20", "05:42"] pour l'on récupère uniquement l'heure avec [1] (le second élement du tableau)
    const heureLever = forecast.sunrise[0].split("T")[1]
    const heureCoucher = forecast.sunset[0].split("T")[1]

    // ---- Affichage d'une courbe du cycle du soleil ---- //
    // Conversion des heures de lever, coucher du soleil et actuelle en minutes
    // On coupe de nouveau avec .split pour obtenir un nouveau tableau ["heure", "minutes"]
    // Puis avec Number() on transforme chaque élément du tableau en nombre pour pouvoir effectuer le calcul
    const minLever = (Number(heureLever.split(":")[0]) * 60) + Number(heureLever.split(":")[1])
    const minCoucher = (Number(heureCoucher.split(":")[0]) * 60) + Number(heureCoucher.split(":")[1])
    const heure = meteo.time.split("T")[1]
    const minActuel = (Number(heure.split(":")[0] * 60)) + Number(heure.split(":")[1])
    // Calcul pour donner la progression du soleil à l'heure actuelle sur la courbe définie entre l'heure du lever et l'heure du coucher du soleil
    const dayRatio = (minActuel - minLever) / (forecast.daylight_duration[0] / 60)
    // Calcul des coordonnées de notre soleil sur la courbe
    const coordX = dayRatio *200
    const coordY = ((1 - dayRatio)**2 * 50) + (2 * (1 - dayRatio) * dayRatio * (-30)) + (dayRatio**2 * 50)

    return (
        <div className={styles.card}>
            {/* On affiche une courbe représentant le cycle du soleil */}
            <svg className={styles.courbeContainer} viewBox='-20 -10 240 60'>
                {/* La forme de la courbe (ici courbe de Bézier) */}
                <path className={styles.courbeFond} d='M 0 50 Q 100 -30 200 50' fill='none'/>
                <path className={styles.courbePassee} d='M 0 50 Q 100 -30 200 50' fill='none' style={{'--offset': 210 - (dayRatio * 210)}}/>
                {/* La "ligne d'horizon" en bas de la courbe */}
                <line x1="-20" y1="50" x2="220" y2="50"/>
                {/* Le cercle représentant le soleil */}
                {dayRatio >= 0 && dayRatio <= 1 && (
                    <g> {/* On regroupe avec le balise <g> les deux élément SVG circle */}
                        {/* Le "Halo" lumineux */}
                        <circle cx={coordX} cy={coordY} r="8" style={{filter: 'blur(3px)'}}/>
                        {/* Le cercle représentant le soleil */}
                        <circle cx={coordX} cy={coordY} r="5"/>
                    </g>
                )}
            </svg>
            <div className={styles.hourContainer}>
                <div className={styles.sun}>
                    <span className={styles.sunTitle}>Lever du soleil</span>
                    {/* On affiche directement la chaîne coupée déja au format HH:mm */}
                    <span className={styles.sunHour}>{heureLever}</span>
                </div>
                <div className={styles.sun}>
                    <span className={styles.sunTitle}>Coucher du soleil</span>
                    {/* On affiche directement la chaîne coupée déja au format HH:mm */}
                    <span className={styles.sunHour}>{heureCoucher}</span>
                </div>
            </div>
        </div>
    )
}

export default SunTime