import React,{ useState,useEffect } from 'react'
import { useParams } from "react-router-dom";

import { Button,Col,Form } from 'react-bootstrap';

export const Molde = () => {
const { id } = useParams();

const apiURL = 'http://localhost:8084/apiMoldes/api/moldes?id='+id;
    
    const [molde,setMolde] = useState({});
    const [isLoading,setIsLoading] = useState(true)
    
    //Fetch data from server
    const fetchMolde = async() => {
        const response = await fetch(apiURL);
        const molde = await response.json();
         
        console.log(molde);
        setIsLoading(false);
        setMolde(molde[0]); 
    }

    useEffect(()=>{
        fetchMolde();
    },[])

    if(isLoading) return <div>Cargando datos...</div>

    return (
        <section className="content-form-molde">
            <h2>Molde ID: {molde.id}</h2>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Dimensiones</Form.Label>
                        <Form.Control type="text" value={molde.dimensiones} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control type="text" value={molde.tipo}/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control type="text" placeholder="Cantidad de Moldes: "/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Lado</Form.Label>
                        <Form.Control type="text" placeholder="Ej: A,B,C" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Columna</Form.Label>
                        <Form.Control type="text" placeholder="Ej: 1,2,3" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group>
                        <Form.Check type="checkbox" label="Activo" />
                    </Form.Group>
                </Form.Row>
                
                <Button variant="primary" type="submit">
                    Guardar
                </Button>
            </Form>
        </section>
    )
}
