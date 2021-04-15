import React, { Component, useEffect } from 'react'
import './Login.css'
import { db, storage } from '../../firebase';

export default class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            correos: new Array,
            contraseñas: new Array,
            usuarios: new Array,
            direccion_img: new Array,
            user_name: ""
        }
        this.traerData = this.traerData.bind(this);
        this.ingresoApp = this.ingresoApp.bind(this);
        this.traerData();
    }

    async traerData(){
        console.log("traigo data jaja");
        const querySnapshot = await db.collection('user').get();

        querySnapshot.forEach(doc => {
            console.log(doc.data());
            this.state.correos.push(doc.data().correo);
            this.state.contraseñas.push(doc.data().pswd);
            this.state.usuarios.push(doc.data().user);
            this.state.direccion_img.push(doc.data().dir_imagen);
        });
    }

    async ingresoApp(){
        const correo = document.getElementById("correo").value;
        const pswd = document.getElementById("password").value;

        for(var i = 0; i < this.state.correos.length; i++){
            if(correo === this.state.correos[i]){
                console.log("MUY BIEN PANA");
                if(pswd === this.state.contraseñas[i]){
                    this.state.user_name = this.state.usuarios[i]
                    console.log("Bienvenid@ " + this.state.user_name + " acceso garantizado!!");
                    localStorage.setItem("nombre_usuario", this.state.user_name);
                    localStorage.setItem("loginUser", true);
                    localStorage.setItem("direccion", this.state.direccion_img[i]);
                    console.log("num usuario: " + i);
                    window.location.href = "/" ;
                }
            }
        }
    }

    render() {
        return (
            <div className="cuadro-login">
                <div className = "div-interior">
                    <label>Profavor digita tu Correo: </label>
                    <br/>
                    <input type="text" placeholder="example@something.com" id="correo" />
                    <br/><br/><br/>
                    <label>Profavor digita tu contrasela: </label>
                    <br/>
                    <input type="password" placeholder="password" id="password" />
                    <br/><br/><br/>
                    <button onClick={this.ingresoApp} >Ingresar a la app</button>
                </div>
            </div>
        );
    }

}