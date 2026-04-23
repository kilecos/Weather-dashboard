import styles from './InfosSupp.module.css'

function InfosSupp ({meteo, forecast}) {
    // Si pas de météo ou de prévisions, rien ne s'affiche
    if (!meteo || !forecast) return null

    return (
        <div className={styles.infosContainer}>
            <div className={styles.detail}>
                <span className={styles.detailLabel}>💨 Vent</span>
                <span className={styles.detailValue}>{meteo.windspeed_10m} km/h</span>
            </div>
            <div className={styles.detail}>
                <span className={styles.detailLabel}>💦 Humidité</span>
                <span className={styles.detailValue}>{meteo.relativehumidity_2m} %</span>
            </div>
            <div className={styles.detail}>
                <span className={styles.detailLabel}>☀️ Indice UV</span>
                <span className={styles.detailValue}>{forecast.uv_index_max[0]}</span>
            </div>
            <div className={styles.detail}>
                <span className={styles.detailLabel}>Pression</span>
                <span className={styles.detailValue}>{meteo.pressure_msl}mbar</span>
            </div>
        </div>
    )
}

export default InfosSupp