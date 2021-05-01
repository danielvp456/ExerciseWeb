import './App.css';
import React, { Component, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Login from './Components/Login/Login';
import Registro from './Components/Registro/Registro';
import PaginaPrincipal from './Components/PaginaPrincipal/PaginaPrincipal';
import Contacto from './Components/Contacto/Contacto';
import { storage } from './firebase';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';


import graficos from './Components/graficos/graficos';

class App extends React.Component {

  constructor() {
    super();
    this.iniciar = this.iniciar.bind(this);
    this.cerrarSesion = this.cerrarSesion.bind(this);
    this.render = this.render.bind(this);
    this.iniciar();
  }

  async iniciar() {
    setInterval(() => {
      if (localStorage.getItem("loginUser") == "true") {
        document.getElementById("Login").hidden = true;
        document.getElementById("Registro").hidden = true;
        document.getElementById("Contacto").hidden = false;
        document.getElementById("LogOut").hidden = false;
      } else {
        document.getElementById("Login").hidden = false;
        document.getElementById("Registro").hidden = false;
        document.getElementById("Contacto").hidden = true;
        document.getElementById("LogOut").hidden = true;
      }
      
      if (localStorage.getItem("loginUser") != "true") {
        clearInterval(this);
      }
    }, 500);
  }

  cerrarSesion() {
    Swal.fire({
      title: '¿Está segur@ de cerrar sesión?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Sesión correctamente cerrada',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false
        });
        localStorage.clear();
        document.getElementById("Login").hidden = false;
        document.getElementById("Registro").hidden = false;
        document.getElementById("Contacto").hidden = true;
        document.getElementById("LogOut").hidden = true;
        window.location.replace('');
      } else {
        Swal.fire({
          title: 'No hemos cerrado sesión, sigue disfrutando',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false
        });
      }
    });

  }

  render() {
    return (
      <Router>
        <div className="topnav">
          <Link className="active" to="/">Home</Link>
          <Link to="/Login" id = "Login">Login</Link>
          <Link to="/Registro" id = "Registro" >Registro</Link>
          <Link to="/Contacto" id = "Contacto" >Contacto</Link>
          <Link onClick={this.cerrarSesion} style={{ color: "#CE2929" }} id="LogOut">Log Out</Link>
          <Link >Tienda</Link>
        </div>
        <main className="px-3 scrollView">
          <Route exact path="/" component={PaginaPrincipal}></Route>
          <Route exact path="/Login" component={Login}></Route>
          <Route exact path="/Registro" component={Registro}></Route>
          <Route exact path="/Contacto" component={Contacto}></Route>
          <Route exact path="/graficos" component={graficos}></Route>
        </main>
      </Router>
    );
  }

}

export default App;
