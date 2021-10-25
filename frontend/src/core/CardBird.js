import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './CardBird.css';
import ShowImageBird from './ShowImageBird';

const CardBird = ({bird}) => {
    const [count, setCount] = useState(bird.count);

    return (
        <div className="card mb-3 cont " style={{maxWidth: "1500px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <ShowImageBird item={bird} url="bird" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h2>{bird.nameCR}</h2>
                        <p style={{textAlign:"justify"}}><i>{bird.nameC}</i></p>
                        <p style={{textAlign:"justify"}}>{bird.nameUSA}</p>
                        <p style={{textAlign:"justify"}}><strong> Descripción:</strong> {bird.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardBird;
