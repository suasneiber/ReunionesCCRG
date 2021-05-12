import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
//import NavLink from 'react-bootstrap/NavLink'

import {NavLink} from 'react-router-dom'

function Menu() {
    return (
    <Navbar >  
        <NavLink 
            to={'/'} 
            className="btn"
            activeClassName=""
        >
            Listado Reuniones
        </NavLink>      
        <NavLink 
            to={'/crearreunion'} 
            className="btn"
            activeClassName=""
        >
            Crear Runión
        </NavLink>        
        {/* <NavLink to={''} className="btn">Listado Personas</NavLink> */}
    </Navbar>
    )
}

export default Menu
