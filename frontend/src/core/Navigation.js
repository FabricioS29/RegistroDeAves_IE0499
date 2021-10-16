import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, NavItem } from 'reactstrap';

import { isAuthenticated, signout} from './apiCore';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#ff9900'}
    } else {
        return {color: '#ffffff'}
    }
}


const Navigation = ({history}) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">Bird</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav me-auto">
                            <NavItem className="nav-link">
                                <Link
                                    className="nav-link"
                                    to='/'>
                                    Inicio
                                </Link>
                            </NavItem>
                        </ul>
                        <ul className="navbar-nav">
                            {!isAuthenticated() && (
                                <>
                                    <NavItem className="nav-link">
                                        <Link
                                            className="nav-link"
                                            to='/signup'>
                                            Singup
                                        </Link>
                                    </NavItem>
                                    <NavItem className="nav-link">
                                        <Link
                                            className="nav-link"
                                            to='/signin'>
                                            Login
                                        </Link>
                                    </NavItem>
                                </>
                            )}
                            { isAuthenticated() && (
                               <>
                                    <NavItem className="nav-link">
                                        <Link to="/" className="nav-link">
                                            Profile
                                        </Link>
                                    </NavItem>
                                    <NavItem className="nav-link">
                                        <Link to="/addcategory" className="nav-link">
                                            Add Category
                                        </Link>
                                    </NavItem>
                                    <NavItem className="nav-link">
                                        <Link to="/addbird" className="nav-link">
                                            Add Bird
                                        </Link>
                                    </NavItem>
                                    <NavItem className="nav-link">
                                        <Link
                                        to="/"
                                        onClick={() => 
                                            signout(() => {
                                                history.push("/");
                                            })} className="nav-link">
                                            Logout
                                        </Link>
                                    </NavItem>
                               </> 
                            )}
                            
                        </ul>    
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default withRouter(Navigation);