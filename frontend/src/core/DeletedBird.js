import React, {useState, useEffect} from 'react';
import { deletedBird } from './apiCore';
import { Redirect } from 'react-router-dom';

const DeletedBird = (props) => {

    const [birdD, setbirdD] = useState ({});
    const [err, setError] = useState(false);

    const deletedSingleBird = birdId => {
        deletedBird(birdId).then(data => {
            if (data.error){
                setError(data.error)
            } else {
                console.log("Especie eliminada")
            }
        });
    }
    
    useEffect(() => {
        const birdId = props.match.params.birdId
        console.log(birdId)
        deletedSingleBird(birdId)
    }, [props])

    return(
        
        <Redirect to="/" />
    )
}

export default DeletedBird;