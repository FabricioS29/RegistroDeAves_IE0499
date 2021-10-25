import React from "react";
import {API} from '../config';

const ShowImageBird = ({item, url}) => {
    return (
        <div className='product-img'>
            <img 
                src={`${API}/${url}/photo/${item._id}`}
                alt={item.nameCR}
                className="img-fluid rounded-start"
                style={{borderRadius:"5px"}}
            />
        </div>
    )
}

export default ShowImageBird;