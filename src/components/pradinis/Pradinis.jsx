import React, {useEffect, useState} from 'react';
import OrasDabar from "../OrasDabar";
import './style.scss'

const Pradinis = () => {

    const [city, setCity] = useState('');
    const [naujas, setNaujas] = useState('')

    useEffect(()=> {
        fetch('https://geolocation-db.com/json/2af03d10-55bd-11ec-99c6-3bef17a14b7a')
            .then(response => response.json())
            .then(data => setCity(data.city));
    }, []);

    const naujasMiestas = (e) => {
        e.preventDefault();
        if(naujas.length){
            setCity(naujas)
        }

    }

    return (
        <div className="container">
            <form className='paieska'>
                <h3>Miesto paieška</h3>
                <div>
                    <input type="text" value={naujas} onChange={(e)=> setNaujas(e.target.value)}/> <button onClick={naujasMiestas}>Ieškoti</button>
                </div>

            </form>
            {city.length ? <OrasDabar city={city}/> :
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}

        </div>
    );
};

export default Pradinis;