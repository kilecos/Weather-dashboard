import styles from './Header.module.css'

// Création du composant Header pour afficher le titre et la description de l'application 
function Header({title, subtitle, onReset}) {

    function handleReset() {
        onReset()
    }

    return (
        <header className={styles.header} onClick={handleReset}>
            <h1 className={styles.title}>🌤 {title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
        </header>
    )
}

export default Header