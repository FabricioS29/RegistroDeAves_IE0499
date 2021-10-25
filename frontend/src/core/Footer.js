import React from "react";
import './Footer.css'


const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start margfoot">
            <div className="text-center p-3" >
                <p>Proyecto Eléctrico - 2021</p>
                <p>Fabricio Solano Rojas</p>
                Contacto: <a className="text-dark" href="mailto:fabricio.solanorojas@ucr.ac.cr">fabricio.solanorojas@ucr.ac.cr</a>
                <hr/>
                <p className="tam">
                    La información de las especies se obtuvo del libro de Aves de Costa Rica,
                    de los autores Richard Garrigues y Robert Dean 
                </p>

            </div>
        </footer>
    )
}

export default Footer;