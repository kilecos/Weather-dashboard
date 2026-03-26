import { useState } from 'react'
import styles from './SearchBar.module.css'

// Création du composant SearchBar qui va afficher la barre de recherche pour taper le nom d'une ville
function SearchBar({onSearch}) {
    const [ville, setVille] = useState("")

    function handleChange(event) {
        setVille(event.target.value)
    }

    function handleSubmit() {
        onSearch(ville)
    }

    function keySearch(e) {
        if (e.key === "Enter") {
            handleSubmit()
        }
    }

    return (
        <div className={styles.searchBar}>
            <input onKeyDown={keySearch}
                type="text"
                placeholder="Rechercher une ville..."
                value={ville}
                onChange={handleChange}
                className={styles.input}
            />
            <button onClick={handleSubmit} className={styles.button}>
                Rechercher
            </button>
        </div>
    )
}

export default SearchBar