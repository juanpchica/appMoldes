import React from 'react'

export const Header = () => {
    return (
        <header>
            <div className="content-inner content-header">
                <div className="sidebar-brand d-flex align-items-center">
                    <div classNameName="brand">
                        <img src="assets/img/logo.PNG" className="img-responsive"/>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        ESPECIFICACIONES TÉCNICAS <br/>MAGNETRON S.A.S
                    </div>
                </div>
                <div className="content-menu">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown no-arrow show">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <i className="fas fa-align-left fa-sm fa-fw mr-2 text-gray-400"></i> Menú
                        </a>
                       
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <a className="dropdown-item" href="http://portal.magnetron.com:85/portafolio/vista" target="_blank">
                            <i className="fas fa-th fa-sm fa-fw mr-2 text-gray-400"></i>
                            Portafolio Web
                            </a>
                            <a className="dropdown-item" href="http://192.168.1.7:8080/requerimientos/" target="_blank">
                            <i className="fas fa-bolt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Requerimientos
                            </a>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
