import React, {useState} from 'react';

const Paieska = (props) => {

    const [naujas, setNaujas] = useState('')

    return (
        <div>
            <input type="text" value={naujas} onChange={(e)=> setNaujas(e.target.value)}/> <button onClick={props.naujas(naujas)}>Ieškoti</button>
        </div>
    );
};

export default Paieska;