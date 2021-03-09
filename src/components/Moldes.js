import React, { useState,useEffect } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

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

    const onGridReady = ()=>{
        
        fetchMoldes();
    }


    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                rowData={moldes}
                pagination={true}
                onGridReady={onGridReady}
                floatingFilter={true}
                paginationPageSize={250}
                paginationAutoPageSize={true}
                >
                <AgGridColumn field="dimensiones" sortable={ true } filter={true } resizable={true} flex={1} ></AgGridColumn>
                <AgGridColumn field="cantidad" sortable={ true } filter={true }  resizable={true} flex={1}></AgGridColumn>
                <AgGridColumn field="ubicacion" sortable={ true } filter={true }  resizable={true} flex={1}></AgGridColumn>
                <AgGridColumn field="tipo" sortable={ true } filter={true }  resizable={true} flex={1}></AgGridColumn>
            </AgGridReact>
        </div>
    )
}
