import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getFirestore } from '../../Firebase/firebaseConfig'
import { promesaReuniones } from '../../utils/mockReuniones'
import ListadoTurnos from '../ListadoTurnos/ListadoTurnos'
import ReunionDetalle from '../ReunionDetalle/ReunionDetalle'
import Spinner from 'react-bootstrap/Spinner'
//import Grid from 'react-bootstrap/'

function ReunionDetalleContainer() {
    const [estadoReunion, setEstadoReunion] = useState({})
    const [listadoPersonas, setListadoPersonas] = useState([])
    const [loading, setLoading] = useState(true)
    //const [loadingSubmit, setLoadingSubmit] = useState(true)
    const [cambioAsiste, setCambioAsiste] = useState(false)
    const {idreunion} = useParams()
    const db = getFirestore()

    

    useEffect(() => {        
        db.collection('reuniones').doc(idreunion).get()
        .then(reu => {
            setEstadoReunion({...reu.data(), id: idreunion, fecha: reu.data().fecha.toDate().toISOString()})
            setLoading(false)            
        })
        db.collection('personas').where('idreunion', '==', idreunion).get()
        .then(personas => {
            setListadoPersonas(personas.docs.map(pers=>({...pers.data(), id: pers.id})))
            setLoading(false)
        }) 
        // promesaReuniones
        // .then(reunion => setEstadoReunion(reunion.find(reu => reu.id===idreunion)))
    }, [cambioAsiste])
    //console.log(listadoPersonas);
    return (
        <>
            {!loading ?     
                <div>
                                      
                    <ReunionDetalle reunion={estadoReunion}/>  
                                
                    <ListadoTurnos 
                        listadoPersonas={listadoPersonas} 
                        //oading={loading}
                        //loadingSubmit={loadingSubmit} 
                        //setLoadingSubmit={setLoadingSubmit} 
                        //handlerAsiste={handlerAsiste} 
                        estadoReunion={estadoReunion}
                        cambioAsiste={cambioAsiste}
                        setEstadoReunion={setEstadoReunion}
                        setCambioAsiste={setCambioAsiste}
                    />                    
                </div>
                :
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden"></span>
                    </Spinner>
                </div>
                
            }  
        </>
    )
}

export default ReunionDetalleContainer
