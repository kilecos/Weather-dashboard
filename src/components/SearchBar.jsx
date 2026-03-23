import { useState } from 'react'

function SearchBar({onSearch}) {
    const [ville, setVille] = useState("")

    function handleChange(event) {
        setVille(event.target.value)
    }

    function handleSubmit() {
        onSearch(ville)
    }

    return (
        <div className="search-bar">
            <input 
                type="text"
                placeholder="Rechercher une ville..."
                value={ville}
                onChange={handleChange}
            />
            <button onClick={handleSubmit}>
                Rechercher
            </button>
        </div>
    )
}

export default SearchBar