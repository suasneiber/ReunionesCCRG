import React from 'react'
import ReunionCard from './ReunionCard';

function ListadoReuniones({listadoReuniones}) {    
    //console.log(listadoReuniones);
    return (        
        <>  
            <div className="row justify-content-center">
                {listadoReuniones.map(reunion => <ReunionCard key={reunion.id} reunion={reunion}/>)}
            </div>
        </>
    )
}
export default ListadoReuniones
