import React, {useState, useEffect} from 'react'
import { getFirestore } from '../../Firebase/firebaseConfig'
import firebase from 'firebase/app'
import ListadoReuniones from '../ListadoReuniones/ListadoReuniones'
import { promesaReuniones } from '../../utils/mockReuniones'

function ListadoReunionesContainer() {
    const [reunionesList, setReunionesList] = useState([])
    const [loading, setLoading] = useState(true)
    const db= getFirestore()  
    const fechaHoy = new Date() 
    console.log(fechaHoy);

    useEffect(() => {         
        db.collection('reuniones').where('fecha', '>=', fechaHoy).get()//where('fecha', '>=', `${fechaHoy}`)
        .then(reu => { //console.log(reu);
            setReunionesList(reu.docs.map(reunion => ({...reunion.data(), id: reunion.id, fecha: reunion.data().fecha.toDate().toISOString()}))) 
            setLoading(false)
        })                         
        // promesaReuniones
        // .then(resp => setReunionesList(resp))
         
}, [])

    // console.log(fechaHoy);
    console.log(reunionesList);
    return (
        <>
            {loading? <h1>cargando</h1>:

                <ListadoReuniones listadoReuniones={reunionesList}/>
            }
        </>
    )
}

export default ListadoReunionesContainer
