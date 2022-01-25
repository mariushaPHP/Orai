import React from 'react';
import './style.scss';

const DienosOrai = ({...props}) => {

    const maxTemp = Math.max(...props.orai.airTemperature)
    const minTemp = Math.min(...props.orai.airTemperature)
    console.log((props))



    return (
        <div className='prognoze' onClick={()=> props.nustatyti(new Date(props.orai.forecastTimeUtc[0]).toDateString())}>

            <h3 className='diena'>{props.orai.diena}</h3>
            {/*<h3 className='icona'>sdfgadf</h3>*/}
            <div className='temp'>
                <h3>{maxTemp}&deg;C</h3>
                <h5>{minTemp}&deg;C</h5>
            </div>

        </div>
    );
};

export default DienosOrai;