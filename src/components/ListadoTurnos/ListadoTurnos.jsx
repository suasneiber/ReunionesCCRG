import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import { getFirestore } from '../../Firebase/firebaseConfig'
import './ListadoTurnos.css'

function ListadoTurnos({id, handlerAsiste,cambioAsiste}) {
    const [listadoPersonas, setListadoPersonas] = useState([])
    //const [reunion, setReunion] = useState({})
    const [loading, setLoading] = useState(true)
    
    const db = getFirestore()   
    
    useEffect(() => {    
            
            // Trae las personas anotadas para la ultima reunion 
            db.collection('personas').where('idReunion', '==', id).get()
            .then(personas => {
                setListadoPersonas(personas.docs.map(pers=>({...pers.data(), id: pers.id})))
                setLoading(false)
            })    
    }, [cambioAsiste])

    if(loading){
        return  <h1 className="text-center">Cargando Listado de Personas...</h1>
    }

    return (
        <section className="seccion-listadoturnos">
            <div className="container">

                <h2 className="text-center mb-5">Esta sección es del listado de personas</h2>
                {listadoPersonas.length===0 
                ? 
                    <h1 className="text-center" >No hay personas anotadas para esta reunión...</h1>                         
                :    
                    <div>
                        {/* <h1>Reunión {reunion.dia}</h1> */}
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre y Apellido</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Asiste?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listadoPersonas.map((persona,idx)=>(
                                    <tr key={persona.id}>
                                        <td>{idx+1 }</td>
                                        <td>{persona.nombre}</td>
                                        <td>{persona.email}</td>
                                        <td>{persona.tel}</td>
                                        <td>
                                            <button 
                                                onClick={ () => handlerAsiste(persona.id, persona.asiste) }
                                                htmlFor="" 
                                                className = {persona.asiste===2 
                                                                ? 'btn btn-success btn-block'
                                                                : 'btn btn-danger btn-block'
                                                            }
                                            >
                                                {persona.asiste===2 ? 'SI': 'No'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                                        
                            </tbody>
                        </Table> 
                    </div>
                }                
            </div>
        </section>
    )
}

export default ListadoTurnos
