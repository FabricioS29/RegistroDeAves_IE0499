import React, {useState, useEffect} from "react";
import Navigation from './Navigation';
import { getBirds } from "./apiCore";
import Card from './Card';
import ReactPaginate from 'react-paginate';
import './Home.css';
import Footer from "./Footer";

const Home = (req, res) => {
    
    const [birds, setBirds] = useState([]);
    const [error, setError] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    const birdsPerPage = 9
    const pagesVisited = pageNumber * birdsPerPage

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

    const displayBirds = birds
        .slice(pagesVisited, pagesVisited + birdsPerPage)
        .map((bird, i) => (
            <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                <Card bird={bird} />
            </div>
        ))

    const pageCount = Math.ceil(birds.length / birdsPerPage);
    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <Navigation/>
            <div className="container">
                <div className="row">
                    {displayBirds}
                </div>
            </div>
            <div className="pagi">
                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    pageCount={ pageCount}
                    onPageChange={changePage}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    containerClassName={'pagination'}
                    pageClassName={'page-item ' }
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                /> 
            </div>
            {Footer()}
        </div>
    )

}

export default Home;