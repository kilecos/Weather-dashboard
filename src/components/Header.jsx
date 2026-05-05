import { useState, useEffect, useRef } from 'react'
import styles from './Header.module.css'

// Création du composant Header pour afficher le titre et la description de l'application 
function Header({title, onReset}) {
    const [isScrolled, setIsScrolled] = useState(false)
    // On stocke la hauteur du header afin de calculer précisement sa remontée au scroll
    const [headerHeight, setHeaderHeight] = useState(0)
    const headerRef = useRef(null)

    useEffect(() => {
        // On mesure la hauteur réelle du composant
        // Le "-80" agit comme un offset de sécurité (il correspond aux padding) pour que la transition soit plus fluide
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight - 80)
        }
        const handleScroll = () => {
            // On défini un seuil de 50px pour le scroll pour éviter de masquer le header sur des micro-mouvements
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    function handleReset() {
        onReset()
    }

    return (
        <header
            ref={headerRef}
            className={`${styles.header} ${isScrolled ? styles.hidden : ''}`} 
            onClick={handleReset} 
            style={{ 
                /* On applique une marge négative dynamique par rapport à la hauteur du composant 
                   On réduit ainsi l'espace réel occupé par le header dans le flux du document
                   Et on fait remonter le reste du contenu de façon fluide */
                marginTop : isScrolled ? `-${headerHeight}px` : '0'}}>
            <h1 className={styles.title}>🌤 {title}</h1>
        </header>
    )
}

export default Header