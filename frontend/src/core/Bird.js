import React, {useState, useEffect} from "react";
import { read } from "./apiCore";
import CardBird from './CardBird';
import Navigation from './Navigation';

const Bird = (props) => {
    const [bird, setBird] = useState({});
    const [error, setError] = useState(false);

    const loadSingleBird = birdId => {
        read(birdId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setBird(data);
            }
        })
    }

    useEffect(() => {
        const birdId = props.match.params.birdId
        loadSingleBird(birdId);
    }, [props])

    return (
        <>
            <Navigation/>
            <div className='container'>
                {
                    bird && 
                    <CardBird bird={bird}/>
                }
            </div>
        </>
    )
}

export default Bird;