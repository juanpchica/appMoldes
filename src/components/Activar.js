import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Redirect } from 'react-router';
import {Alert} from '../components/Alert';


export const Activar = () => {
    const apiURL = "http://localhost:8084/apiMoldes/api/moldes/activar/";
    const [user,setUser] = useState("");
    const [passwd,setPasswd] = useState("");
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
    const [redirect,setRedirect] = useState(false);
    //Fetch data from server
    const fetchToken = async() => {
        const response = await fetch(apiURL+'?user='+user+'&passwd='+passwd);
        const resp = await response.json();
        
        if(resp.status === 'Error'){
            showAlert(true, "Error, no se puede autenticar correctamente!", "danger");
        }else{
            showAlert(true, "Genial! Ahora puede editar...", "success");
            localStorage.setItem("token-molde", resp.status);
            setTimeout(function(){
                setRedirect(true);  
            },600);
        }
    }

    const showAlert = (show = false, msg = "", type = "") => {
        setAlert({ show, msg, type });
    };

    const sendForm = (e)=>{
        e.preventDefault();

        if(!user || !passwd){
            showAlert(true, "Error, todos los campos deben ser diligenciados", "danger");
        }else{
            fetchToken();
        }
    }

    if (redirect) return <Redirect to="/" />;


    return (
        <div className="content-form">
            {alert.show && (
                <Alert action={alert} removeAlert={showAlert}  />
            )}
            <Form onSubmit={sendForm}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Ingresa Usuario:" value={user} onChange={(e)=>{setUser(e.target.value)}} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingresa Contraseña:" value={passwd} onChange={(e)=>{setPasswd(e.target.value)}} />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Acceder
                </Button>
            </Form>
        </div>
    )
}
