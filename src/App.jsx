import { useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import Forecast from './components/Forecast'
import { getCoordinates, getMeteo } from './services/weatherService'
import styles from './App.module.css'
import { getWeatherInfo } from './utils/weatherUtils'

// Création du composant App qui va afficher l'application complète à l'écran
function App() {
  const [villeRecherchee, setVilleRecherchee] = useState("")
  const [meteo, setMeteo] = useState(null)
  const [localisation, setLocalisation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [erreur, setErreur] = useState(null)
  const [forecast, setForecast] = useState(null)

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
        setMeteo(donneesMeteo.current)
        setForecast(donneesMeteo.daily)
      } catch (error) {
        setErreur(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [villeRecherchee])

  return (
    <div className={styles.appContainer} style={{backgroundImage: meteo ? `url('${getWeatherInfo(meteo?.weathercode).background}')` : 'none'}}>
      <div className={styles.app}>
        <Header
          title="Weather Dashboard"
          subtitle="Entrez une ville pour consulter la météo"
        />
        <main className={styles.mainContent}>
          <SearchBar onSearch={handleSearch}/>
          <WeatherCard
            meteo={meteo}
            localisation={localisation}
            isLoading={isLoading}
            erreur={erreur}
          />
          <Forecast
            forecast={forecast}
          />
        </main>
      </div>
    </div>
  )
}

export default App
