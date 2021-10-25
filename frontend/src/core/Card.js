import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import ShowImage from './ShowImage';

const Card = ({bird}) => {
    const [count, setCount] = useState(bird.count);

    return (
        <div className="card m-10 card-cont">
            <div>
                <ShowImage className="img" item={bird} url="bird" />
                <h2>{bird.nameCR}</h2>
                <p><i>{bird.nameC}</i></p>
                <Link to={`/bird/${bird._id}`}>
                    <button className="btn btn-primary">Leer mas</button>
                </Link>
            </div>
        </div>
    )
}

export default Card;
