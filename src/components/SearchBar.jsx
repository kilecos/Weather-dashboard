import { useEffect, useState, useRef } from 'react'
import { getCitySuggestions } from '../services/weatherService'
import styles from './SearchBar.module.css'

// Création du composant SearchBar qui va afficher la barre de recherche pour taper le nom d'une ville
function SearchBar({onSearch, villeRecherchee}) {
    const [ville, setVille] = useState("")
    // Etat du tableau des suggestions de villes
    const [villeSuggest, setVilleSuggest] = useState([])
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

    // On gère ici l'affichage d'une liste de suggestions de villes lors de la saisie
    useEffect(() => {
        // Si moins de 3 caractères sont tapés, on vide les suggestions et on s'arrête
        if (ville.length < 3) {
            setVilleSuggest([])
            return
        }
        // On lance un timer de 300ms pour mettre un léger délai avant l'affichage des suggestions
        const timer = setTimeout(async () => {
            // On attend le tableau de réponses de l'API
            const suggestions = await getCitySuggestions(ville)
            // On met à jour le state avec ce tableau
            setVilleSuggest(suggestions)
        }, 300)
        // On lance une fonction de nettoyage pour n'avoir qu'un seul appel API à la fois
        return () => {
            clearTimeout(timer)
        }
    }, [ville])

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

    // Fonction pour lancer la recherche lors du click sur une ville de la liste de suggestions
    function handleSelectSuggestion(villeSelectionnee) {
        setVille(`${villeSelectionnee.name}, ${villeSelectionnee.country}`)
        // On envoie l'objet entier au parent App.jsx pour la recherche
        onSearch(villeSelectionnee)
        // On vide le tableau de suggestion
        setVilleSuggest([])
        // On enlève le focus sur l'input
        inputRef.current.blur()
    }

    useEffect(() => {
        if (!villeRecherchee) {
            setVille("")
        }
    }, [villeRecherchee])

    return (
        <div className={styles.searchBar}>
            <div className={styles.inputContainer}>
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
                {/* La liste de suggestions de ville qui s'affiche lors de la saisie d'au moins 3 lettres dans l'input
                    avec possibilité de cliqué sur chaque éléments de cette liste pour lancer une recherche */}
                {villeSuggest.length > 0 && (
                    <ul className={styles.suggestList}>
                        {villeSuggest.map((ville, index) => (
                            <li key={index} className={styles.suggestion} onClick={() => handleSelectSuggestion(ville)}>
                                <span className={styles.villeName}>{ville.name}</span>
                                <span className={styles.villeDetails}>{ville.admin1 ? `${ville.admin1}, ` : ""}{ville.country}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* Le bouton de recherche qui va lancer la fonction handleSubmit sur l'évènement onClick */}
            <button onClick={handleSubmit} className={styles.button}>
                Rechercher
            </button>
        </div>
    )
}

export default SearchBar