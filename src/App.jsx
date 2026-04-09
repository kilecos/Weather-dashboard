import { useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import Forecast from './components/Forecast'
import Footer from './components/Footer'
import { getCoordinates, getMeteo } from './services/weatherService'
import styles from './App.module.css'
import { getWeatherInfo } from './utils/weatherUtils'
import HourlyForecast from './components/HourlyForecast'

// Création du composant App qui va afficher l'application complète à l'écran
function App() {
  // --- State de données ---
  const [villeRecherchee, setVilleRecherchee] = useState("")  // Ville soumise via la SearchBar
  const [meteo, setMeteo] = useState(null)                    // Données météo actuelles
  const [localisation, setLocalisation] = useState(null)      // Infos de géocodage (nom exact, pays)
  const [forecast, setForecast] = useState(null)              // Prévisions sur 7 jours
  const [hourlyForecast, setHourlyForecast] = useState(null)  // Prévisions sur 24h

  // --- State d'interface (UI) ---
  const [isLoading, setIsLoading] = useState(false)           // Etat du chargement
  const [erreur, setErreur] = useState(null)                  // Message d'erreur si la ville est introuvable
  const [lastUpdate, setLastUpdate] = useState(null)          // Heure de la dernière mise à jour

  function handleSearch(ville) {
    setVilleRecherchee(ville)
  }

  // Déclenche la récupération des données dès que villeRecherchee change
  useEffect(() => {
    if (villeRecherchee === "") return // On évite de lancer une recherche a vide

    async function fetchData() {
      // Réinitialisation de l'interface avant la nouvelle requête
      setIsLoading(true) // On afficher le message de chargement pendant la recherche
      setErreur(null)
      setMeteo(null)
      setForecast(null)
      setHourlyForecast(null)

      try {
        // On récupère les coordonnées de la ville recherchée
        const coords = await getCoordinates(villeRecherchee)
        // On récupère les données météo par rapport aux coordonnées
        const donneesMeteo = await getMeteo(coords.latitude, coords.longitude)
        setLocalisation(coords)
        setMeteo(donneesMeteo.current)
        setForecast(donneesMeteo.daily)
        setHourlyForecast(donneesMeteo.hourly)
        setLastUpdate(new Date())
      } catch (error) {
        setErreur(error.message)
      } finally {
        setIsLoading(false)
        setVilleRecherchee("") // On vide la barre de recherche
      }
    }

    fetchData()
  }, [villeRecherchee])

  function resetApp() {
    setVilleRecherchee("")
    setMeteo(null)
    setLocalisation(null)
    setForecast(null)
    setHourlyForecast(null)
    setIsLoading(null)
    setErreur(null)
    setLastUpdate(null)
  }

  return (
    // Le conteneur principal change d'image de fond dynamiquement en fontion de la météo. Si aucune météo, pas de background
    // On affiche ensuite les différents composants de l'application en le passant en prop les state établis en amont (meteo, localisation, forecast,...)
    <div className={styles.appContainer}>
      <div className={styles.backgroundLayer} style={{backgroundImage: meteo ? `url('${getWeatherInfo(meteo?.weathercode).background}')` : 'none'}}/>
      <div className={styles.app}>
        {/* Voir Header.jsx */}
        <Header onReset={resetApp}
          title="Météo en Direct"
          subtitle="Entrez une ville pour consulter la météo"
        />
        <main className={styles.mainContent}>
          {/* Voir SearchBar.jsx */}
          <SearchBar onSearch={handleSearch} villeRecherchee={villeRecherchee}/>
          {/* Voir WeatherCard.jsx */}
          <WeatherCard
            meteo={meteo}
            localisation={localisation}
            isLoading={isLoading}
            erreur={erreur}
          />
          <HourlyForecast
            hourlyForecast={hourlyForecast}
          />
          {/* Voir Forecast.jsx */}
          <Forecast
            forecast={forecast}
          />
        </main>
        {/* Voir Footer.jsx */}
        <Footer
          lastUpdate={lastUpdate}
        />
      </div>
    </div>
  )
}

export default App
