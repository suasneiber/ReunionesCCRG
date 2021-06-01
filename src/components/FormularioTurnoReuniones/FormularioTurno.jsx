import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import './FormularioTurno.css'
import { getFirestore } from '../../Firebase/firebaseConfig'
import firebase from 'firebase/app'

const Cartelito=({mensaje, show= false, setShow })=>{   
    
    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            style={{
                position: 'relative',
                minHeight: '100px',
            }}
        >   
        
            <Toast 
                onClose={() => setShow(false)} 
                show={show} 
                delay={3000} 
                autohide
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
            >
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                    />
                    <strong className="mr-auto">CCIAdmin </strong>
                    {/* <small>11 mins ago</small> */}
                </Toast.Header>
                <Toast.Body>{mensaje}!</Toast.Body>
            </Toast>           
        </div>
    )
}


function FormularioTurno() {
    const [formData, setFormData] = useState(estadoInicialFormulario)
    const [loading, setLoading] = useState(true) 
    const [show, setShow] = useState(false);

    const handlerChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    const handlerSubmit = (e) =>{
        e.preventDefault()
        setLoading(false)
        console.log('enviar')
        const db= getFirestore()
        db.collection('reuniones').add({...formData, cantidadPersonas: parseInt(formData.cantidadPersonas), fecha: firebase.firestore.Timestamp.fromDate(new Date(formData.fecha))})
        .then(res=> {
            setFormData(estadoInicialFormulario)
            setLoading(true)
            setShow(true)
        })
    }
    console.log(formData)
    return (
        <>             
            <Cartelito mensaje={'La Persona se ha Agregado Correctamente.'} show={show} setShow={setShow}/>
            <section className="seccion-crearreunion">
                <div className="container col-5 border border-warning rounded p-3" >
                    <h2 className="text-center">CREAR REUNIÓN</h2>
                    <Form onChange={handlerChange} onSubmit={handlerSubmit} >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Nombre de la Reunión</Form.Label>
                            <Form.Control 
                                name="nombre"
                                type="text" 
                                placeholder="Ingrese el Nombre de la Reunion" 
                                size="sm" 
                                value={formData.nombre}
                            />
                            <Form.Text className="text-muted">
                            Nombre de la reunion.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Día</Form.Label>
                            <Form.Control 
                                name="dia"
                                type="text" 
                                size="sm" 
                                placeholder="Ingrese el Dia de la Reunion"
                                value={formData.dia} 
                            />
                            <Form.Text className="text-muted">
                            Día de la reunión.
                            </Form.Text>
                        </Form.Group>                
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>FECHA</Form.Label>
                            <Form.Control 
                                name="fecha"
                                type="date" 
                                size="sm" 
                                value={formData.fecha}
                            />
                            <Form.Text className="text-muted">
                            Fecha de la reunión.
                            </Form.Text>
                        </Form.Group>                
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>HORA</Form.Label>
                            <Form.Control 
                                name="hora"
                                type="text" 
                                size="sm" 
                                placeholder="Ingrese la hora de la Reunion"
                                value={formData.hora} 
                            />
                            <Form.Text className="text-muted">
                            Hora de la reunión.
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
                                value={formData.cantidadPersonas}
                            />
                            <Form.Text className="text-muted">
                            En la cantidad de personas no estan incluidas el staff.
                            </Form.Text>
                        </Form.Group>
                        {loading ? 
                            <Button className="btn btn-block" variant="success" type="submit">
                                Submit
                            </Button>
                            : 
                            <Button variant="primary" disabled block > 
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Loading...
                            </Button>
                        }             
                    </Form>
                </div>
            </section>
        </>
    )
}
const estadoInicialFormulario = {
    nombre: '',
    dia: '',
    fecha: '',
    hora: '',
    cantidadPersonas: 0
}

export default FormularioTurno
