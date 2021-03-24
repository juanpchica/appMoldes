import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.PNG'
export const Header = () => {
    return (
        <header>
            <div className="content-inner content-header">
                <div className="sidebar-brand d-flex align-items-center">
                    <div className="brand">
                        <img src={logo} alt="Logo Magnetron S.A.S" className="img-responsive"/>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        MOLDES BOBINAS <br/>MAGNETRON S.A.S
                    </div>
                </div>
                <nav className="nav-moldes">
                    <Link to="/activar/">Administración</Link>
                </nav>
            </div>
        </header>
    )
}
