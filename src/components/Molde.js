import React,{ useState,useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import { Button,Col,Form,Row } from 'react-bootstrap';

export const Molde = () => {
    const { id } = useParams();

    const apiURL = 'http://localhost:8084/apiMoldes/api/moldes';
    
    const [molde,setMolde] = useState({dimensiones:"",columna:"",lado:"",tipo:"",ubicacion:"",cantidad:"",id:id,soporte:0,boquete:0,estado:1});
    const [checkState,setCheckState] = useState({soporte:false,boquete:false,estado:false});
    const [isLoading,setIsLoading] = useState(true)
    
    const asignarCheckStates = () =>{
        setCheckState({
            soporte:(molde.soporte==1)?true:false,
            boquete:(molde.boquete==1)?true:false,
            estado: (molde.estado==1)?true:false
        })
    }

    //Fetch data from server
    const fetchMolde = async() => {
        
        const response = await fetch(apiURL+"?id="+id);
        const molde = await response.json();
         
        setIsLoading(false);

        setMolde(molde[0]); 
        asignarCheckStates();
    }

    useEffect(()=>{
        fetchMolde();
    },[])

    const updateMolde = (e) => {
        e.preventDefault();
        console.log(molde);
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(molde)
        };

        fetch(apiURL+'/actualizar', requestOptions)
            .then(response =>{
                console.log(response);
                response.json()
            })
            .then(data => console.log("data"+ data));
    }

    const checkOption = (tipo) => {
        switch (tipo) {
            case "boquete":
                setCheckState({...checkState,boquete:!checkState.boquete});
                if(checkState.boquete) setMolde({...molde,boquete:1});
                else setMolde({...molde,boquete:0});
            break;
        
            case "soporte":
                setCheckState({...checkState,soporte:!checkState.soporte});
                if(checkState.soporte) setMolde({...molde,soporte:1});
                else setMolde({...molde,soporte:0});
            break;

            case "estado":
                setCheckState({...checkState,estado:!checkState.estado});
                if(checkState.estado) setMolde({...molde,estado:1});
                else setMolde({...molde,estado:0});
            break;
        }
        console.log(molde);
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
                        <Form.Check type="checkbox" label="Boquete" defaultChecked={checkState.boquete} onChange={()=>{checkOption("boquete")}}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Check type="checkbox" label="Soporte" defaultChecked={checkState.soporte} onChange={()=>{checkOption("soporte")}}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Check type="checkbox" label="Activo" defaultChecked={checkState.estado} onChange={()=>{checkOption("estado")}}/>
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
