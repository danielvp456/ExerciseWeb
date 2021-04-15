import React, { Component } from 'react'
import './PaginaPrincipal.css'
import { db, storage } from '../../firebase';


export default class PaginaPrincipal extends React.Component {

    constructor() {
        super();
        this.state = {
            login: false,
            usuario: ""
        }
        //localStorage.clear();
        this.funcionLogueado = this.funcionLogueado.bind(this);
        this.funcionBienvenido = this.funcionBienvenido.bind(this);
        this.evaluar();
    }

    async evaluar() {
        if (localStorage.getItem("loginUser") === "true") {
            this.state.login = true;
            this.state.usuario = localStorage.getItem("nombre_usuario");

            const queryImg = await storage.ref().child(localStorage.getItem("direccion")).getDownloadURL().then(function (url) {
                var img = document.getElementById('my_imagen');
                img.src = url;
                localStorage.setItem("imagenUsuario", img.src);
                console.log("direccion exacta: "  + img.src);
            }).catch(function (error) {
                console.log(error);
            });
            console.log("imagen");
            console.log(localStorage.getItem("direccion"));
            

        }
    }

    funcionLogueado() {
        return (
            <div>
                <h1 className="my-h1"> Bienvenido al ejercicio desarrollo web </h1>
                <div className="contenedor-izquierdo">
                    <img src="" id="my_imagen" className="imagen" />
                </div>
                <div className="contenedor-derecho">
                    <h2>Hola {this.state.usuario} </h2>
                    <br /><br />
                    <p>
                        "Cualquier tecnología suficientemente avanzada es equivalente a la magia."
                        Arthur C. Clarke
                    </p>
                </div>
            </div>
        );
    }

    funcionBienvenido() {
        return (
            <h1>hola soy la página principal</h1>
        );
    }

    render() {
        return (
            <div>
                {this.state.login && <this.funcionLogueado></this.funcionLogueado>}
                {!this.state.login && <this.funcionBienvenido></this.funcionBienvenido>}
            </div>

        );
    }

}