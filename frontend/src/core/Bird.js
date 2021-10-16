import React, {useState, useEffect} from "react";
import { read } from "./apiCore";
import Card from './Card';
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
                <h2>This is the bird page</h2>
                {
                    bird && 
                    <Card bird={bird}/>
                }
            </div>
        </>
    )
}

export default Bird;