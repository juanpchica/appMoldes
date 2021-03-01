import React, { useState,useEffect } from 'react'
import { Table } from 'react-bootstrap'

export const Moldes = () => {
    const apiURL = 'http://localhost:8084/apiMoldes/api/moldes'
    
    const [moldes,setMoldes] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    
    //Fetch data from server
    const fetchMoldes = async() => {
        const response = await fetch(apiURL);
        const moldes = await response.json();
        
        setIsLoading(false);
        setMoldes(moldes);
    }
    
    useEffect(()=>{
        fetchMoldes();
    },[]);

    if(isLoading) return <div>Cargando Datos...</div>
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Dimensiones</th>
                <th>Cantidad</th>
                <th>Ubicación</th>
                <th>Tipo</th>
                </tr>
            </thead>
            <tbody>
                { moldes.map((molde,index)=>{
                    return (
                        <tr key={index}>
                            <td>{molde.dimensiones}</td>
                            <td>{molde.cantidad}</td>
                            <td>C: {molde.columna} L: {molde.lado}</td>
                            <td>{molde.tipo}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
