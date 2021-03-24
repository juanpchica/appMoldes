import React, { useState } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import {  PencilSquare } from 'react-bootstrap-icons';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Link } from 'react-router-dom';

export const Moldes = () => {
    const apiURL = 'http://localhost:8084/apiMoldes/api/moldes'
    
    const [moldes,setMoldes] = useState([]);
    
    //Fetch data from server
    const fetchMoldes = async() => {
        const response = await fetch(apiURL);
        const moldes = await response.json();
         
        setMoldes(moldes); 
    }

    const onGridReady = ()=>{
        fetchMoldes();
    }

    const cellRenderButton = (props)=>{
        return <Link to={"/molde/"+props.value}><PencilSquare color="gray" size={25} /></Link>
    }

    const frameworkComponents = {
        'cellRenderButton': cellRenderButton    
    };
    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                rowData={moldes}
                pagination={true}
                onGridReady={onGridReady}
                floatingFilter={true}
                paginationPageSize={250}
                paginationAutoPageSize={true}
                frameworkComponents={frameworkComponents}
                >
                <AgGridColumn field="dimensiones" headerName="DIMENSIONES" sortable={ true } filter={true } resizable={true} flex={1} ></AgGridColumn>
                <AgGridColumn field="cantidad" headerName="CANTIDAD" sortable={ true } filter={true }  resizable={true} flex={1}></AgGridColumn>
                <AgGridColumn field="ubicacion" headerName="UBICACIÓN" sortable={ true } filter={true }  resizable={true} flex={1}></AgGridColumn>
                <AgGridColumn field="tipo" headerName="TIPO" sortable={ true } filter={true }  resizable={true} flex={1}></AgGridColumn>
                <AgGridColumn field="id" headerName="EDITAR"sortable={ true } width="100" filter={false } resizable={true} cellRenderer="cellRenderButton" ></AgGridColumn>
            </AgGridReact>
        </div>
    )
}
