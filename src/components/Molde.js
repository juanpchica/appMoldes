import React,{ useState,useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import { Button,Col,Form,Row } from 'react-bootstrap';

export const Molde = () => {
    const { id } = useParams();

    const apiURL = 'http://localhost:8084/apiMoldes/api/moldes';
    
    const [molde,setMolde] = useState({dimensiones:"",columna:"",lado:"",tipo:"",ubicacion:"",cantidad:"",id:id});
    const [isLoading,setIsLoading] = useState(true)
    
    //Fetch data from server
    const fetchMolde = async() => {
        const response = await fetch(apiURL+"?id="+id);
        const molde = await response.json();
         
        setIsLoading(false);
        setMolde(molde[0]); 
    }

    useEffect(()=>{
        fetchMolde();
    },[])

    const updateMolde = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(molde)
        };
        fetch(apiURL+'/actualizar', requestOptions)
            .then(response =>{
                console.log(response);
                response.json()
            })
            .then(data => console.log("data"+ data));
    }

    if(isLoading) return <div>Cargando datos...</div>

    return (
        <section className="content-form-molde">
            
            <Row>
                <Col><h2>Molde ID: {molde.id}</h2></Col>
                <Col className="text-right">
                    <Link to="/" className="btn btn-danger">
                        Regresar
                    </Link>
                </Col>
            </Row>
            <Form onSubmit={updateMolde}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Dimensiones</Form.Label>
                        <Form.Control type="text" value={molde.dimensiones} onChange={(e)=>{setMolde({...molde,dimensiones:e.target.value})}} disabled/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control type="text" value={molde.tipo} onChange={(e)=>{setMolde({...molde,tipo:e.target.value})}} disabled />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control type="number" placeholder="Cantidad de Moldes:" value={molde.cantidad} onChange={(e)=>{setMolde({...molde,cantidad:e.target.value})}}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Lado</Form.Label>
                        <Form.Control type="text" placeholder="Ej: A,B,C" value={molde.lado} onChange={(e)=>{setMolde({...molde,lado:e.target.value})}}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Columna</Form.Label>
                        <Form.Control type="text" placeholder="Ej: 1,2,3" value={molde.columna} onChange={(e)=>{setMolde({...molde,columna:e.target.value})}}/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Check type="checkbox" label="Boquete" defaultChecked={molde.boquete} onChange={()=>{setMolde({...molde,boquete:!molde.boquete})}}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Check type="checkbox" label="Soporte" defaultChecked={molde.soporte} onChange={()=>{setMolde({...molde,soporte:!molde.soporte})}}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Check type="checkbox" label="Activo" defaultChecked={molde.estado} onChange={()=>{setMolde({...molde,estado:!molde.estado})}}/>
                    </Form.Group>
                </Form.Row> 
                <Row>
                    <Col className="text-center">
                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </section>
    )
}
