import React,{ useState,useEffect } from 'react'
import { useParams, Link, Redirect } from "react-router-dom";

import { Button,Col,Form,Row } from 'react-bootstrap';
import logo from '../img/loading.gif';
import {Alert} from '../components/Alert';
export const Molde = () => {
    const { id } = useParams();
    
    const apiURL = 'http://localhost:8084/apiMoldes/api/moldes';
    
    const [molde,setMolde] = useState({dimensiones:"",columna:"",lado:"",tipo:"",ubicacion:"",cantidad:"",id:id});
    const [isLoading,setIsLoading] = useState(true)
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
    const [redirect,setRedirect] = useState(false);

    const toBoolean = (val) => {
        if(val==='true')
            return true;
        else 
            return false;
    }
    
    //Fetch data from server
    const fetchMolde = async() => {
        const response = await fetch(apiURL+"?id="+id+'&token='+localStorage.getItem("token-molde"));
        const molde = await response.json();
        setIsLoading(false);
        setMolde({...molde[0],soporte:toBoolean(molde[0].soporte),boquete:toBoolean(molde[0].boquete),estado:toBoolean(molde[0].estado)});
    }
     

    useEffect(()=>{
        if(localStorage.getItem("token-molde") && localStorage.getItem("token-molde") === 'ANcVyuP3'){
            fetchMolde();
        }else{
            setRedirect(true);
        }
        
    },[]);

    const showAlert = (show = false, msg = "", type = "") => {
        setAlert({ show, msg, type });
    };

    const updateMolde = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(molde));

        if(!molde.cantidad){
            showAlert(true, "Error, campo cantidad no debe ir vacio!!", "danger");
        }else{
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(molde)
            };

            fetch(apiURL+'/actualizar', requestOptions)
                .then(response =>{
                    if(response.ok){
                        response.json()
                    }else{
                        showAlert(true, "Error al actualizar molde", "danger");
                        throw new Error('Error al actualizar molde - Problema servidor');
                    }
                })
                .then(data => {
                    showAlert(true, "Molde actualizado correctamente!", "success");
                }).catch(error =>{
                    showAlert(true, "Error al actualizar molde", "danger");
                });
        }
        
    }
    
    if (redirect) return <Redirect to="/" />;

    if(isLoading) return <div className="content-loading"><img src={logo} alt="Loading"/></div>

    return (
        <section className="content-form-molde">
            {alert.show && (
                <Alert action={alert} removeAlert={showAlert}  />
            )}
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
                        <Form.Check type="checkbox" label="Boquete" defaultChecked={molde.boquete} onClick={()=>{setMolde({...molde,boquete:!molde.boquete})}} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Check type="checkbox" label="Soporte" defaultChecked={molde.soporte} onClick={()=>{setMolde({...molde,soporte:!molde.soporte})}} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Check type="checkbox" label="Activo" defaultChecked={molde.estado} onClick={()=>{setMolde({...molde,estado:!molde.estado})}}/>
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
