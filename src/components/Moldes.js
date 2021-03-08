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

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                onGridReady={onGridReady}
                rowData={moldes}>
                <AgGridColumn field="dimensiones"></AgGridColumn>
                <AgGridColumn field="cantidad"></AgGridColumn>
                <AgGridColumn field="ubicacion"></AgGridColumn>
                <AgGridColumn field="tipo"></AgGridColumn>
            </AgGridReact>
        </div>
    )
}
