import { useState } from 'react'
import styles from './SearchBar.module.css'

function SearchBar({onSearch}) {
    const [ville, setVille] = useState("")

    function handleChange(event) {
        setVille(event.target.value)
    }

    function handleSubmit() {
        onSearch(ville)
    }

    return (
        <div className={styles.searchBar}>
            <input 
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