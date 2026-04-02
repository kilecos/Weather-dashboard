import styles from './Footer.module.css'

// Création du composant Footer comprenant le copyright, un lien vers le projet sur GitHub et l'heure de la mise à jour des infos météo
function Footer({copy, link, lastUpdate}) {
    return (
        <footer className={styles.footerContainer}>
            <div>
                <p>{copy}</p>
                <a href="https://github.com/kilecos/Weather-dashboard" target="_blank" rel="noopener noreferer">{link}</a>
            </div>
            {/*Si lastUpdate vaut null (lors du démarrage de l'app) rien ne s'affiche
            Si lastUpdate n'est pas null, on affiche l'heure à laquelle l'on reçoit les données dans le format "heure : minute" */}
            {lastUpdate && <p>MAJ {lastUpdate.toLocaleTimeString('fr-FR', {hour : '2-digit', minute : '2-digit'})}</p>}
        </footer>
    )
}

export default Footer