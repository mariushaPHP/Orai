import React, {useEffect, useState} from 'react';
import {nanoid} from "nanoid";
import DienosOrai from "./DienosOrai/DienosOrai";
import './style.scss'
import OraiKasValanada from "./oraiKasValanda/OraiKasValanada";

const OrasDabar = (props) => {

    const [savaitesOrai, setSavaitesOrai] = useState([])
    const [diena, setDiena] = useState(new Date().toDateString());
    const [orai, setOrai] = useState({});

    let oruMasyvas = [];
    useEffect( () => {
         fetch(`https://api.meteo.lt/v1/places/${cityNameToCode(props.city)}/forecasts/long-term`)
            .then(response => response.json())
            .then(data => {
                setOrai(data);

                let orai = data["forecastTimestamps"];
                for(let dienos = 0; dienos < 7; dienos++){
                    let diena = new Date();
                    diena.setDate(diena.getDate() + dienos);
                    let dienosPrognoze = orai.filter(obj => {
                        if(new Date(obj["forecastTimeUtc"]).getDate() !== diena.getDate()){
                            return
                        }
                        return obj;
                    })

                    let dienosOras = {};
                    const savDiena = new Date(diena).getDay();

                    for(const oras of dienosPrognoze){
                        for(const raktas in oras){
                            if(Array.isArray(dienosOras[raktas])){
                                dienosOras[raktas].push(oras[raktas])
                            } else{
                                dienosOras[raktas] = [oras[raktas]];
                            }
                            dienosOras['diena'] = savaitesDiena(savDiena);
                        }
                    }
                    oruMasyvas = [...oruMasyvas, dienosOras];
                }
                setSavaitesOrai(oruMasyvas)
            })
    }, [props.city]);

    function cityNameToCode(string){
        let newStr
        newStr = string.toLowerCase().split('')
        for(let i in newStr){
            if(newStr[i] === 'č') newStr[i] = 'c'
            if(newStr[i] === 'ė') newStr[i] = 'e'
            if(newStr[i] === 'ū') newStr[i] = 'u'
            if(newStr[i] === 'š') newStr[i] = 's'
            if(newStr[i] === 'ž') newStr[i] = 'z'
        }
        return newStr.join('')
    }

    function savaitesDiena(diena){
        switch(diena){
            case 0: return 'S';//'Sekmadienis';
            case 1: return 'P'; //'Pirmadienis';
            case 2: return 'A'; //'Antradienis';
            case 3: return 'T'; //'Treciadienis';
            case 4: return 'K'; //'Ketvirtadienis';
            case 5: return 'Pn'; //'Penktadienis';
            case 6: return 'Š'; //'Sestadienis';
        }
    }

    function nustatytiOrus(diena){
        setDiena(diena)
    }

    return (
        <>
            { savaitesOrai.length ?
            <div>
                <h1>{orai.place.name}</h1>
                <div className='dienos'>
                    {savaitesOrai.map(diena => <DienosOrai nustatyti={nustatytiOrus} key={nanoid()} orai={diena}/>)}
                </div>
                <OraiKasValanada diena={diena} orai={orai}/>
            </div>
                :
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            
        </>

    );
};

export default OrasDabar;