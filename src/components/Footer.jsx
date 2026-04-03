import styles from './Footer.module.css'
import { version } from '../../package.json'

// Création du composant Footer comprenant le copyright, un lien vers le projet sur GitHub et l'heure de la mise à jour des infos météo
function Footer({lastUpdate}) {
    return (
        <footer className={styles.footerContainer}>
            <div>
                <p>© 2026, Kilian Lecossois</p>
                <a href="https://github.com/kilecos/Weather-dashboard" target="_blank" rel="noopener noreferer">Lien vers le projet</a>
            </div>
            <div className={styles.updateContainer}>
            {/* - Si lastUpdate vaut null (lors du démarrage de l'app) rien ne s'affiche
                - Si lastUpdate n'est pas null, on affiche l'heure à laquelle l'on reçoit les données dans le format "heure : minute" */}
            {lastUpdate && <p>MAJ {lastUpdate.toLocaleDateString('fr-FR', {day : '2-digit', month : '2-digit'})} {lastUpdate.toLocaleTimeString('fr-FR', {hour : '2-digit', minute : '2-digit'})}</p>}
            <p>v.{version}</p>
            </div>
        </footer>
    )
}

export default Footer