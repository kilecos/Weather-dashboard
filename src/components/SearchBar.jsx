import { useEffect, useState, useRef } from 'react'
import styles from './SearchBar.module.css'

// Création du composant SearchBar qui va afficher la barre de recherche pour taper le nom d'une ville
function SearchBar({onSearch, villeRecherchee}) {
    const [ville, setVille] = useState("")
    // Etat pour gérer l'affichage dynamique (classe CSS et placeholder) en cas d'erreur (recherche à vide)
    const [isError, setIsError] = useState(false)
    // Ref pour accéder directement au DOM de l'input
    const inputRef = useRef(null)

    function handleChange(event) {
        // On récupère la valeur de l'input et met à jour le state ville
        setVille(event.target.value)
        // Si on était en erreur, on enlève celle-ci dès que l'utilisateur tape une lettre
        if (isError) {
            setIsError(false)
        }
    }

    // La fonction déclencheur qui va envoyer le nom de la ville tapée à l'App qui va faire appel à l'API
    function handleSubmit() {
        // Empêche les recherches vides ou composées uniquement d'espaces vides
        if (ville.trim() === "") {
            setIsError(true)
            return
        }
        setIsError(false)
        onSearch(ville)
        // On force la perte de focus sur l'input, cela va replier le clavier sur mobile automatiquement après validation
        inputRef.current.blur()
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
                ref = {inputRef} // Liaison de la ref pour manipuler l'input (focus/blur)
                type="text"
                // Placeholder dynamique si erreur ou non
                placeholder={isError ? "Veuillez entrer une ville" : "Rechercher une ville..."}
                value={ville}
                onChange={handleChange}
                // Application conditionnelle de la classe CSS si erreur dans la recherche
                className={`${styles.input} ${isError ? styles.inputError : ''}`}
            />
            {/* Le bouton de recherche qui va lancer la fonction handleSubmit sur l'évènement onClick */}
            <button onClick={handleSubmit} className={styles.button}>
                Rechercher
            </button>
        </div>
    )
}

export default SearchBar