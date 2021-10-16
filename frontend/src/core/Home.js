import React, {useState, useEffect} from "react";
import Navigation from './Navigation';
import { getBirds } from "./apiCore";
import Card from './Card';

const Home = (req, res) => {
    
    const [birds, setBirds] = useState([]);
    const [error, setError] = useState(false);

    const loadBirds = () => {
        getBirds().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setBirds(data);
                console.log(data);
            }
        })
    }

    useEffect(() => {
        loadBirds();
    }, [])


    return (
        <div>
            <Navigation/>
            <div className="container">
                <div className="row">
                    {birds.map((bird, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                            <Card bird={bird} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default Home;