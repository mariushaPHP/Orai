import React, { useState } from 'react';
import {nanoid} from "nanoid";
import { useEffect } from 'react';
import ValandosOras from "../valandosOras/ValandosOras";
import './style.scss';

const OraiKasValanada = ({diena, orai}) => {
    const [valandinis, setValandinis] = useState([]);

    useEffect(() => {
        setValandinis(orai.forecastTimestamps.filter(prognoze => {
            if(new Date(prognoze.forecastTimeUtc).toDateString() == diena && new Date().getHours() <= new Date(prognoze.forecastTimeUtc).getHours()){

                return prognoze;
            }
        }))
    }, [diena])

    function conditionCode(code, h){

        switch (code) {
            case 'clear': return (h > 8 && h < 20 ? <i className="bi bi-sun"></i> : <i className="bi bi-moon"></i>);
            case 'isolated-clouds': return (h > 8 && h < 20 ? <i className="bi bi-cloud-sun"></i> : <i className="bi bi-cloud-moon"></i>);
            case 'scattered-clouds': return (h > 8 && h < 20 ? <i className="bi bi-cloud-sun"></i> : <i className="bi bi-cloud-moon"></i>);
            case 'overcast': return <i className="bi bi-cloud"></i>;
            case 'light-rain': return <i className="bi bi-cloud-drizzle"></i>;
            case 'moderate-rain': return <i className="bi bi-cloud-rain"></i>;
            case 'heavy-rain': return <i className="bi bi-cloud-rain-heavy"></i>;
            case 'sleet': return <i className="bi bi-cloud-sleet"></i>;
            case 'light-snow': return <i className="bi bi-cloud-snow"></i>
            case 'moderate-snow': return <i className="bi bi-cloud-snow"></i>
            case 'heavy-snow': return <i className="bi bi-cloud-snow"></i>
            case 'fog': return <i className="bi bi-cloud-fog2"></i>
        }
    }

    return (
        <div   className="valandos">
            {valandinis.length ? valandinis.map(valanda =>  <ValandosOras key={nanoid()} oras={valanda} icona={conditionCode}/>)
                :
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
            }
        </div>
    );
};

export default OraiKasValanada;