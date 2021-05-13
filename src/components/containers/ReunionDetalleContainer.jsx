import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getFirestore } from '../../Firebase/firebaseConfig'
import { promesaReuniones } from '../../utils/mockReuniones'
import ListadoTurnos from '../ListadoTurnos/ListadoTurnos'
import ReunionDetalle from '../ReunionDetalle/ReunionDetalle'

function ReunionDetalleContainer() {
    const [estadoReunion, setEstadoReunion] = useState({})
    const [loading, setLoading] = useState(true)
    const [cambioAsiste, setCambioAsiste] = useState(false)
    const {idreunion} = useParams()
    const db = getFirestore()

    const handlerAsiste = async (personaId, asiste) => {
        //console.log('dando de baja', personaId)
        const docRefPersona = db.collection("personas").doc(personaId)        
        const docRefReunion = db.collection("reuniones").doc(idreunion) 
        docRefReunion.get() 
        .then(reu => {
            setEstadoReunion({...reu.data(), id: idreunion, fecha: reu.data().fecha.toDate().toISOString()})
            setLoading(false)            
        })     
        if (asiste===1 && estadoReunion.cantidadPersonas>0) {           
            await docRefPersona.update({ asiste: 2, })             
            await docRefReunion.update({ cantidadPersonas: estadoReunion.cantidadPersonas - 1})  
            //setCambioAsiste(!cambioAsiste)          
        }else if(estadoReunion.cantidadPersonas<50){
            await docRefPersona.update({ asiste: 1 })  
            await docRefReunion.update({ cantidadPersonas: estadoReunion.cantidadPersonas + 1 })  
        }
        setCambioAsiste(!cambioAsiste)          
    }

    useEffect(() => {        
        db.collection('reuniones').doc(idreunion).get()
        .then(reu => {
            setEstadoReunion({...reu.data(), id: idreunion, fecha: reu.data().fecha.toDate().toISOString()})
            setLoading(false)            
        })
        // promesaReuniones
        // .then(reunion => setEstadoReunion(reunion.find(reu => reu.id===idreunion)))
    }, [cambioAsiste])
    console.log(estadoReunion);
    return (
        <>
            {loading? 
                <h2>Cargando ...</h2>
            :
                <div>
                    <ReunionDetalle reunion={estadoReunion}/>                
                    <ListadoTurnos id={idreunion} handlerAsiste={handlerAsiste} cambioAsiste={cambioAsiste}/>                    
                </div>
            }
        </>
    )
}

export default ReunionDetalleContainer
