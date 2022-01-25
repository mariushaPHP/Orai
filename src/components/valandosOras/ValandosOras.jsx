import React from 'react';
import './style.scss'

const ValandosOras = (props) => {


    return (
        <div className='bele'>

            <h5>{props.oras.forecastTimeUtc.slice(11, 16)}</h5>
            <h5>{props.oras.airTemperature}&deg;C</h5>
            <h5>{props.oras.relativeHumidity}%</h5>
            <h5>{props.oras.windSpeed}m/s - {props.oras.windGust} m/s</h5>
            <h5>{props.icona(props.oras.conditionCode, props.oras.forecastTimeUtc.slice(11, 13))}</h5>

        </div>
    );
};

export default ValandosOras;