import React from 'react'

export default function ReunionDetalle({reunion}) {
    
    return (
        <div className="container text-center">
           <h1>{reunion.nombre}</h1>
           <h2>Día: {reunion.dia}</h2>
           <h3>Fecha: {reunion.fecha.slice(0, 10)}</h3>
           <h3>Lugares Disponibes: {reunion.cantidadPersonas}</h3>           
        </div>
    )
}
