import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import { getFirestore } from '../../Firebase/firebaseConfig'
import './ListadoTurnos.css'

function ListadoTurnos({id}) {
    const [listadoPersonas, setListadoPersonas] = useState([])
    //const [reunion, setReunion] = useState({})
    const [loading, setLoading] = useState(true)
    const [cambioAsiste, setCambioAsiste] = useState(false)
    const db = getFirestore()   

    // useEffect(() => {    

    //         // Trae la última reunion creada
    //         db.collection('reuniones').orderBy("fecha", "desc").limit(1).get()
    //         .then(reu => {
    //             return  setReunion({id: reu.docs[0].id, ...reu.docs[0].data()}); 
    //         })                         
             
    // }, [])  
    
    const handlerAsiste = async (personaId, asiste) => {
        //console.log('dando de baja', personaId)
        const docRefPersona = db.collection("personas").doc(personaId)        
        const docRefReunion = db.collection("reuniones").doc(id)        
        if (asiste===1) {
            await docRefPersona.update({ asiste: 2, })  
            await docRefReunion.update({ cantidadPersonas: 50, })  
            //setCambioAsiste(!cambioAsiste)          
        }else{
            await docRefPersona.update({ asiste: 1 })  
            await docRefReunion.update({ cantidadPersonas: 0 })  
        }
        setCambioAsiste(!cambioAsiste)          
    }
    
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
