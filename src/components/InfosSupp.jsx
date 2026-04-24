import styles from './InfosSupp.module.css'

function InfosSupp ({meteo, forecast}) {
    // Si pas de météo ou de prévisions, rien ne s'affiche
    if (!meteo || !forecast) return null

    return (
        <div className={styles.infosContainer}>
            <div className={styles.detail}>
                <span className={styles.detailLabel}>💨 Vent</span>
                <div className={styles.valueContainer}>
                    <div className={styles.compass}>
                        <span className={styles.pointE}>E</span>
                        <span className={styles.pointO}>O</span>
                        <div className={styles.arrowContainer} style={{transform: `rotate(${meteo.winddirection_10m}deg)`}}>
                            <div className={styles.arrow}/>
                        </div>
                    </div>
                    <span className={styles.detailValue}>{meteo.windspeed_10m} km/h</span>
                </div>
            </div>
            <div className={styles.detail}>
                <span className={styles.detailLabel}>💦 Humidité</span>
                <div className={styles.valueContainer}>
                    <span className={styles.detailValue}>{meteo.relativehumidity_2m} %</span>
                    <div className={styles.progressBarHumi}>
                        <div className={styles.progressBarHumiFill} style={{ width: `${meteo.relativehumidity_2m}%` }}/>
                    </div>
                </div>
            </div>
            <div className={styles.detail}>
                <span className={styles.detailLabel}>☀️ Indice UV</span>
                <div className={styles.valueContainer}>
                    <span className={styles.detailValue}>{forecast.uv_index_max[0]}</span>
                    <div className={styles.progressBarUV}>
                            <div className={styles.circleUV} style={{left: `${(forecast.uv_index_max[0] / 11) * 100}%` }}/>
                    </div>
                </div>
            </div>
            <div className={styles.detail}>
                <span className={styles.detailLabel}>⇵ Pression</span>
                <div className={styles.valueContainer}>
                    <span className={styles.detailValue}>{meteo.pressure_msl} mbar</span>
                    <div className={styles.progressBarPress}>
                        <div className={styles.progressBarPressFill} style={{ width: `${((meteo.pressure_msl - 950) / 100) * 100}%` }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfosSupp