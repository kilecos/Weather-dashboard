import styles from './InfosSupp.module.css'

function InfosSupp ({meteo, forecast}) {
    // Si pas de météo ou de prévisions, rien ne s'affiche
    if (!meteo || !forecast) return null

    return (
        <div className={styles.infosContainer}>
            <div className={styles.detail}>
                <span className={styles.detailLabel}>💨 Vent</span>
                <div className={styles.valueContainer}>
                    {/* Le cadran pour représenter une boussole */}
                    <div className={styles.compass}>
                        {/* Les points cardinaux Est et Ouest */}
                        <span className={styles.pointE}>E</span>
                        <span className={styles.pointO}>O</span>
                        {/* Le conteneur de la flèche tournant sur lui-même en fonction de la direction du vent */}
                        <div className={styles.arrowContainer} style={{transform: `rotate(${meteo.winddirection_10m}deg)`}}>
                            {/* La flèche indiquant la direction du vent */}
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
                    {/* La barre de progression */}
                    <div className={styles.progressBarHumi}>
                        {/* La zone de remplissage de la barre */}
                        <div className={styles.progressBarHumiFill} style={{ width: `${meteo.relativehumidity_2m}%` }}/>
                    </div>
                </div>
            </div>
            <div className={styles.detail}>
                <span className={styles.detailLabel}>☀️ Indice UV</span>
                <div className={styles.valueContainer}>
                    <span className={styles.detailValue}>{forecast.uv_index_max[0]}</span>
                    {/* La barre pour visualiser l'indice UV */}
                    <div className={styles.progressBarUV}>
                            {/* Le curseur qui se positionne dynamiquement sur la barre */}
                            <div className={styles.circleUV} style={{left: `${(forecast.uv_index_max[0] / 11) * 100}%` }}/>
                    </div>
                </div>
            </div>
            <div className={styles.detail}>
                <span className={styles.detailLabel}>⇵ Pression</span>
                <div className={styles.valueContainer}>
                    <span className={styles.detailValue}>{meteo.pressure_msl} mbar</span>
                    {/* La barre de progression */}
                    <div className={styles.progressBarPress}>
                        {/* La zone de remplissage de la barre */}
                        <div className={styles.progressBarPressFill} style={{ width: `${((meteo.pressure_msl - 950) / 100) * 100}%` }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfosSupp