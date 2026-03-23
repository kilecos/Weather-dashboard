import { useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import { getCoordinates, getMeteo } from './services/weatherService'

function App() {
  const [villeRecherchee, setVilleRecherchee] = useState("")
  const [meteo, setMeteo] = useState(null)
  const [localisation, setLocalisation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [erreur, setErreur] = useState(null)

  function handleSearch(ville) {
    setVilleRecherchee(ville)
  }

  useEffect(() => {
    if (villeRecherchee === "") return

    async function fetchData() {
      setIsLoading(true)
      setErreur(null)
      setMeteo(null)

      try {
        const coords = await getCoordinates(villeRecherchee)
        const donneesMeteo = await getMeteo(coords.latitude, coords.longitude)
        setLocalisation(coords)
        setMeteo(donneesMeteo)
      } catch (error) {
        setErreur(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [villeRecherchee])

  return (
    <div className="app">
      <Header
        title="Weather Dashboard"
        subtitle="Entrez une ville pour consulter la météo"
      />
      <main className="main-content">
        <SearchBar onSearch={handleSearch} />
        {isLoading && <p>Chargment en cours...</p>}
        {erreur && <p>Erreur : {erreur}</p>}
        {meteo && (
          <div>
            <h2>{localisation.name}, {localisation.country}</h2>
            <p>Température : {meteo.temperature_2m}°C</p>
            <p>Vent : {meteo.windspeed_10m} km/h</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
