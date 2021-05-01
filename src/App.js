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
    this.actualizarCantidadProductos = this.actualizarCantidadProductos.bind(this);
    this.elminiar_producto_canasta = this.elminiar_producto_canasta.bind(this);
    this.validarLocalStorage = this.validarLocalStorage.bind(this);


    this.iniciar();
  }

  async iniciar() {
    setInterval(() => {
      if (localStorage.getItem("loginUser") != "true" || localStorage.getItem("loginUser") == null) {
        clearInterval(this);
      } else {
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
      }

      var suma = 0;
      for (var i = 1; i < 6; i++) {
        if(localStorage.getItem("producto"+i) != null ){
          var objeto = JSON.parse(localStorage.getItem("producto"+i));
          suma += parseInt(objeto.cantidad);
        }
      }
      document.getElementById("productos_carrito").textContent = suma.toString();
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

  elminiar_producto_canasta(e) {
    e.preventDefault();
    var division = e.target.id.split("_");
    var i = division[1];
    console.log("boton precionado");
    console.log(e.target.id);
    Swal.fire({
      title: '¿Está segur@ de cerrar sesión?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById("nombre_" + i).remove();
        document.getElementById("precio_" + i).remove();
        document.getElementById("boton_mas_" + i).remove();
        document.getElementById("boton_menos_" + i).remove();
        document.getElementById("cantidad_" + i).remove();
        document.getElementById("remove_" + i).remove();
      }
    });

    localStorage.removeItem("producto"+i,);

    //this.validarLocalStorage();

  }

  cambio_cantidad_producto(e) {
    e.preventDefault();
    var sumaResta = e.target.id.split("_");
    var posicion = sumaResta[2];
    sumaResta = sumaResta[1];

    var busca = "cantidad_" + posicion;
    var contador = parseInt(document.getElementById(busca).textContent);

    switch (sumaResta) {
      case "mas":
        contador = contador + 1;
        console.log("Le sumo a: " + e.target.id);
        break;
      case "menos":
        contador = contador - 1;
        console.log("Le resto a: " + e.target.id);
        break;
    }

    if (contador <= 0) {
      contador = 0;
    }

    this.actualizarCantidadProductos(posicion, contador);
    var busca = "cantidad_" + posicion;
    document.getElementById(busca).textContent = contador.toString();
  }

  tiendaVistaModalDom() {
    var ReactDOM = require('react-dom');
    //var objeto = JSON.parse(localStorage.getItem("producto"+id_venta));
    //objeto.cantidad = (parseInt(objeto.cantidad) + 1).toString();
    var elementos_nombre = [];
    for(var i = 1; i < 6; i++){
      if(localStorage.getItem("producto"+i) != null){
        var objeto = JSON.parse(localStorage.getItem("producto"+i));
        var id_name = "nombre_" + i;
        var id_price = "precio_" + i;
        var id_boton_menos = "boton_menos_" + i;
        var id_boton_mas = "boton_mas_" + i;
        var id_cantidad = "cantidad_" + i;
        var id_remover = "remove_" + i;
        const element_name = <h4 id={id_name}> {objeto.nombre} </h4>;
        const element_price = <h5 id={id_price}> {objeto.precio} </h5>;
        const element_change = <div>
          <button id={id_boton_menos} onClick={e => this.cambio_cantidad_producto(e)}>  - </button>
          <label id={id_cantidad}> {objeto.cantidad} </label>
          <button id={id_boton_mas} onClick={e => this.cambio_cantidad_producto(e)}> + </button>
        </div>;
        const element_remove = <button type="button" class="btn btn-danger" id={id_remover}
          onClick={e => this.elminiar_producto_canasta(e)} >Remover</button>;
        const element_br = <br />;
        elementos_nombre.push(element_name);
        elementos_nombre.push(element_price);
        elementos_nombre.push(element_change);
        elementos_nombre.push(element_remove);
        elementos_nombre.push(element_br);
      }
    }

    ReactDOM.render(elementos_nombre, document.getElementById('modal_ventas'));
  }

  actualizarCantidadProductos(posicion, cantidad_productos) {
    //var cambio_cantidad = localStorage.getItem("cantidad").split(";");
    var objeto = JSON.parse(localStorage.getItem("producto"+posicion));
    objeto.cantidad = cantidad_productos.toString();
    localStorage.setItem("producto"+posicion, JSON.stringify(objeto));
  }

  validarLocalStorage(){
    console.log("hola soy local storage");
    var nombres =  localStorage.getItem("product_name").split(";");
    var descripcion = localStorage.getItem("description").split(";");
    var precio = localStorage.getItem("price").split(";");
    var cantidad = localStorage.getItem("cantidad").split(";");

    /*for(var i = 0; i < n){

    }*/

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
