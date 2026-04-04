import { useEffect, useState } from 'react'
import styles from './SearchBar.module.css'

// Création du composant SearchBar qui va afficher la barre de recherche pour taper le nom d'une ville
function SearchBar({onSearch, villeRecherchee}) {
    const [ville, setVille] = useState("")

    function handleChange(event) {
        // On récupère la valeur de l'input et met à jour le state ville
        setVille(event.target.value)
    }

    // La fonction déclencheur qui va envoyer le nom de la ville tapée à l'App qui va faire appel à l'API
    function handleSubmit() {
        onSearch(ville)
    }

    // Fonction pour lancer la recherche par pression sur la touche Entrée du clavier
    function keySearch(e) {
        if (e.key === "Enter") {
            handleSubmit()
        }
    }

    useEffect(() => {
        if (villeRecherchee === "") {
            setVille("")
        }
    }, [villeRecherchee])

    return (
        <div className={styles.searchBar}>
            {/* L'input dans lequel on entre la ville recherchée et qui va exécuter le fonction keySearch sur l'évènement onKeyDown */}
            <input onKeyDown={keySearch}
                type="text"
                placeholder="Rechercher une ville..."
                value={ville}
                onChange={handleChange}
                className={styles.input}
            />
            {/* Le bouton de recherche qui va lancer la fonction handleSubmit sur l'évènement onClick */}
            <button onClick={handleSubmit} className={styles.button}>
                Rechercher
            </button>
        </div>
    )
}

export default SearchBar