import React from 'react'
import { Link } from 'react-router-dom'
import './ReunionCard.css'

function ReunionCard({reunion}) {
    console.log(reunion);
    return (
        <div className="col-sm-6 col-md-4">
            <div 
                className="card mt-5 shadow-lg" 
                style={{marginLeft:'2.5%', width: '95%', borderRadius: '25px 25px 0 0'}}
            >
                <Link 
                    to={`/reunion/${reunion.id}`} 
                    exact 
                    style={{textDecoration: 'none', color: 'black'}} 
                >
                    <div className="card-header" >
                        <label>{reunion.nombre}</label>
                    </div>
                    <div className="card-body">
                        <h5 
                            // className={reunion.cantidadPersonas<1 && 'arlert alert-danger'}
                        >
                            Fecha: {reunion.fecha.slice(0, 10)}
                        </h5>
                        <div className="row" style={{marginTop: '50px'}}>
                            <div className="col">
                                <h5>{reunion.dia}</h5>                         
                            </div>
                            <div className="col">
                                <h5>{reunion.hora} Hs.</h5>
                            </div>
                        </div>
                    </div>
                    <div 
                        className="card-footer" 
                        // {reunion.cantidadPersonas<1 && ' No Hay Lugar'}
                        style={{backgroundColor: reunion.cantidadPersonas<1 ? 'red':'black', borderRadius: '0 0 25px 25px'}}
                    >
                        <div className="row">
                            <p className="text-center col" style={{color:'white'}}>Ir a la Renión </p>
                            <p className="text-center col" style={{color:'white'}}>Lugares: {reunion.cantidadPersonas} </p>
                        </div>                       
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ReunionCard
