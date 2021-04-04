import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import { getFirestore } from '../../Firebase/firebaseConfig'
import './ListadoTurnos.css'

function ListadoTurnos() {
    const [listadoPersonas, setListadoPersonas] = useState([])
    const [listadoReuniones, setListadoReuniones] = useState({})
    const db = getFirestore()

    

    useEffect(() => {       
            // Trae la última reunion creada
            db.collection('reuniones').orderBy("fecha", "desc").limit(1).get()
            .then(async reu => {
                return  await setListadoReuniones({id: reu.docs[0].id, ...reu.docs[0].data()}); 
            })
            // Trae las personas anotadas para la ultima reunion 
             .then(resp => db.collection('reuniones').doc(listadoReuniones.id).collection('personas').get()
                 .then(per => setListadoPersonas( per.docs.map(personas => ({ ...personas.data(), id: personas.id}))) )
             )                
             
    }, [listadoReuniones.id])
    //
    console.log(listadoPersonas);
    console.log(listadoReuniones)
    

    return (
        <section className="seccion-listadoturnos">
            <div className="container">

                <h2 className="text-center mb-5">Esta sección es del listado de personas</h2>
                {listadoPersonas.length===0 
                ? 
                    <h1 className="text-center" >Cargando...</h1>                         
                :              
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Nombre y Apellido</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listadoPersonas.map((persona,idx)=>(
                                <tr key={persona.id}>
                                    <td>{idx+1 }</td>
                                    <td>{persona.nombre}</td>
                                    <td>{persona.email}</td>
                                    <td>{persona.tel}</td>
                                </tr>
                            ))}
                                                    
                        </tbody>
                    </Table> 
                }
                
            </div>
        </section>
    )
}

export default ListadoTurnos
