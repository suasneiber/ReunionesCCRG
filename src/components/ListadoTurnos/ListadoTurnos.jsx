import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { getFirestore } from '../../Firebase/firebaseConfig'
import './ListadoTurnos.css'

function ListadoTurnos({setCambioAsiste,listadoPersonas, cambioAsiste, estadoReunion,setEstadoReunion}) {
    //const [listadoPersonas, setListadoPersonas] = useState([])
    //const [reunion, setReunion] = useState({})
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const {idreunion} = useParams()
    
    const db = getFirestore() 
    
    const handlerAsiste = async (personaId, asiste) => {
        //console.log('dando de baja', personaId)
        setLoadingSubmit(true)
        const docRefPersona = db.collection("personas").doc(personaId)        
        const docRefReunion = db.collection("reuniones").doc(idreunion) 
        docRefReunion.get() 
        .then(reu => {
            setEstadoReunion({...reu.data(), id: idreunion, fecha: reu.data().fecha.toDate().toISOString()})                
            
        })     
        if (asiste===1 && estadoReunion.cantidadPersonas>0) {           
            await docRefPersona.update({ asiste: 2, })             
            await docRefReunion.update({ cantidadPersonas: estadoReunion.cantidadPersonas - 1})  
            .then(res=>setLoadingSubmit(false)  )        
        }else if(estadoReunion.cantidadPersonas<50){
            await docRefPersona.update({ asiste: 1 })  
            await docRefReunion.update({ cantidadPersonas: estadoReunion.cantidadPersonas + 1 })
            .then(res=>setLoadingSubmit(false)  ) 
             
        }
        setCambioAsiste(!cambioAsiste) 
        
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
                                                {loadingSubmit ?
                                                    <div className="text-center">
                                                        <Button variant="primary" disabled>
                                                            <Spinner
                                                            as="span"
                                                            animation="grow"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                            />
                                                            Loading...
                                                        </Button>
                                                    </div>
                                                :
                                                <button 
                                                    onClick={ () => handlerAsiste(persona.id, persona.asiste) }
                                                    htmlFor="" 
                                                    className = {persona.asiste === 2 
                                                                    ? 'btn btn-success btn-block'
                                                                    : 'btn btn-danger btn-block'
                                                                }
                                                >
                                                    {persona.asiste===2 ? 'SI': 'No'}
                                                </button>
                                                }
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
