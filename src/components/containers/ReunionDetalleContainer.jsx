import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getFirestore } from '../../Firebase/firebaseConfig'
import { promesaReuniones } from '../../utils/mockReuniones'
import ListadoTurnos from '../ListadoTurnos/ListadoTurnos'
import ReunionDetalle from '../ReunionDetalle/ReunionDetalle'

function ReunionDetalleContainer() {
    const [estadoReunion, setEstadoReunion] = useState({})
    const {idreunion} = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const db = getFirestore()
        db.collection('reuniones').doc(idreunion).get()
        .then(reu => {
            setEstadoReunion({...reu.data(), id: idreunion, fecha: reu.data().fecha.toDate().toISOString()})
            setLoading(false)
            
        })
        // promesaReuniones
        // .then(reunion => setEstadoReunion(reunion.find(reu => reu.id===idreunion)))
    }, [])
    console.log(estadoReunion);
    return (
        <>
            {loading? 
                <h2>Cargando ...</h2>
            :
                <div>
                    <ReunionDetalle reunion={estadoReunion}/>                
                    <ListadoTurnos id={idreunion}/>                    
                </div>
            }
        </>
    )
}

export default ReunionDetalleContainer
