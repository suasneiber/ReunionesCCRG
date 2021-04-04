import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './FormularioTurno.css'
import { getFirestore } from '../../Firebase/firebaseConfig'
import firebase from 'firebase/app'



function FormularioTurno() {
    const [formData, setFormData] = useState(estadoInicialFormulario)

    useEffect(() => {
        
    }, [])

    const handlerChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    const handlerSubmit = (e) =>{
        e.preventDefault()
        console.log('enviar')
        const db= getFirestore()
        db.collection('reuniones').add({...formData, cantidadPersonas: parseInt(formData.cantidadPersonas), fecha: firebase.firestore.FieldValue.serverTimestamp(formData.fecha)})
        .then(res=>console.log('soy respuesta de set'))
    }
    //firebase.firestore.Timestamp.fromDate(now)
    console.log(formData);
    return (
        <section className="seccion-crearreunion">
            <div className="container col-5 border border-warning rounded p-3" >
                <h2 className="text-center">CREAR REUNIÓN</h2>
                <Form onChange={handlerChange} onSubmit={handlerSubmit} >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>DÍA</Form.Label>
                        <Form.Control 
                            name="dia"
                            type="text" 
                            placeholder="Ingrese el Dia" 
                            size="sm" 
                        />
                        <Form.Text className="text-muted">
                        Día de la reunion.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>FECHA</Form.Label>
                        <Form.Control 
                            name="fecha"
                            type="date" 
                            size="sm" 
                        />
                        <Form.Text className="text-muted">
                        Fecha de la reunión.
                        </Form.Text>
                    </Form.Group>                
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>CANTIDAD DE PERSONAS</Form.Label>
                        <Form.Control 
                            name="cantidadPersonas"
                            type="number" 
                            size="sm" 
                            placeholder="Ingrese el núm. de personas" 
                            min={1} 
                            max={50} 
                        />
                        <Form.Text className="text-muted">
                        En la cantidad de personas no estan incluidas el staff.
                        </Form.Text>
                    </Form.Group>
                    <Button className="btn btn-block" variant="success" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        </section>
    )
}
const estadoInicialFormulario = {
    dia: '',
    fecha: '',
    cantidadPersonas: ''
}

export default FormularioTurno
