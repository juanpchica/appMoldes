import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import logo from '../img/logo.PNG'
export const Header = () => {

    const [isEditing,setIsEditing] = useState(false);
    const [redirect,setRedirect] = useState(false);

    const cerrarSesion = (e)=>{
        e.preventDefault();
        localStorage.removeItem("token-molde");
        setRedirect(true);
    }
    useEffect(()=>{
        if(localStorage.getItem("token-molde") && localStorage.getItem("token-molde") === 'ANcVyuP3'){
            setIsEditing(true);
        }else{
            setIsEditing(false);
        }
    });

    if (redirect) return <Redirect to="/" />;
    return (
        <header>
            <div className="content-inner content-header">
                <div className="sidebar-brand d-flex align-items-center">
                    <div className="brand">
                        <Link to="/"><img src={logo} alt="Logo Magnetron S.A.S" className="img-responsive"/></Link>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        MOLDES BOBINAS <br/>MAGNETRON S.A.S
                    </div>
                </div>
                <nav className="nav-moldes">
                    {(isEditing)?<button onClick={cerrarSesion} className="btn btn-def">Cerrar</button>:<Link to="/activar/">Administración</Link>}
                </nav>
            </div>
        </header>
    )
}
