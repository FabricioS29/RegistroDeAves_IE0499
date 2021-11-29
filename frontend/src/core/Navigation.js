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
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#EBF5FB",  fontWeight: "bold"}}>
                <div className="container">
                    <a className="navbar-brand" href="#">Aves de Zarcero</a>
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
                                            Regístrate
                                        </Link>
                                    </NavItem>
                                    <NavItem className="nav-link">
                                        <Link
                                            className="nav-link"
                                            to='/signin'>
                                            Iniciar Sesión
                                        </Link>
                                    </NavItem>
                                </>
                            )}
                            { isAuthenticated() &&  (
                               <>
                                    <NavItem className="nav-link">
                                        <Link to="/addbird" className="nav-link">
                                            Agregar Nueva Especie
                                        </Link>
                                    </NavItem>
                                    <NavItem className="nav-link">
                                        <Link
                                        to="/"
                                        onClick={() => 
                                            signout(() => {
                                                history.push("/");
                                            })} className="nav-link">
                                            Cerrar Sesión
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