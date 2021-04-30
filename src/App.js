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
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import { ThreeSixty } from '@material-ui/icons';
import $ from 'jquery';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      abrirModal: false,
      productosTienda: 0,
      cambioProductos: false
    }
    this.iniciar = this.iniciar.bind(this);
    this.cerrarSesion = this.cerrarSesion.bind(this);
    this.render = this.render.bind(this);
    this.tiendaVista = this.tiendaVista.bind(this);
    this.tiendaFuncion = this.tiendaFuncion.bind(this);
    this.agregarProducto = this.agregarProducto.bind(this);
    this.tiendaVistaModalDom = this.tiendaVistaModalDom.bind(this);
    this.cambio_cantidad_producto = this.cambio_cantidad_producto.bind(this);


    this.iniciar();
  }

  async iniciar() {
    setInterval(() => {
      if (localStorage.getItem("loginUser") != "true") {
        clearInterval(this);
      } else {
        if (localStorage.getItem("loginUser") == "true") {
          document.getElementById("Login").hidden = true;
          document.getElementById("Registro").hidden = true;
          document.getElementById("Contacto").hidden = false;
          document.getElementById("LogOut").hidden = false;
        } else {
          //document.getElementById("Login").hidden = false;
          document.getElementById("Registro").hidden = false;
          document.getElementById("Contacto").hidden = true;
          document.getElementById("LogOut").hidden = true;
        }
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

  tiendaFuncion() {
    this.state.abrirModal = true;
    this.state.cambioProductos = true;
    console.log("Entro y... " + this.state.abrirModal);
    this.tiendaVistaModalDom();
  }

  agregarProducto() {
    var contador_productos = parseInt(document.getElementById("productos_carrito").textContent);
    contador_productos = contador_productos + 1;
    document.getElementById("productos_carrito").textContent = contador_productos.toString();
  }

  cambio_cantidad_producto(e, pos) {
    e.preventDefault();
    console.log("hola, me oprimión: " + pos);
  }

  tiendaVistaModalDom() {
    var ReactDOM = require('react-dom');
    var nombre = localStorage.getItem("product_name").split(";");
    var precio = localStorage.getItem("price").split(";");

    var elementos_nombre = [];
    for (var i = 0; i < nombre.length; i++) {
      var id_name = "nombre_" + i;
      var id_price = "precio_" + i;
      var id_boton_menos = "boton_menos_" + i;
      var id_boton_mas = "boton_mas_" + i;
      var id_cantidad = "catindad_" + i;
      var id_remover = "remove_" + i;
      const element_name = <h4 id={id_name}> {nombre[i]} </h4>;
      const element_price = <h5 id={id_price}> {precio[i]} </h5>;
      const element_change = <div>
        <button id={id_boton_menos} onClick={e => this.cambio_cantidad_producto(e, i)}>  - </button>
        <label id={id_cantidad}> 0 </label>
        <button id={id_boton_mas} onClick={e => this.cambio_cantidad_producto(e, i)}> + </button>
      </div>;
      const element_remove = <button type="button" class="btn btn-danger" id={id_remover}>Remover</button>;
      const element_br = <br />;
      elementos_nombre.push(element_name);
      elementos_nombre.push(element_price);
      elementos_nombre.push(element_change);
      elementos_nombre.push(element_remove);
      elementos_nombre.push(element_br);
    }

    ReactDOM.render(elementos_nombre, document.getElementById('modal_ventas'));
    //ReactDOM.render(elementos_precio, document.getElementById('modal_ventas'));

  }

  tiendaVista() {
    this.state.abrirModal = true;
    return (
      <React.Fragment>
        <Modal isOpen={this.state.abrirModal}>
          <ModalHeader>
            Tus productos:
              </ModalHeader>
          <ModalBody id="modal_ventas">

          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.tiendaVistaModalDom}>Ver mi lista</Button>
            <Button color="primary" > Pagar </Button>
            <Link className="btn btn-lg btn-secondary" aria-current="page" to="/"> Cerrar </Link>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Router>
        <div className="topnav">
          <Link className="active" to="/">Home</Link>
          <Link to="/Login" id="Login">Login</Link>
          <Link to="/Registro" id="Registro" >Registro</Link>
          <Link to="/Contacto" id="Contacto" >Contacto</Link>
          <Link onClick={this.cerrarSesion} style={{ color: "#CE2929" }} id="LogOut">Log Out</Link>
          <Link to="/tiendaModal" onClick={this.tiendaVista}>
            <div id="circulo">
              <p id="productos_carrito">0</p>
            </div>
            <svg id="carrito" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
          </Link>
        </div>
        <main className="px-3 scrollView">
          <Route exact path="/" component={PaginaPrincipal}></Route>
          <Route exact path="/Login" component={Login}></Route>
          <Route exact path="/Registro" component={Registro}></Route>
          <Route exact path="/Contacto" component={Contacto}></Route>
          <Route exact path="/tiendaModal" component={this.tiendaVista}></Route>
        </main>
      </Router>
    );
  }

}

export default App;
