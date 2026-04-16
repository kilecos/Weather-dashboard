import { useRef, useEffect } from 'react'
import styles from './HourlyForecast.module.css'
import { getWeatherInfo } from '../utils/weatherUtils'

function HourlyForecast({hourlyForecast, meteo}) {
    // Création d'une référence (Ref) : un "post-it" collé sur l'élément HTML
    // Va permettre de manipuler le défilement sans passer par un state
    const scrollRef = useRef(null)

    useEffect(() => {
        // el (élément) représente le conteneur HTML réel désigné par Ref
        const el = scrollRef.current
        if (el) {
            
            // La fonction qui intercepte le mouvement de la molette de la souris
            // définie avec const sous la forme d'une arrow function
            const handleWheel = (e) => {
                // e.deltaY est le mouvement vertical de la molette, si 0 on ne fait rien
                if (e.deltaY === 0) return
                
                // On empêche la page de bouger verticalement lors du scroll
                e.preventDefault() 
                
                // On converti le mouvement vertical (deltaY) en mouvement horizontal (scrollLeft)
                el.scrollLeft += e.deltaY
            }

            // On attache manuelle l'évènement
            // {passive: false} en obligatoire pour que e.preventDefault() fonctionne
            el.addEventListener('wheel', handleWheel, { passive: false })
            
            // On retire l'écouteur d'évènement si le composant est retiré ou mis à jour
            return () => el.removeEventListener('wheel', handleWheel)
        }
    }, [hourlyForecast]) // On relance si les données changent

    // Si aucune prévisions, rien ne s'affiche
    if (!hourlyForecast) return null

    // 1. On défini la "prochaine heure pile" basée sur l'heure de la ville cible
    // On crée une date à partir de meteo.time (l'heure locale fournie par l'API)
    const cityTime = new Date(meteo.time)
    const nextHour = new Date(cityTime)

    // On passe à l'heure suivante pile
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
    const precip24 = hourlyForecast.precipitation_probability.slice(debut, debut + 24) 

    return (
        <div className={styles.hourlyForecast}>
            <div className={styles.grid} ref={scrollRef}>
                {/* On parcours le tableau des dates pour générer un bloc d'affichage par heure (24h au total) */}
                {hours24.map((hour,index) => (
                    <div key={index} className={styles.hours}>
                        {/* - "new Date(date)" convertit la chaine de caractère fournie par l'API en objet Date JavaScript
                        - ".toLocale.TimeString('fr-FR')" formate l'heure' en français
                        - "{hour: '2-digit', minute: '2-digit'}" pour affichage en format "heure : minute"
                        - hour12: false force le format 24h même pour un utilisateur étranger */}
                        <span className={styles.hour}>{new Date(hour).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                        <span className={styles.emoji}>{getWeatherInfo(codes24[index]).emoji}</span>
                        {/* Affiche la température */}
                        <span>{temps24[index]}°</span>
                        {/* Affiche la probabilité de précipitions */}
                        <span>💧{precip24[index]}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HourlyForecast